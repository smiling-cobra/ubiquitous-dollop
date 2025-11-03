import React from 'react';
import { SearchIcon } from './SearchIcon';
import './styles.css';

const MAIN_HERO_TEXT = 'NEW SONGS DELIVERED EVERY WEEK';
const SECONDARY_HERO_TEXT = 'Here are the most recent additions to the Yousician App. Start playing today!'

interface HeroProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, searchQuery }) => {
  return (
    <header className="hero">
      <div className="hero-background" />
      <div className="hero-content">
        <h1>{MAIN_HERO_TEXT}</h1>
        <p>{SECONDARY_HERO_TEXT}</p>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for songs by artist or title"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
          />
          <button type="button" aria-label="Search">
            <SearchIcon />
          </button>
        </div>
      </div>
    </header>
  );
};
