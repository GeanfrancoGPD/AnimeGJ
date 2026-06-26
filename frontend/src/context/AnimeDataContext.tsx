import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { animeService } from '../services/animeService';
import type { Anime } from '../types';

interface AnimeDataContextValue {
  animes: Anime[];
  loading: boolean;
  genres: { malId: number; name: string }[];
}

const AnimeDataContext = createContext<AnimeDataContextValue>({ animes: [], loading: true, genres: [] });

export function AnimeDataProvider({ children }: { children: ReactNode }) {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [genres, setGenres] = useState<{ malId: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [page1, genreData] = await Promise.all([
          animeService.getAnimes(1),
          animeService.getGenres(),
        ]);
        if (cancelled) return;
        setAnimes(page1.results);
        setGenres(genreData);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <AnimeDataContext.Provider value={{ animes, loading, genres }}>
      {children}
    </AnimeDataContext.Provider>
  );
}

export function useAnimeData() {
  return useContext(AnimeDataContext);
}
