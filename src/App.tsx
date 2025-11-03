import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Hero } from './components/Hero';
import { FilterBar } from './components/Filter';
import { SongList } from './components/SongList';
import { useSongs } from './services/useSongs';
import { useFavorites } from './services/useFavorites';
import './App.css';
import React from 'react';

const queryClient = new QueryClient();

const Content = () => {
  const [search, setSearch] = useState('');
  const [selectedLevels, setSelectedLevels] = useState<number[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);

  const { data, fetchNextPage, hasNextPage, isLoading, isError: isErrorInSongs } = useSongs(search, selectedLevels);
  const { isFavorite, toggleFavorite, isError: isErrorInFavorites } = useFavorites();

  const songs = React.useMemo(() => {
    return data?.pages.flatMap(page => page.songs) ?? [];
  }, [data?.pages]);
  
  const favoriteSet = React.useMemo(() => {
    return new Set(songs.filter(s => isFavorite(s.id)).map(s => s.id));
  },[isFavorite, songs]);

  return (
    <div className="app">
      <Hero onSearch={setSearch} searchQuery={search} />
      <main className='main'>
        <FilterBar
          isOpen={filterOpen}
          selectedLevels={selectedLevels}
          onLevelsChange={setSelectedLevels}
          onToggle={() => setFilterOpen(!filterOpen)}
        />
        <SongList
          songs={songs}
          favorites={favoriteSet}
          onToggleFavorite={toggleFavorite}
          onLoadMore={() => fetchNextPage()}
          hasMore={!!hasNextPage}
          isLoading={isLoading}
          isError={isErrorInSongs || isErrorInFavorites}
        />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Content />
    </QueryClientProvider>
  );
}