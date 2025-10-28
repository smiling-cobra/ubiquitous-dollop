import { useInfiniteQuery } from "@tanstack/react-query"
import { fetcher } from './fetcher';

interface SongPage {
  nextCursor: number | null;
  prevCursor: number | null;
  data: unknown[];
}

export const useSongs = () => {
  const { data, ...rest } = useInfiniteQuery<SongPage>({
    queryKey: ['songs'],
    queryFn: async () => await fetcher('http://localhost:3004/songs'),
    initialPageParam: 1,
    getNextPageParam: lastPage => lastPage.nextCursor,
    getPreviousPageParam: firstPage => firstPage.prevCursor,
    staleTime: Infinity
  })

  console.log('useSongs rest ===>', rest);
  return data;
}