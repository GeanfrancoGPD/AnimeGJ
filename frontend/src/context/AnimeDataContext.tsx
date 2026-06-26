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

    async function fetchAll() {
      try {
        const all: Anime[] = [];
        for (let page = 1; page <= 4; page++) {
          const res = await animeService.getAnimes(page);
          if (cancelled) return;
          all.push(...res.results);
          if (res.results.length < 25) break;
          await new Promise((r) => setTimeout(r, 1200));
        }
        if (!cancelled) {
          setAnimes(all);
        }
      } catch (err) {
        console.error('Error fetching animes:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    async function fetchGenres() {
      try {
        const g = await animeService.getGenres();
        if (!cancelled) setGenres(g);
      } catch {}
    }

    fetchAll();
    fetchGenres();
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
