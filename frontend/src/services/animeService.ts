import type {
  User,
  Anime,
  Episode,
  Comment,
  Favorite,
  WatchHistoryEntry,
  PaginatedResponse,
} from '../types';
import { mockApi } from './mockData';

// This variable controls whether to use mock data or real API calls.
// Set it to false to use the real API.
const USE_MOCK = true;

function buildUrl(path: string): string {
  return `${import.meta.env.VITE_API_URL ?? 'http://localhost:3001'}${path}`;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(buildUrl(path), {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Error de red' }));
    throw new Error(error.message ?? `HTTP ${res.status}`);
  }

  return res.json();
}

export const animeService = {
  async getProfile(): Promise<User> {
    if (USE_MOCK) return mockApi.getProfile();

    const getData = await fetch(buildUrl('/api/auth/me'));
    const data = await getData.json();

    return data.user as User;
  },

  async getAnimes(
    page?: number,
    filters?: { genre?: string; year?: number; type?: string },
  ): Promise<PaginatedResponse<Anime>> {
    if (USE_MOCK) return await mockApi.getAnimes(page, filters);

    const params = new URLSearchParams();
    if (page) params.set('page', String(page));
    if (filters?.genre) params.set('genre', filters.genre);
    if (filters?.year) params.set('year', String(filters.year));
    if (filters?.type) params.set('type', filters.type);

    return await request<PaginatedResponse<Anime>>(
      `/api/animes?${params.toString()}`,
    );
  },

  async getAnimeById(id: number): Promise<Anime | null> {
    if (USE_MOCK) return await mockApi.getAnimeById(id);
    return await request<Anime>(`/api/animes/${id}`);
  },

  async getEpisodes(animeId: number): Promise<Episode[]> {
    if (USE_MOCK) return await mockApi.getEpisodes(animeId);
    return await request<Episode[]>(`/api/animes/${animeId}/episodes`);
  },

  async getComments(animeId: number): Promise<Comment[]> {
    if (USE_MOCK) return await mockApi.getComments(animeId);
    return await request<Comment[]>(`/api/animes/${animeId}/comments`);
  },

  async addComment(animeId: number, content: string): Promise<Comment> {
    if (USE_MOCK) return await mockApi.addComment(animeId, content);
    return await request<Comment>('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ animeId, content }),
    });
  },

  async deleteComment(commentId: number): Promise<{ message: string }> {
    if (USE_MOCK) return await mockApi.deleteComment(commentId);
    return await request<{ message: string }>(`/api/comments/${commentId}`, {
      method: 'DELETE',
    });
  },

  async getFavorites(): Promise<Favorite[]> {
    if (USE_MOCK) return await mockApi.getFavorites();
    return await request<Favorite[]>('/api/favorites');
  },

  async addFavorite(
    animeId: number,
    animeTitle: string,
    animeImage?: string,
  ): Promise<Favorite> {
    if (USE_MOCK) {
      return await mockApi.addFavorite(animeId, animeTitle, animeImage);
    }

    return await request<Favorite>('/api/favorites', {
      method: 'POST',
      body: JSON.stringify({ animeId }),
    });
  },

  async removeFavorite(animeId: number): Promise<{ message: string }> {
    if (USE_MOCK) return await mockApi.removeFavorite(animeId);
    return await request<{ message: string }>(`/api/favorites/${animeId}`, {
      method: 'DELETE',
    });
  },

  async getHistory(): Promise<WatchHistoryEntry[]> {
    if (USE_MOCK) return await mockApi.getHistory();
    return await request<WatchHistoryEntry[]>('/api/history');
  },
};
