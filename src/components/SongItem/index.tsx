import React from 'react';
import LevelIndicator from '../LevelIndicator';
import type { Song } from '../../types';
import { HeartIcon } from './HeartIcon';
import './styles.css';

interface SongItemProps {
  song: Song;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const SongItem: React.FC<SongItemProps> = React.memo(({
  song: {
    images,
    title,
    artist,
    level
  },
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <article className="song-item">
      <img src={images} alt={`${title} album cover`} />
      <div className="song-info">
        <h3>{title}</h3>
        <p>{artist}</p>
      </div>
      <LevelIndicator level={level} />
      <button
        onClick={onToggleFavorite}
        className={`favorite-btn ${isFavorite ? 'active' : ''}`}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <HeartIcon filled={isFavorite} />
      </button>
    </article>
  );
});

SongItem.displayName = 'SongItem';
