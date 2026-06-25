import { useEffect, useReducer } from 'react';
import type { Anime, Episode, Comment } from '../types';
import { animeService } from '../services/animeService';

interface AnimeDetailState {
  anime: Anime | null;
  episodes: Episode[];
  comments: Comment[];
  loading: boolean;
  error: string | null;
  isFavorited: boolean;
  togglingFavorite: boolean;
  newComment: string;
  submittingComment: boolean;
}

type AnimeDetailAction =
  | { type: 'LOAD_START' }
  | {
      type: 'LOAD_SUCCESS';
      payload: {
        anime: Anime;
        episodes: Episode[];
        comments: Comment[];
        isFavorited: boolean;
      };
    }
  | { type: 'LOAD_ERROR'; payload: string }
  | { type: 'SET_NEW_COMMENT'; payload: string }
  | { type: 'TOGGLE_FAVORITE_START' }
  | { type: 'TOGGLE_FAVORITE_SUCCESS'; payload: boolean }
  | { type: 'TOGGLE_FAVORITE_ERROR' }
  | { type: 'SUBMIT_COMMENT_START' }
  | { type: 'SUBMIT_COMMENT_SUCCESS'; payload: Comment }
  | { type: 'SUBMIT_COMMENT_ERROR' };

const initialState: AnimeDetailState = {
  anime: null,
  episodes: [],
  comments: [],
  loading: true,
  error: null,
  isFavorited: false,
  togglingFavorite: false,
  newComment: '',
  submittingComment: false,
};

function animeDetailReducer(
  state: AnimeDetailState,
  action: AnimeDetailAction,
): AnimeDetailState {
  switch (action.type) {
    case 'LOAD_START':
      return { ...state, loading: true, error: null };
    case 'LOAD_SUCCESS':
      return {
        ...state,
        loading: false,
        anime: action.payload.anime,
        episodes: action.payload.episodes,
        comments: action.payload.comments,
        isFavorited: action.payload.isFavorited,
      };
    case 'LOAD_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'SET_NEW_COMMENT':
      return { ...state, newComment: action.payload };
    case 'TOGGLE_FAVORITE_START':
      return { ...state, togglingFavorite: true };
    case 'TOGGLE_FAVORITE_SUCCESS':
      return { ...state, togglingFavorite: false, isFavorited: action.payload };
    case 'TOGGLE_FAVORITE_ERROR':
      return { ...state, togglingFavorite: false };
    case 'SUBMIT_COMMENT_START':
      return { ...state, submittingComment: true };
    case 'SUBMIT_COMMENT_SUCCESS':
      return {
        ...state,
        submittingComment: false,
        newComment: '',
        comments: [...state.comments, action.payload],
      };
    case 'SUBMIT_COMMENT_ERROR':
      return { ...state, submittingComment: false };
    default:
      return state;
  }
}

export default function useAnimeDetail(id: number) {
  const [state, dispatch] = useReducer(animeDetailReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'LOAD_START' });
    async function load() {
      try {
        const [anime, episodes, comments, favorites] = await Promise.all([
          animeService.getAnimeById(id),
          animeService.getEpisodes(id),
          animeService.getComments(id),
          animeService.getFavorites(),
        ]);

        if (!anime) {
          dispatch({ type: 'LOAD_ERROR', payload: 'Anime no encontrado' });
          return;
        }

        const isFavorited = favorites.some((f) => f.animeId === id);
        dispatch({
          type: 'LOAD_SUCCESS',
          payload: { anime, episodes, comments, isFavorited },
        });
      } catch {
        dispatch({
          type: 'LOAD_ERROR',
          payload: 'Error al cargar los datos del anime',
        });
      }
    }
    load();
  }, [id]);

  function setNewComment(value: string) {
    dispatch({ type: 'SET_NEW_COMMENT', payload: value });
  }

  async function handleToggleFavorite() {
    dispatch({ type: 'TOGGLE_FAVORITE_START' });
    try {
      const anime = state.anime;
      if (!anime) return;

      if (state.isFavorited) {
        await animeService.removeFavorite(anime.id);
        dispatch({ type: 'TOGGLE_FAVORITE_SUCCESS', payload: false });
      } else {
        await animeService.addFavorite(anime.id, anime.title, anime.imageUrl);
        dispatch({ type: 'TOGGLE_FAVORITE_SUCCESS', payload: true });
      }
    } catch {
      dispatch({ type: 'TOGGLE_FAVORITE_ERROR' });
    }
  }

  async function handleSubmitComment() {
    if (!state.newComment.trim() || !state.anime) return;
    dispatch({ type: 'SUBMIT_COMMENT_START' });
    try {
      const comment = await animeService.addComment(
        state.anime.id,
        state.newComment.trim(),
      );
      dispatch({ type: 'SUBMIT_COMMENT_SUCCESS', payload: comment });
    } catch {
      dispatch({ type: 'SUBMIT_COMMENT_ERROR' });
    }
  }

  return {
    anime: state.anime,
    episodes: state.episodes,
    comments: state.comments,
    loading: state.loading,
    error: state.error,
    isFavorited: state.isFavorited,
    togglingFavorite: state.togglingFavorite,
    newComment: state.newComment,
    submittingComment: state.submittingComment,
    setNewComment,
    handleToggleFavorite,
    handleSubmitComment,
  };
}
