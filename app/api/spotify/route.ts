import { NextResponse } from 'next/server';

export const revalidate = 0; // Dynamic route

type SpotifyResponse = {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
  type: 'currently_playing' | 'recently_played';
  progressMs?: number;
  durationMs?: number;
};

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';
const SPOTIFY_PROFILE_URL = 'https://open.spotify.com/user/sabarna07';

let cachedAccessToken: string | null = null;
let cachedAccessTokenExpiry = 0;

const unavailablePayload: SpotifyResponse = {
  isPlaying: false,
  title: 'Music data unavailable',
  artist: 'Spotify',
  album: 'Spotify Profile',
  albumImageUrl: '',
  songUrl: SPOTIFY_PROFILE_URL,
  type: 'recently_played',
};

async function getAccessToken(): Promise<string> {
  const now = Date.now();
  if (cachedAccessToken && now < cachedAccessTokenExpiry) {
    return cachedAccessToken;
  }

  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    throw new Error('Missing Spotify environment variables.');
  }

  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
  const tokenResponse = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN,
    }),
    cache: 'no-store',
  });

  if (!tokenResponse.ok) {
    console.error('[spotify] token fetch failed', { status: tokenResponse.status });
    throw new Error(`Spotify token fetch failed with status ${tokenResponse.status}`);
  }

  const tokenJson = await tokenResponse.json();
  const accessToken = tokenJson.access_token as string | undefined;
  const expiresIn = Number(tokenJson.expires_in ?? 3600);

  if (!accessToken) {
    throw new Error('Spotify token response missing access_token');
  }

  // Keep a 60s safety window so we never use a near-expired token.
  cachedAccessToken = accessToken;
  cachedAccessTokenExpiry = Date.now() + Math.max(expiresIn - 60, 60) * 1000;
  console.info('[spotify] token fetch success', { expiresIn });

  return accessToken;
}

async function spotifyFetch(endpoint: string, token: string): Promise<Response> {
  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  if (response.status === 401) {
    // Retry once with a fresh token if Spotify invalidates the cached token.
    cachedAccessToken = null;
    cachedAccessTokenExpiry = 0;
    const freshToken = await getAccessToken();
    return fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${freshToken}`,
      },
      cache: 'no-store',
    });
  }

  return response;
}

function mapCurrentlyPlaying(song: any): SpotifyResponse {
  const item = song?.item;
  return {
    isPlaying: Boolean(song?.is_playing),
    title: item?.name ?? 'Unknown title',
    artist: item?.artists?.map((a: any) => a.name).join(', ') ?? 'Unknown artist',
    album: item?.album?.name ?? 'Unknown album',
    albumImageUrl: item?.album?.images?.[0]?.url ?? '',
    songUrl: item?.external_urls?.spotify ?? SPOTIFY_PROFILE_URL,
    type: 'currently_playing',
    progressMs: typeof song?.progress_ms === 'number' ? song.progress_ms : undefined,
    durationMs: typeof item?.duration_ms === 'number' ? item.duration_ms : undefined,
  };
}

function mapRecentlyPlayed(recentData: any): SpotifyResponse | null {
  const track = recentData?.items?.[0]?.track;
  if (!track) return null;

  return {
    isPlaying: false,
    title: track?.name ?? 'Unknown title',
    artist: track?.artists?.map((a: any) => a.name).join(', ') ?? 'Unknown artist',
    album: track?.album?.name ?? 'Unknown album',
    albumImageUrl: track?.album?.images?.[0]?.url ?? '',
    songUrl: track?.external_urls?.spotify ?? SPOTIFY_PROFILE_URL,
    type: 'recently_played',
  };
}

export async function GET() {
  try {
    const accessToken = await getAccessToken();
    const currentResponse = await spotifyFetch(NOW_PLAYING_ENDPOINT, accessToken);
    console.info('[spotify] currently-playing status', { status: currentResponse.status });

    if (currentResponse.status === 200) {
      const currentData = await currentResponse.json();
      if (currentData?.item) {
        return NextResponse.json(mapCurrentlyPlaying(currentData));
      }
    }

    if (currentResponse.status === 204) {
      console.info('[spotify] fallback trigger', { reason: 'currently-playing-204' });
    } else if (!currentResponse.ok) {
      console.warn('[spotify] fallback trigger', {
        reason: 'currently-playing-non-ok',
        status: currentResponse.status,
      });
    } else {
      console.warn('[spotify] fallback trigger', { reason: 'currently-playing-empty-item' });
    }

    const recentResponse = await spotifyFetch(RECENTLY_PLAYED_ENDPOINT, accessToken);
    console.info('[spotify] recently-played status', { status: recentResponse.status });

    if (recentResponse.status === 200) {
      const recentData = await recentResponse.json();
      const recentTrack = mapRecentlyPlayed(recentData);
      if (recentTrack) {
        return NextResponse.json(recentTrack);
      }
      console.warn('[spotify] recently-played had no tracks');
    }

    return NextResponse.json(unavailablePayload);
  } catch (error) {
    console.error('Spotify API Error:', error);
    return NextResponse.json(unavailablePayload);
  }
}
