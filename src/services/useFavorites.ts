import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchFavorites, addFavorite, removeFavorite } from './api';
import type { Favorite } from '../types';

export const useFavorites = () => {
  const queryClient = useQueryClient();

  const { data: favorites = [] } = useQuery<Favorite[]>({
    queryKey: ['favorites'],
    queryFn: fetchFavorites,
    staleTime: Infinity,
  });

  const addMutation = useMutation({
    mutationFn: addFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: removeFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });

  const isFavorite = (songId: string) =>
    favorites.some(fav => fav.songId === songId);

  const getFavoriteId = (songId: string) =>
    favorites.find(fav => fav.songId === songId)?.id;

  const toggleFavorite = (songId: string) => {
    const favoriteId = getFavoriteId(songId);
    if (favoriteId) {
      removeMutation.mutate(favoriteId);
    } else {
      addMutation.mutate(songId);
    }
  };

  return { favorites, isFavorite, toggleFavorite };
};