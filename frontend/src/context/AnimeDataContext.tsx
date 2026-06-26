import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { animeService } from '../services/animeService';
import type { Anime } from '../types';

interface AnimeDataContextValue {
  animes: Anime[];
  loading: boolean;
  genres: { malId: number; name: string }[];
}

const TOTAL_PAGES = 5;

const AnimeDataContext = createContext<AnimeDataContextValue>({ animes: [], loading: true, genres: [] });

export function AnimeDataProvider({ children }: { children: ReactNode }) {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [genres, setGenres] = useState<{ malId: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [genreData] = await Promise.all([
          animeService.getGenres(),
        ]);
        if (cancelled) return;
        setGenres(genreData);

        const all: Anime[] = [];
        const BATCH_SIZE = 3;

        for (let start = 1; start <= TOTAL_PAGES; start += BATCH_SIZE) {
          const batch = [];
          for (let p = start; p < start + BATCH_SIZE && p <= TOTAL_PAGES; p++) {
            batch.push(animeService.getAnimes(p));
          }
          const results = await Promise.all(batch);
          if (cancelled) return;
          for (const r of results) {
            all.push(...r.results);
          }
          setAnimes([...all]);
          if (start + BATCH_SIZE <= TOTAL_PAGES) {
            await new Promise((r) => setTimeout(r, 1000));
          }
        }
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
