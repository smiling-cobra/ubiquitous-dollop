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
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  const total = response.headers.get('X-Total-Count');
  const data = await response.json();

  return { songs: data, total: parseInt(total || '0') };
};

export const fetchFavorites = async () => {
  const response = await fetch(`${API_BASE}/favorites`);
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  return response.json();
};

export const addFavorite = async (songId: string) => {
  const response = await fetch(`${API_BASE}/favorites`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ songId }),
  });
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  return response.json();
};

export const removeFavorite = async (favoriteId: string) => {
  const response = await fetch(`${API_BASE}/favorites/${favoriteId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
};