const API_BASE = 'http://localhost:3004';

export const fetchSongs = async ({
  start = 0,
  limit = 20,
  search = '',
  levels = [],
}: {
  start?: number;
  limit?: number;
  search?: string;
  levels?: number[];
}) => {
  const params = new URLSearchParams({
    _start: start.toString(),
    _limit: limit.toString(),
  });

  if (search) params.append('search_like', search);
  levels.forEach(level => params.append('level', level.toString()));

  const response = await fetch(`${API_BASE}/songs?${params}`);
  const total = response.headers.get('X-Total-Count');
  const data = await response.json();
  
  return { songs: data, total: parseInt(total || '0') };
};

export const fetchFavorites = async () => {
  const response = await fetch(`${API_BASE}/favorites`);
  return response.json();
};

export const addFavorite = async (songId: string) => {
  const response = await fetch(`${API_BASE}/favorites`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ songId }),
  });
  return response.json();
};

export const removeFavorite = async (favoriteId: string) => {
  await fetch(`${API_BASE}/favorites/${favoriteId}`, {
    method: 'DELETE',
  });
};