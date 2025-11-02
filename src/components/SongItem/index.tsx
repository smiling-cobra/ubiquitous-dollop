import React from 'react';
import LevelIndicator from '../LevelIndicator';
import { getPlaceholderImage } from '../../utils';
import type { Song } from '../../types';
import './styles.css';

interface SongItemProps {
  song: Song;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const SongItem: React.FC<SongItemProps> = ({
  song: {
    title,
    artist,
    level
  },
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <article className="song-item">
      <img src={getPlaceholderImage(level, title)} alt={`${title} album cover`} />
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
};

const HeartIcon: React.FC<{ filled?: boolean }> = ({ filled = false }) => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill={filled ? '#dc001c' : 'none'}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      stroke={filled ? '#dc001c' : '#ffffff'}
      strokeWidth="2"
    />
  </svg>
);
