import React from 'react';
import searchIcon from '../../assets/icons/search.svg';
import './styles.css';

interface HeroProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, searchQuery }) => {
  return (
    <header className="hero">
      <div className="hero-background" />
      <div className="hero-content">
        <h1>NEW SONGS DELIVERED EVERY WEEK</h1>
        <p>Here are the most recent additions to the Yousician App. Start playing today!</p>
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

const SearchIcon = () => <img src={searchIcon} alt="Search" width="18" height="18" />