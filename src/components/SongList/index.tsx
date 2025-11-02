import React, { useEffect, useRef } from 'react';
import { SongItem } from '../SongItem';
import type { Song } from '../../types';
import './styles.css';

interface SongListProps {
  songs: Song[];
  favorites: Set<string>;
  onToggleFavorite: (songId: string) => void;
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
}

export const SongList: React.FC<SongListProps> = ({
  songs,
  favorites,
  onToggleFavorite,
  onLoadMore,
  hasMore,
  isLoading,
}) => {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading, onLoadMore]);

  return (
    <div className="song-list-container">
      <div className="song-list">
        {songs.map(song => (
          <SongItem
            key={song.id}
            song={song}
            isFavorite={favorites.has(song.id)}
            onToggleFavorite={() => onToggleFavorite(song.id)}
          />
        ))}
      </div>
      {isLoading && <div className="loader">Loading...</div>}
      <div ref={observerRef} style={{ height: '20px' }} />
    </div>
  );
};