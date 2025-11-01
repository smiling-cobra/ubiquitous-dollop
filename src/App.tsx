import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Hero } from './components/Hero';
import { FilterBar } from './components/Filter';
import { SongList } from './components/SongList';
import { useSongs } from './services/useSongs';
import { useFavorites } from './services/useFavorites';
import './App.css';

const queryClient = new QueryClient();

const Content = () => {
  const [search, setSearch] = useState('');
  const [selectedLevels, setSelectedLevels] = useState<number[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);

  const { data, fetchNextPage, hasNextPage, isLoading } = useSongs(search, selectedLevels);
  const { isFavorite, toggleFavorite } = useFavorites();

  const songs = data?.pages.flatMap(page => page.songs) ?? [];
  const favoriteSet = new Set(songs.filter(s => isFavorite(s.id)).map(s => s.id));

  return (
    <div className="app">
      <Hero onSearch={setSearch} searchQuery={search} />
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
      />
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