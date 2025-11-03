import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchSongs } from './api';

export const useSongs = (search: string, levels: number[]) => {
  return useInfiniteQuery({
    queryKey: ['songs', search, levels],
    queryFn: ({ pageParam = 0 }) =>
      fetchSongs({ start: pageParam, limit: 20, search, levels }),
    getNextPageParam: (lastPage, allPages) => {
      const loadedCount = allPages.length * 20;
      return loadedCount < lastPage.total ? loadedCount : undefined;
    },
    retry: false,
    staleTime: Infinity,
    initialPageParam: 0,
  });
};