export const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error('Failed to fetch data');
    error.message = await response.json();
    throw error.message;
  }

  return response.json();
};