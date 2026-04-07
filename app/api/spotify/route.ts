import { NextResponse } from 'next/server';
import { getNowPlaying, getRecentlyPlayed } from '@/lib/spotify';

export const revalidate = 0; // Dynamic route

export async function GET() {
  try {
    const response = await getNowPlaying();

    if (response.status === 204 || response.status > 400) {
      // Fallback to recently played
      const recentResponse = await getRecentlyPlayed();
      if (recentResponse.status === 204 || recentResponse.status > 400) {
        return NextResponse.json({ isPlaying: false });
      }

      const recentData = await recentResponse.json();
      const track = recentData.items[0]?.track;

      if (!track) {
        return NextResponse.json({ isPlaying: false });
      }

      return NextResponse.json({
        isPlaying: false,
        title: track.name,
        artist: track.artists.map((_artist: any) => _artist.name).join(', '),
        album: track.album.name,
        albumImageUrl: track.album.images[0]?.url,
        songUrl: track.external_urls.spotify,
        isLastPlayed: true
      });
    }

    const song = await response.json();

    if (!song.item) {
      return NextResponse.json({ isPlaying: false });
    }

    const isPlaying = song.is_playing;
    const title = song.item.name;
    const artist = song.item.artists.map((_artist: any) => _artist.name).join(', ');
    const album = song.item.album.name;
    const albumImageUrl = song.item.album.images[0].url;
    const songUrl = song.item.external_urls.spotify;

    return NextResponse.json({
      album,
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
      isLastPlayed: false
    });
  } catch (error) {
    console.error('Spotify API Error:', error);
    return NextResponse.json({ isPlaying: false, error: 'Failed to fetch spotify status' }, { status: 500 });
  }
}
