# Artist Soul Map

A psychographic mapping tool built under **No Noise Records**.

## What it does

Pulls an artist's Spotify data, analyses their emotional and sonic DNA, and reverse-engineers the magnetic connection between artist and fans — producing a **Creative Soul Profile (CSP)** that captures what truly drives listener loyalty.

## Project structure

```
/data        — Raw Spotify pulls (JSON)
/analysis    — Claude agent scripts and data processing
/output      — Generated CSP profiles and insights
```

## Setup

1. Clone this repo
2. Install dependencies:
   ```
   cd analysis
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your Spotify credentials:
   ```
   cp .env.example .env
   ```
4. Get your credentials free at [developer.spotify.com](https://developer.spotify.com) — create an app, grab the Client ID and Client Secret.

## Usage

### Pull Spotify data
```
node analysis/spotify-pull.js
```

Fetches Wizkid's artist profile, albums, playlists, top tracks, and per-track audio features. Saves structured JSON to `/data`.

## Stack

- Node.js
- Spotify Web API (Client Credentials flow)
- Claude API (agent layer — coming next)
