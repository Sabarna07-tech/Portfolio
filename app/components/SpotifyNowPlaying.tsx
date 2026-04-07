'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

interface SpotifyData {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
  type: 'currently_playing' | 'recently_played';
  progressMs?: number;
  durationMs?: number;
}

const DEFAULT_DATA: SpotifyData = {
  isPlaying: false,
  title: 'Music data unavailable',
  artist: 'Spotify',
  album: 'Spotify Profile',
  albumImageUrl: '',
  songUrl: 'https://open.spotify.com/user/sabarna07',
  type: 'recently_played',
};

export default function SpotifyNowPlaying() {
  const [data, setData] = useState<SpotifyData>(DEFAULT_DATA);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchSpotify = async () => {
      try {
        const res = await fetch('/api/spotify', { cache: 'no-store' });
        if (res.ok) {
          const spotifyData = await res.json();
          if (isMounted) {
            setData({ ...DEFAULT_DATA, ...spotifyData });
          }
        } else if (isMounted) {
          setData(DEFAULT_DATA);
        }
      } catch {
        if (isMounted) {
          setData(DEFAULT_DATA);
        }
      } finally {
        if (isMounted) {
          setLoaded(true);
        }
      }
    };

    fetchSpotify();

    // Poll every 25 seconds for a live-feel without excessive API churn.
    const interval = setInterval(fetchSpotify, 25000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const hasTrack = data.title !== DEFAULT_DATA.title || data.artist !== DEFAULT_DATA.artist;
  const isNowPlaying = data.type === 'currently_playing' && data.isPlaying;
  const progress =
    typeof data.progressMs === 'number' &&
    typeof data.durationMs === 'number' &&
    data.durationMs > 0
      ? Math.min((data.progressMs / data.durationMs) * 100, 100)
      : null;

  return (
    <motion.a
      href={data.songUrl || 'https://open.spotify.com/user/sabarna07'}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
      whileHover={hasTrack ? { scale: 1.02, y: -2 } : { scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="inline-flex items-center gap-4 bg-surface-container-highest/60 backdrop-blur-3xl border border-white/10 p-3 pr-6 rounded-2xl shadow-xl transition-all duration-300 group overflow-hidden relative max-w-[320px] w-full"
    >
      {/* Dynamic Ambient Spotify Glow */}
      <div className="absolute inset-0 bg-[#1DB954]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {hasTrack && data.albumImageUrl ? (
        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 shadow-md">
          <Image src={data.albumImageUrl} alt={data.album || 'Album Art'} fill className="object-cover" />
          {isNowPlaying && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-[3px] backdrop-blur-[1px]">
              <span className="w-1 h-3 bg-[#1DB954] rounded-full animate-[pulse_1s_ease-in-out_infinite]" />
              <span className="w-1 h-4 bg-[#1DB954] rounded-full animate-[pulse_1.2s_ease-in-out_infinite_0.2s]" />
              <span className="w-1 h-3 bg-[#1DB954] rounded-full animate-[pulse_0.9s_ease-in-out_infinite_0.4s]" />
            </div>
          )}
        </div>
      ) : (
        <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#1DB954]/70 group-hover:text-[#1DB954] transition-colors">
             <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.54.659.3 1.02zm1.44-3.3c-.301.42-.84.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15.001 10.62 18.66 12.84c.361.181.54.78.301 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
        </div>
      )}

      <div className="flex flex-col truncate relative z-10 w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${data.type}-${data.title}-${loaded ? 'loaded' : 'loading'}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col"
          >
            <span className={`text-[9px] font-bold tracking-widest uppercase mb-0.5 opacity-90 ${isNowPlaying ? 'text-[#1DB954]' : 'text-on-surface-variant/70'}`}>
              {isNowPlaying ? 'Now Playing' : 'Recently Played'}
            </span>
            <div className="flex items-center gap-2 min-w-0">
              {isNowPlaying && <span className="h-2 w-2 rounded-full bg-[#1DB954] animate-pulse shrink-0" />}
              <span className="text-sm font-bold text-on-surface truncate group-hover:text-primary transition-colors">
                {data.title}
              </span>
            </div>
            <span className="text-xs text-on-surface-variant truncate opacity-80">
              {data.artist}
            </span>
            {isNowPlaying && progress !== null && (
              <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full bg-[#1DB954]/90"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.a>
  );
}
