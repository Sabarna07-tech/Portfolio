'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
  isLastPlayed?: boolean;
}

export default function SpotifyNowPlaying() {
  const [data, setData] = useState<SpotifyData | null>(null);

  useEffect(() => {
    const fetchSpotify = async () => {
      try {
        const res = await fetch('/api/spotify');
        if (res.ok) {
          const spotifyData = await res.json();
          setData(spotifyData);
        }
      } catch (error) {
        console.error('Error fetching Spotify data', error);
      }
    };

    fetchSpotify();
    
    // Poll every 30 seconds
    const interval = setInterval(fetchSpotify, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return null; // Hydration guard / loading state

  const hasTrack = !!data.title;

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
          {data.isPlaying && (
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
        <span className="text-[9px] font-bold tracking-widest uppercase text-[#1DB954] mb-0.5 opacity-90">
          {data.isPlaying ? 'Now Playing' : (data.isLastPlayed ? 'Recently Played' : 'Spotify')}
        </span>
        <span className="text-sm font-bold text-on-surface truncate group-hover:text-primary transition-colors">
          {hasTrack ? data.title : 'Not playing right now'}
        </span>
        <span className="text-xs text-on-surface-variant truncate opacity-80">
          {hasTrack ? data.artist : 'Spotify Profile'}
        </span>
      </div>
    </motion.a>
  );
}
