import type { Anime, User, Episode, Comment, Favorite, PaginatedResponse } from '../types';

const API_URL = 'http://localhost:5000/api/animes';

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Error' }));
    throw new Error(error.message ?? `HTTP ${res.status}`);
  }
  return res.json();
}

function mapAnime(row: any): Anime {
  const genres: string[] = [];
  if (row.genres) {
    if (typeof row.genres === 'string') {
      genres.push(...row.genres.split(',').map((g: string) => g.trim()));
    } else if (Array.isArray(row.genres)) {
      genres.push(...row.genres.map((g: any) => (typeof g === 'string' ? g : g.name ?? '')));
    }
  }
  const jpg = row.images?.jpg ?? {};
  return {
    id: row.mal_id ?? row.id,
    malId: row.mal_id ?? row.malId,
    title: row.title,
    titleEnglish: row.title_english ?? row.titleEnglish,
    titleJapanese: row.title_japanese ?? row.titleJapanese,
    synopsis: row.synopsis,
    type: row.type,
    source: row.source,
    episodes: row.episodes,
    status: row.status,
    airing: row.airing,
    airedFrom: row.aired_from ?? row.aired?.from?.split('T')[0] ?? row.airedFrom,
    airedTo: row.aired_to ?? row.aired?.to?.split('T')[0] ?? row.airedTo,
    duration: row.duration,
    rating: row.rating,
    score: row.score != null ? Number(row.score) : undefined,
    scoredBy: row.scored_by ?? row.scoredBy,
    rank: row.rank,
    popularity: row.popularity,
    members: row.members,
    season: row.season,
    year: row.year,
    imageUrl: row.image_url ?? jpg.large_image_url ?? jpg.image_url ?? row.imageUrl,
    trailerUrl: row.trailer_url ?? row.trailer?.url ?? row.trailer?.embed_url ?? row.trailerUrl,
    genres,
  };
}

function mapUser(row: any): User {
  return {
    id: row.id,
    name: row.nombre ?? row.name,
    email: row.gmail ?? row.email,
    role: row.role ?? 'user',
    createdAt: row.created_at ?? row.createdAt,
  };
}

export const animeService = {
  async getAnimes(page = 1, filters?: { genre?: string; year?: number; type?: string }): Promise<PaginatedResponse<Anime>> {
    const params = new URLSearchParams({ page: String(page), limit: '25', order_by: 'scored_by', sort: 'desc' });
    if (filters?.genre) params.set('genres', filters.genre);
    if (filters?.year) params.set('year', String(filters.year));
    if (filters?.type) params.set('type', filters.type);
    const json = await apiFetch<{ success: boolean; data: any[]; pagination?: any }>(`/search?${params}`);
    const results = (json.data ?? []).map(mapAnime);
    const totalPages = json.pagination?.last_visible_page ?? 1;
    return { page, totalPages, results };
  },

  async searchAnimes(query: string, page = 1): Promise<PaginatedResponse<Anime>> {
    const json = await apiFetch<{ success: boolean; data: any[]; pagination?: any }>(`/search?q=${encodeURIComponent(query)}&page=${page}`);
    const results = (json.data ?? []).map(mapAnime);
    const totalPages = json.pagination?.last_visible_page ?? 1;
    return { page, totalPages, results };
  },

  async getAnimeById(id: number): Promise<Anime | null> {
    try {
      const json = await apiFetch<{ success: boolean; data: any }>(`/${id}`);
      return mapAnime(json.data);
    } catch {
      return null;
    }
  },

  async getGenres(): Promise<{ malId: number; name: string }[]> {
    const json = await apiFetch<{ success: boolean; data: any[] }>('/genres');
    return (json.data ?? []).map((g: any) => ({ malId: g.mal_id, name: g.name }));
  },

  async getEpisodes(animeId: number): Promise<Episode[]> {
    try {
      const json = await apiFetch<{ success: boolean; data: any[] }>(`/${animeId}/episodes`);
      return (json.data ?? []).map((e: any) => ({
        id: e.id,
        malId: e.mal_id,
        animeId,
        number: e.number ?? 0,
        title: e.title,
        aired: e.aired,
        filler: e.filler ?? false,
        recap: e.recap ?? false,
        duration: e.duration,
      }));
    } catch {
      return [];
    }
  },

  async login(email: string, password: string): Promise<User> {
    const json = await apiFetch<{ success: boolean; user: any; message: string }>('/login', {
      method: 'POST',
      body: JSON.stringify({ gmail: email, password }),
    });
    const user = mapUser(json.user);
    localStorage.setItem('animegj_user', JSON.stringify(user));
    return user;
  },

  async register(name: string, email: string, password: string): Promise<{ message: string }> {
    const json = await apiFetch<{ success: boolean; message: string }>('/register', {
      method: 'POST',
      body: JSON.stringify({ nombre: name, gmail: email, password }),
    });
    return { message: json.message };
  },

  async logout(): Promise<void> {
    await apiFetch<{ success: boolean; message: string }>('/logout', { method: 'POST' });
    localStorage.removeItem('animegj_user');
  },

  async getProfile(): Promise<User> {
    const json = await apiFetch<{ success: boolean; user: any }>('/auth/me');
    return mapUser(json.user);
  },

  async getComments(animeId: number): Promise<Comment[]> {
    try {
      const json = await apiFetch<{ success: boolean; data: any[] }>(`/comentarios?mal_id=${animeId}`);
      return (json.data ?? []).map((c: any) => ({
        id: c.id,
        content: c.content ?? c.comentario,
        createdAt: c.created_at ?? c.createdAt,
        user: { id: c.user_id ?? c.usuario_id, name: c.nombre ?? c.user_name ?? '' },
      }));
    } catch {
      return [];
    }
  },

  async addComment(animeId: number, content: string): Promise<Comment> {
    const json = await apiFetch<{ success: boolean; data: any }>('/comentarios', {
      method: 'POST',
      body: JSON.stringify({ mal_id: animeId, comment: content }),
    });
    const c = json.data;
    return { id: c.id, content: c.content ?? c.comentario, createdAt: c.created_at, user: { id: c.user_id, name: c.nombre ?? '' } };
  },

  async deleteComment(commentId: number): Promise<{ message: string }> {
    const json = await apiFetch<{ success: boolean; message: string }>(`/comentarios`, {
      method: 'DELETE',
      body: JSON.stringify({ comment_id: commentId }),
    });
    return { message: json.message };
  },

  async getFavorites(): Promise<Favorite[]> {
    try {
      const json = await apiFetch<{ success: boolean; data: any[] }>('/favoritos');
      return (json.data ?? []).map((f: any) => ({
        id: f.id,
        animeId: f.anime_id ?? f.mal_id,
        title: f.title ?? '',
        imageUrl: f.image_url ?? f.imageUrl,
        addedAt: f.created_at ?? f.addedAt,
      }));
    } catch {
      return [];
    }
  },

  async addFavorite(animeId: number, _animeTitle: string, _animeImage?: string): Promise<Favorite> {
    const json = await apiFetch<{ success: boolean; data: any }>('/favorito', {
      method: 'POST',
      body: JSON.stringify({ mal_id: animeId }),
    });
    const f = json.data;
    return { id: f.id, animeId: f.anime_id ?? animeId, title: '', addedAt: f.created_at ?? '' };
  },

  async removeFavorite(animeId: number): Promise<{ message: string }> {
    const json = await apiFetch<{ success: boolean; message: string }>('/favorito', {
      method: 'DELETE',
      body: JSON.stringify({ mal_id: animeId }),
    });
    return { message: json.message };
  },

  async getHistory(): Promise<any[]> {
    return [];
  },
};
