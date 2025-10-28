import { useQuery } from "@tanstack/react-query"
import { fetcher } from "./fetcher"

export const useFavorites = () => {
    const { data } = useQuery({
    queryKey: ['favorites'],
    queryFn: async () => await fetcher('http://localhost:3004/songs'),
    staleTime: Infinity,
  })

  return data;
}