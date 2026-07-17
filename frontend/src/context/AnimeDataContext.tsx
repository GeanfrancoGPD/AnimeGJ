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
        const genresList = await animeService.getGenres();
        if (cancelled) return;
        setGenres(genresList);

        // Pequeño retardo después de traer los géneros antes de pedir el primer lote de animes
        await new Promise((r) => setTimeout(r, 1000));

        const all: Anime[] = [];
        for (let p = 1; p <= TOTAL_PAGES; p++) {
          if (cancelled) return;
          try {
            const r = await animeService.getAnimes(p);
            if (cancelled) return;
            all.push(...r.results.filter((a) => !all.some((e) => e.id === a.id)));
            setAnimes([...all]);
          } catch (pageErr) {
            console.error(`Error loading page ${p}:`, pageErr);
            // Si falla una página, intentamos esperar un poco más y continuar en vez de romper toda la carga
            await new Promise((r) => setTimeout(r, 2000));
          }

          if (p < TOTAL_PAGES) {
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
