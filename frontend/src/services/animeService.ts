import type { Anime, User, Episode, Comment, Favorite, PaginatedResponse } from '../types';

const JIKAN_URL = 'https://api.jikan.moe/v4';

async function jikanFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${JIKAN_URL}${path}`);
  if (!res.ok) throw new Error(`Jikan API error: ${res.status}`);
  return res.json();
}

function mapJikanAnime(item: any): Anime {
  return {
    id: item.mal_id,
    malId: item.mal_id,
    title: item.title,
    titleEnglish: item.title_english ?? undefined,
    titleJapanese: item.title_japanese ?? undefined,
    synopsis: item.synopsis ?? undefined,
    type: item.type ?? undefined,
    source: item.source ?? undefined,
    episodes: item.episodes ?? undefined,
    status: item.status ?? undefined,
    airing: item.airing ?? false,
    airedFrom: item.aired?.from?.split('T')[0] ?? undefined,
    airedTo: item.aired?.to?.split('T')[0] ?? undefined,
    duration: item.duration ?? undefined,
    rating: item.rating ?? undefined,
    score: item.score ?? undefined,
    scoredBy: item.scored_by ?? undefined,
    rank: item.rank ?? undefined,
    popularity: item.popularity ?? undefined,
    members: item.members ?? undefined,
    season: item.season ?? undefined,
    year: item.year ?? undefined,
    imageUrl: item.images?.jpg?.large_image_url ?? item.images?.jpg?.image_url ?? undefined,
    trailerUrl: item.trailer?.url ?? item.trailer?.embed_url ?? undefined,
    genres: (item.genres ?? []).map((g: any) => g.name),
  };
}

export const animeService = {
  async getAnimes(page = 1, filters?: { genre?: string; year?: number; type?: string }): Promise<PaginatedResponse<Anime>> {
    const params = new URLSearchParams();
    params.set('page', String(page));
    params.set('limit', '25');
    if (filters?.genre) params.set('genres', filters.genre);
    if (filters?.year) params.set('year', String(filters.year));
    if (filters?.type) params.set('type', filters.type);

    const json = await jikanFetch<any>(`/anime?${params.toString()}`);
    const results = (json.data ?? []).map(mapJikanAnime);
    const totalPages = json.pagination?.last_visible_page ?? 1;
    return { page, totalPages, results };
  },

  async searchAnimes(query: string, page = 1): Promise<PaginatedResponse<Anime>> {
    const json = await jikanFetch<any>(`/anime?q=${encodeURIComponent(query)}&page=${page}&limit=25`);
    const results = (json.data ?? []).map(mapJikanAnime);
    const totalPages = json.pagination?.last_visible_page ?? 1;
    return { page, totalPages, results };
  },

  async getAnimeById(id: number): Promise<Anime | null> {
    try {
      const json = await jikanFetch<any>(`/anime/${id}/full`);
      return mapJikanAnime(json.data);
    } catch {
      return null;
    }
  },

  async getGenres(): Promise<{ malId: number; name: string }[]> {
    const json = await jikanFetch<any>('/genres/anime');
    return (json.data ?? []).map((g: any) => ({ malId: g.mal_id, name: g.name }));
  },

  async getEpisodes(animeId: number): Promise<Episode[]> {
    try {
      const json = await jikanFetch<any>(`/anime/${animeId}/episodes`);
      return (json.data ?? []).map((e: any) => ({
        id: e.mal_id,
        malId: e.mal_id,
        animeId,
        number: e.number ?? 0,
        title: e.title ?? undefined,
        aired: e.aired ?? undefined,
        filler: e.filler ?? false,
        recap: e.recap ?? false,
        duration: e.duration ?? undefined,
      }));
    } catch {
      return [];
    }
  },

  // Mock auth — no backend
  async login(_email: string, _password: string): Promise<User> {
    await new Promise((r) => setTimeout(r, 800));
    return { id: 1, name: 'Usuario', email: _email, role: 'user', createdAt: new Date().toISOString() };
  },

  async register(_name: string, _email: string, _password: string): Promise<{ message: string }> {
    await new Promise((r) => setTimeout(r, 800));
    return { message: 'Usuario registrado correctamente' };
  },

  async logout(): Promise<void> {
    localStorage.removeItem('animegj_user');
  },

  async getProfile(): Promise<User> {
    const stored = localStorage.getItem('animegj_user');
    if (stored) return JSON.parse(stored);
    throw new Error('No hay sesión activa');
  },

  async getComments(_animeId: number): Promise<Comment[]> {
    return [];
  },

  async addComment(_animeId: number, _content: string): Promise<Comment> {
    throw new Error('Not implemented');
  },

  async deleteComment(_commentId: number): Promise<{ message: string }> {
    throw new Error('Not implemented');
  },

  async getFavorites(): Promise<Favorite[]> {
    return [];
  },

  async addFavorite(_animeId: number, _animeTitle: string, _animeImage?: string): Promise<Favorite> {
    throw new Error('Not implemented');
  },

  async removeFavorite(_animeId: number): Promise<{ message: string }> {
    throw new Error('Not implemented');
  },

  async getHistory(): Promise<any[]> {
    return [];
  },
};
