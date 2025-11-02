interface Song {
  id: string;
  artist: string;
  title: string;
  level: number;
  images: string;
}

interface Favorite {
  id: string;
  songId: string;
}

export type { Song, Favorite };