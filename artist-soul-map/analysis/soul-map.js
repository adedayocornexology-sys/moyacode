/**
 * soul-map.js — Artist Soul Map comparison engine
 *
 * Usage:
 *   node analysis/soul-map.js --track <spotify-track-id-or-url> --dob YYYY-MM-DD [--name "Your Name"]
 *
 * What it does:
 *   1. Fetches audio features for your track from Spotify
 *   2. Builds sonic profiles from artist data in /data
 *   3. Scores sonic similarity between your track and each artist
 *   4. Calculates numerology (Life Path) compatibility
 *   5. Produces a ranked Soul Map report saved to /output
 */

import 'dotenv/config';
import fetch from 'node-fetch';
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import {
  calcLifePath,
  lifePathLabel,
  compatibilityScore,
  compatibilityLabel,
} from './numerology.js';

const __dirname  = dirname(fileURLToPath(import.meta.url));
const DATA_DIR   = join(__dirname, '..', 'data');
const OUTPUT_DIR = join(__dirname, '..', 'output');

// ── CLI args ──────────────────────────────────────────────────────────────────

function parseArgs() {
  const args = process.argv.slice(2);
  const get  = (flag) => {
    const i = args.indexOf(flag);
    return i !== -1 ? args[i + 1] : null;
  };

  const trackRaw = get('--track');
  const dob      = get('--dob');
  const name     = get('--name') ?? 'You';

  if (!trackRaw || !dob) {
    console.error('\nUsage: node soul-map.js --track <spotify-track-id-or-url> --dob YYYY-MM-DD [--name "Your Name"]\n');
    console.error('Example:');
    console.error('  node soul-map.js --track 4iZ4pt7kvcaH6Yo8UoZ4s2 --dob 1995-03-14\n');
    process.exit(1);
  }

  // Extract ID from full Spotify URL if needed
  const trackId = trackRaw.includes('spotify.com/track/')
    ? trackRaw.split('spotify.com/track/')[1].split('?')[0]
    : trackRaw;

  return { trackId, dob, name };
}

// ── Spotify auth (reuse from spotify-pull) ────────────────────────────────────

async function getAccessToken() {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
    throw new Error('Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET in .env');
  }

  const credentials = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!res.ok) throw new Error(`Auth failed (${res.status}): ${await res.text()}`);
  const { access_token } = await res.json();
  return access_token;
}

async function spotifyGet(token, path, params = {}) {
  const url = new URL(`https://api.spotify.com/v1${path}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString(), { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error(`Spotify ${path} failed (${res.status}): ${await res.text()}`);
  return res.json();
}

// ── Fetch your track's data ───────────────────────────────────────────────────

async function fetchYourTrack(token, trackId) {
  console.log(`\n🎵  Fetching your track (${trackId})...`);

  const [track, featuresRes] = await Promise.all([
    spotifyGet(token, `/tracks/${trackId}`),
    spotifyGet(token, `/audio-features/${trackId}`),
  ]);

  console.log(`   Title    : ${track.name}`);
  console.log(`   Artist(s): ${track.artists.map((a) => a.name).join(', ')}`);
  console.log(`   Album    : ${track.album.name}`);

  return { track, features: featuresRes };
}

// ── Sonic profile builder ─────────────────────────────────────────────────────

const FEATURE_WEIGHTS = {
  danceability:     0.20,
  energy:           0.20,
  valence:          0.15,
  acousticness:     0.15,
  instrumentalness: 0.10,
  speechiness:      0.10,
  tempo:            0.05, // normalised below
  loudness:         0.05, // normalised below
};

function normaliseFeatures(f) {
  return {
    danceability:     f.danceability,
    energy:           f.energy,
    valence:          f.valence,
    acousticness:     f.acousticness,
    instrumentalness: f.instrumentalness,
    speechiness:      f.speechiness,
    // tempo: typical range 60–200 BPM → 0–1
    tempo:     Math.min(Math.max((f.tempo - 60) / 140, 0), 1),
    // loudness: typical range -60 to 0 dB → 0–1
    loudness:  Math.min(Math.max((f.loudness + 60) / 60, 0), 1),
  };
}

function sonicSimilarity(featuresA, featuresB) {
  const a = normaliseFeatures(featuresA);
  const b = normaliseFeatures(featuresB);

  let weightedSqDiff = 0;
  let totalWeight    = 0;

  for (const [key, weight] of Object.entries(FEATURE_WEIGHTS)) {
    const diff = (a[key] ?? 0) - (b[key] ?? 0);
    weightedSqDiff += weight * diff * diff;
    totalWeight    += weight;
  }

  const maxDist  = Math.sqrt(totalWeight); // all features at max diff = 1
  const distance = Math.sqrt(weightedSqDiff);
  return Math.round((1 - distance / maxDist) * 100);
}

function buildArtistSonicProfile(tracksWithFeatures) {
  const valid = tracksWithFeatures.filter((t) => t.audio_features);
  if (!valid.length) return null;

  const avg = (key) =>
    valid.reduce((s, t) => s + (t.audio_features[key] ?? 0), 0) / valid.length;

  return {
    danceability:     +avg('danceability').toFixed(4),
    energy:           +avg('energy').toFixed(4),
    valence:          +avg('valence').toFixed(4),
    acousticness:     +avg('acousticness').toFixed(4),
    instrumentalness: +avg('instrumentalness').toFixed(4),
    speechiness:      +avg('speechiness').toFixed(4),
    tempo:            +avg('tempo').toFixed(2),
    loudness:         +avg('loudness').toFixed(2),
    track_count:      valid.length,
  };
}

// ── Load all artist data from /data ──────────────────────────────────────────

function loadArtistProfiles() {
  const birthdates = JSON.parse(
    readFileSync(join(DATA_DIR, 'artist-birthdates.json'), 'utf-8')
  );

  // Discover all tracks_with_features files in /data
  const files = readdirSync(DATA_DIR).filter((f) =>
    f.endsWith('_tracks_with_features.json')
  );

  const profiles = [];

  for (const file of files) {
    const slug = file.replace('_tracks_with_features.json', '');

    const bdEntry = birthdates[slug];
    if (!bdEntry) {
      console.warn(`   ⚠️  No birthdate entry for slug "${slug}" — skipping numerology for this artist.`);
    }

    const raw   = JSON.parse(readFileSync(join(DATA_DIR, file), 'utf-8'));
    const sonic = buildArtistSonicProfile(raw);

    if (!sonic) continue;

    profiles.push({
      slug,
      name:     bdEntry?.name ?? slug,
      dob:      bdEntry?.dob ?? null,
      realName: bdEntry?.real_name ?? null,
      sonic,
    });
  }

  return profiles;
}

// ── Report renderer ───────────────────────────────────────────────────────────

function bar(score, width = 20) {
  const filled = Math.round((score / 100) * width);
  return '█'.repeat(filled) + '░'.repeat(width - filled);
}

function printReport(results, yourName, yourLP, yourTrackName) {
  console.log('\n');
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║              ARTIST SOUL MAP — YOUR REPORT               ║');
  console.log('╚══════════════════════════════════════════════════════════╝');
  console.log(`\n  Your track   : "${yourTrackName}"`);
  console.log(`  Your name    : ${yourName}`);
  console.log(`  Life Path    : ${yourLP} — ${lifePathLabel(yourLP)}`);
  console.log('\n  ── Ranked by overall alignment ────────────────────────\n');

  results.forEach((r, i) => {
    const rank = String(i + 1).padStart(2, ' ');
    console.log(`  ${rank}. ${r.artistName}`);
    if (r.artistLP) {
      console.log(`      Life Path ${r.artistLP} — ${lifePathLabel(r.artistLP)}`);
    }
    console.log(`      Sonic similarity   : ${bar(r.sonicScore)} ${r.sonicScore}%`);
    if (r.numScore !== null) {
      console.log(`      Numerology match  : ${bar(r.numScore)} ${r.numScore}%  (${r.numLabel})`);
      console.log(`      Overall alignment : ${bar(r.overallScore)} ${r.overallScore}%`);
    } else {
      console.log(`      Numerology match  : (no birthdate on file)`);
      console.log(`      Overall alignment : ${bar(r.sonicScore)} ${r.sonicScore}% (sonic only)`);
    }
    console.log();
  });

  console.log('  ── What this means ────────────────────────────────────\n');
  const top = results[0];
  console.log(`  Your strongest alignment is with ${top.artistName}.`);
  if (top.numScore !== null) {
    if (top.sonicScore > 70 && top.numScore > 70) {
      console.log(`  Both your sonic fingerprint AND your Life Path number`);
      console.log(`  point to this artist. This is your natural creative lineage.`);
    } else if (top.sonicScore > 70) {
      console.log(`  You've absorbed their sonic style, but the numerological`);
      console.log(`  connection is moderate — learned influence rather than deep alignment.`);
    } else if (top.numScore > 70) {
      console.log(`  Strong energetic resonance — same creative DNA. The sonic`);
      console.log(`  similarity has room to grow as your sound matures.`);
    }
  }
  console.log('\n══════════════════════════════════════════════════════════\n');
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const { trackId, dob, name } = parseArgs();

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  Artist Soul Map — Soul Match Engine');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  // Your numerology
  const yourLP = calcLifePath(dob);
  console.log(`\n🔢  Your Life Path Number: ${yourLP} — ${lifePathLabel(yourLP)}`);

  // Spotify
  console.log('\n🔑  Authenticating with Spotify...');
  const token = await getAccessToken();
  console.log('✅  Access token obtained.');

  const { track, features: yourFeatures } = await fetchYourTrack(token, trackId);

  // Load artist profiles
  console.log('\n📂  Loading artist profiles from /data...');
  const profiles = loadArtistProfiles();

  if (!profiles.length) {
    console.error('\n❌  No artist data found in /data. Run spotify-pull.js first.\n');
    process.exit(1);
  }

  console.log(`   ${profiles.length} artist profile(s) loaded.`);

  // Score each artist
  const results = profiles.map((p) => {
    const sonicScore = sonicSimilarity(yourFeatures, p.sonic);

    let numScore  = null;
    let numLabel  = null;
    let artistLP  = null;

    if (p.dob) {
      try {
        artistLP  = calcLifePath(p.dob);
        numScore  = compatibilityScore(yourLP, artistLP);
        numLabel  = compatibilityLabel(numScore);
      } catch {
        // bad date in seed file — skip numerology for this artist
      }
    }

    // Overall: 60% sonic, 40% numerology (or 100% sonic if no dob)
    const overallScore = numScore !== null
      ? Math.round(sonicScore * 0.6 + numScore * 0.4)
      : sonicScore;

    return {
      artistName:  p.name,
      artistLP,
      sonicScore,
      numScore,
      numLabel,
      overallScore,
    };
  });

  // Rank by overall alignment
  results.sort((a, b) => b.overallScore - a.overallScore);

  // Print to terminal
  printReport(results, name, yourLP, track.name);

  // Save JSON report
  mkdirSync(OUTPUT_DIR, { recursive: true });
  const timestamp  = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const reportFile = join(OUTPUT_DIR, `soul_map_${timestamp}.json`);

  const report = {
    generated_at:   new Date().toISOString(),
    your_track:     { id: track.id, name: track.name, artists: track.artists.map((a) => a.name) },
    your_dob:       dob,
    your_life_path: yourLP,
    your_life_path_label: lifePathLabel(yourLP),
    your_audio_features:  yourFeatures,
    rankings:       results,
  };

  writeFileSync(reportFile, JSON.stringify(report, null, 2), 'utf-8');
  console.log(`💾  Full report saved → ${reportFile}\n`);
}

main().catch((err) => {
  console.error('\n❌  Fatal error:', err.message);
  process.exit(1);
});
