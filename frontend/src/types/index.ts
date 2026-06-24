export interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface Anime {
  id: number;
  malId?: number;
  title: string;
  titleEnglish?: string;
  titleJapanese?: string;
  synopsis?: string;
  type?: string;
  source?: string;
  episodes?: number;
  status?: string;
  airing?: boolean;
  airedFrom?: string;
  airedTo?: string;
  duration?: string;
  rating?: string;
  score?: number;
  scoredBy?: number;
  rank?: number;
  popularity?: number;
  members?: number;
  season?: string;
  year?: number;
  imageUrl?: string;
  trailerUrl?: string;
  genres: string[];
}

export interface Episode {
  id: number;
  malId?: number;
  animeId: number;
  number: number;
  title?: string;
  aired?: string;
  filler: boolean;
  recap: boolean;
  duration?: number;
}

export interface Genre {
  id: number;
  malId?: number;
  name: string;
}

export interface Favorite {
  id: number;
  animeId: number;
  title: string;
  imageUrl?: string;
  addedAt: string;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  user: Pick<User, 'id' | 'name'>;
}

export interface WatchHistoryEntry {
  id: number;
  animeId: number;
  animeTitle: string;
  animeImage?: string;
  episodeId?: number;
  episodeNumber?: number;
  episodeTitle?: string;
  watchedAt: string;
  progress?: number;
}

export interface PaginatedResponse<T> {
  page: number;
  totalPages: number;
  results: T[];
}
