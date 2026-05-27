import 'dotenv/config';
import fetch from 'node-fetch';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', 'data');

// ── CLI args ──────────────────────────────────────────────────────────────────

function getArtistArg() {
  const i = process.argv.indexOf('--artist');
  return i !== -1 ? process.argv[i + 1] : 'Wizkid';
}

function slugify(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

// ── Auth ─────────────────────────────────────────────────────────────────────

async function getAccessToken() {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;

  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
    throw new Error(
      'Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET in .env'
    );
  }

  console.log('🔑  Authenticating with Spotify...');

  const credentials = Buffer.from(
    `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
  ).toString('base64');

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Auth failed (${res.status}): ${text}`);
  }

  const { access_token } = await res.json();
  console.log('✅  Access token obtained.\n');
  return access_token;
}

// ── Spotify API helpers ───────────────────────────────────────────────────────

async function spotifyGet(token, path, params = {}) {
  const url = new URL(`https://api.spotify.com/v1${path}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Spotify API error on ${path} (${res.status}): ${text}`);
  }

  return res.json();
}

// Paginate through all items in a Spotify paged endpoint
async function paginate(token, firstPage, key = 'items') {
  let page = firstPage;
  const results = [];

  while (page) {
    results.push(...page[key]);
    if (page.next) {
      const res = await fetch(page.next, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) break;
      const data = await res.json();
      // next page might be the paged object directly or nested under a key
      page = data[key] ? data : data;
      if (!page.next && !page[key]) break;
      // handle responses that wrap the page under a named key (e.g. albums.items)
      if (page.items === undefined && page[key] === undefined) break;
      if (page.items !== undefined) {
        // direct page object
      } else {
        page = page[key];
      }
    } else {
      break;
    }
  }

  return results;
}

// ── Find artist ───────────────────────────────────────────────────────────────

async function findArtist(token, artistName) {
  console.log(`🔍  Searching for "${artistName}" on Spotify...`);

  const data = await spotifyGet(token, '/search', {
    q: artistName,
    type: 'artist',
    limit: 5,
  });

  const query = artistName.toLowerCase();
  const candidates = data.artists.items.filter((a) =>
    a.name.toLowerCase().includes(query)
  );

  if (!candidates.length) throw new Error(`"${artistName}" not found in search results`);

  const artist = candidates.sort((a, b) => b.followers.total - a.followers.total)[0];

  console.log(`✅  Found: ${artist.name}`);
  console.log(`   ID         : ${artist.id}`);
  console.log(`   Followers  : ${artist.followers.total.toLocaleString()}`);
  console.log(`   Popularity : ${artist.popularity}/100`);
  console.log(`   Genres     : ${artist.genres.join(', ')}\n`);

  return artist;
}

async function fetchPlaylists(token, artistName) {
  console.log('📋  Fetching playlists (via search)...');
  const data = await spotifyGet(token, '/search', {
    q: artistName,
    type: 'playlist',
    limit: 20,
  });
  const playlists = data.playlists.items.filter(Boolean);
  console.log(`   ${playlists.length} playlists found.\n`);
  return playlists;
}

async function fetchAlbums(token, artistId) {
  console.log('💿  Fetching albums...');

  const firstPage = await spotifyGet(token, `/artists/${artistId}/albums`, {
    include_groups: 'album,single,compilation',
    market: 'US',
    limit: 50,
  });

  const albums = [firstPage.items];
  let next = firstPage.next;

  while (next) {
    const res = await fetch(next, { headers: { Authorization: `Bearer ${token}` } });
    const page = await res.json();
    albums.push(page.items);
    next = page.next;
  }

  const flat = albums.flat();
  console.log(`   ${flat.length} albums/singles found.\n`);
  return flat;
}

async function fetchTopTracks(token, artistId) {
  console.log('🎵  Fetching top tracks...');

  const data = await spotifyGet(token, `/artists/${artistId}/top-tracks`, {
    market: 'US',
  });

  console.log(`   ${data.tracks.length} top tracks found.\n`);
  return data.tracks;
}

async function fetchAudioFeatures(token, trackIds) {
  console.log(`🎛️   Fetching audio features for ${trackIds.length} tracks...`);

  // Spotify allows max 100 IDs per request
  const chunks = [];
  for (let i = 0; i < trackIds.length; i += 100) {
    chunks.push(trackIds.slice(i, i + 100));
  }

  const features = [];
  for (const chunk of chunks) {
    const data = await spotifyGet(token, '/audio-features', {
      ids: chunk.join(','),
    });
    features.push(...data.audio_features.filter(Boolean));
  }

  console.log(`   Audio features fetched for ${features.length} tracks.\n`);
  return features;
}

async function fetchAlbumTracks(token, albums) {
  console.log(`📀  Fetching tracks for ${albums.length} albums...`);

  const allTracks = [];

  for (const album of albums) {
    const data = await spotifyGet(token, `/albums/${album.id}/tracks`, {
      limit: 50,
    });
    const tracks = data.items.map((t) => ({ ...t, album }));
    allTracks.push(...tracks);
  }

  console.log(`   ${allTracks.length} total album tracks collected.\n`);
  return allTracks;
}

// ── Save helper ───────────────────────────────────────────────────────────────

function saveJSON(filename, data) {
  mkdirSync(DATA_DIR, { recursive: true });
  const filepath = join(DATA_DIR, filename);
  writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`💾  Saved → ${filepath}`);
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const artistName = getArtistArg();
  const slug       = slugify(artistName);

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  Artist Soul Map — Spotify Pull');
  console.log(`  Target: ${artistName}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const token = await getAccessToken();

  const artist = await findArtist(token, artistName);
  const [albums, topTracks, playlists] = await Promise.all([
    fetchAlbums(token, artist.id),
    fetchTopTracks(token, artist.id),
    fetchPlaylists(token, artistName),
  ]);

  // Pull tracks from all albums (for complete audio feature coverage)
  const albumTracks = await fetchAlbumTracks(token, albums);

  // Deduplicate by ID
  const allTracksMap = new Map();
  [...albumTracks, ...topTracks].forEach((t) => allTracksMap.set(t.id, t));
  const allTracks = Array.from(allTracksMap.values());

  const trackIds = allTracks.map((t) => t.id);
  const audioFeatures = await fetchAudioFeatures(token, trackIds);

  // Merge audio features onto tracks
  const featureMap = new Map(audioFeatures.map((f) => [f.id, f]));
  const tracksWithFeatures = allTracks.map((t) => ({
    id: t.id,
    name: t.name,
    album: t.album
      ? { id: t.album.id, name: t.album.name, release_date: t.album.release_date }
      : null,
    duration_ms: t.duration_ms,
    explicit: t.explicit,
    popularity: t.popularity ?? null,
    preview_url: t.preview_url,
    external_urls: t.external_urls,
    audio_features: featureMap.get(t.id) ?? null,
  }));

  // ── Save everything ───────────────────────────────────────────────────────
  console.log('\n📁  Saving data files...\n');

  saveJSON(`${slug}_artist.json`, artist);
  saveJSON(`${slug}_albums.json`, albums);
  saveJSON(`${slug}_top_tracks.json`, topTracks);
  saveJSON(`${slug}_playlists.json`, playlists);
  saveJSON(`${slug}_tracks_with_features.json`, tracksWithFeatures);

  // Summary stats for quick sanity check
  const featuredCount = tracksWithFeatures.filter((t) => t.audio_features).length;
  const avgValence =
    tracksWithFeatures
      .filter((t) => t.audio_features)
      .reduce((s, t) => s + t.audio_features.valence, 0) / featuredCount;
  const avgEnergy =
    tracksWithFeatures
      .filter((t) => t.audio_features)
      .reduce((s, t) => s + t.audio_features.energy, 0) / featuredCount;
  const avgDanceability =
    tracksWithFeatures
      .filter((t) => t.audio_features)
      .reduce((s, t) => s + t.audio_features.danceability, 0) / featuredCount;

  const summary = {
    pulled_at: new Date().toISOString(),
    artist: { id: artist.id, name: artist.name, followers: artist.followers.total },
    counts: {
      albums: albums.length,
      top_tracks: topTracks.length,
      playlists: playlists.length,
      total_tracks: allTracks.length,
      tracks_with_audio_features: featuredCount,
    },
    sonic_averages: {
      valence: +avgValence.toFixed(3),
      energy: +avgEnergy.toFixed(3),
      danceability: +avgDanceability.toFixed(3),
    },
  };

  saveJSON(`${slug}_summary.json`, summary);

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  Pull complete!');
  console.log(`  Albums          : ${summary.counts.albums}`);
  console.log(`  Top tracks      : ${summary.counts.top_tracks}`);
  console.log(`  Total tracks    : ${summary.counts.total_tracks}`);
  console.log(`  With features   : ${summary.counts.tracks_with_audio_features}`);
  console.log(`  Avg valence     : ${summary.sonic_averages.valence} (0=dark, 1=happy)`);
  console.log(`  Avg energy      : ${summary.sonic_averages.energy}`);
  console.log(`  Avg danceability: ${summary.sonic_averages.danceability}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

main().catch((err) => {
  console.error('\n❌  Fatal error:', err.message);
  process.exit(1);
});
