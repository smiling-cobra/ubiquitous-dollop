import React from 'react';
import './styles.css';

export interface Song {
  id: string;
  artist: string;
  title: string;
  level: number;
  images: string;
}

interface SongItemProps {
  song: Song;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const SongItem: React.FC<SongItemProps> = ({
  song,
  isFavorite,
  onToggleFavorite,
}) => {
  const getLevelColor = (level: number) => {
    if (level <= 5) return 'green';
    if (level <= 10) return 'orange';
    return 'red';
  };

  const getLevelProgress = (level: number) => {
    return (level / 15) * 100;
  };


  return (
    <article className="song-item">
      <img src={song.images} alt={`${song.title} album cover`} />
      <div className="song-info">
        <h3>{song.title}</h3>
        <p>{song.artist}</p>
      </div>
      <div 
        className={`level-badge ${getLevelColor(song.level)}`}
        style={{ '--progress': `${getLevelProgress(song.level)}%` } as React.CSSProperties}
      >
        <span>
          {song.level}
        </span>
      </div>
      <button
        className={`favorite-btn ${isFavorite ? 'active' : ''}`}
        onClick={onToggleFavorite}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <HeartIcon filled={isFavorite} />
      </button>
    </article>
  );
};

const HeartIcon: React.FC<{ filled?: boolean }> = ({ filled = false }) => (
  <svg 
    width="32" 
    height="32" 
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
