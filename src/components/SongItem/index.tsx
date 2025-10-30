import React from 'react';
import heartIcon from '../../assets/icons/favorite.svg';
import './styles.css';

export interface Song {
  id: string;
  artist: string;
  title: string;
  level: number;
  image: string;
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

  return (
    <article className="song-item">
      <img src={song.image} alt={`${song.title} album cover`} />
      <div className="song-info">
        <h3>{song.title}</h3>
        <p>{song.artist}</p>
      </div>
      <div className={`level-badge ${getLevelColor(song.level)}`}>
        {song.level}
      </div>
      <button
        className={`favorite-btn ${isFavorite ? 'active' : ''}`}
        onClick={onToggleFavorite}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <HeartIcon />
      </button>
    </article>
  );
};

const HeartIcon = () => <img src={heartIcon} alt="Filter" width="24" height="24" />
