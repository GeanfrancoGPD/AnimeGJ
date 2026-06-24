import { useEffect, useReducer } from 'react';
import type { Favorite, User, WatchHistoryEntry } from '../types';
import { animeService } from '../services/animeService';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';

interface ProfileState {
  user: User | null;
  history: WatchHistoryEntry[];
  favorites: Favorite[];
  loading: boolean;
  removingId: number | null;
  confirmAnimeId: number | null;
}

type ProfileAction =
  | { type: 'LOAD_START' }
  | {
      type: 'LOAD_SUCCESS';
      payload: {
        user: User;
        history: WatchHistoryEntry[];
        favorites: Favorite[];
      };
    }
  | { type: 'LOAD_ERROR' }
  | { type: 'CONFIRM_REMOVE'; payload: number }
  | { type: 'CANCEL_REMOVE' }
  | { type: 'REMOVE_START'; payload: number }
  | { type: 'REMOVE_SUCCESS'; payload: number }
  | { type: 'REMOVE_ERROR' };

const initialState: ProfileState = {
  user: null,
  history: [],
  favorites: [],
  loading: true,
  removingId: null,
  confirmAnimeId: null,
};

function profileReducer(
  state: ProfileState,
  action: ProfileAction,
): ProfileState {
  switch (action.type) {
    case 'LOAD_START':
      return { ...state, loading: true };
    case 'LOAD_SUCCESS':
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        history: action.payload.history,
        favorites: action.payload.favorites,
      };
    case 'LOAD_ERROR':
      return { ...state, loading: false };
    case 'CONFIRM_REMOVE':
      return { ...state, confirmAnimeId: action.payload };
    case 'CANCEL_REMOVE':
      return { ...state, confirmAnimeId: null };
    case 'REMOVE_START':
      return { ...state, removingId: action.payload };
    case 'REMOVE_SUCCESS':
      return {
        ...state,
        favorites: state.favorites.filter((f) => f.animeId !== action.payload),
        removingId: null,
        confirmAnimeId: null,
      };
    case 'REMOVE_ERROR':
      return { ...state, removingId: null };
    default:
      return state;
  }
}

export default function useProfileReducer() {
  const [state, dispatch] = useReducer(profileReducer, initialState);
  const [opened, { open, close }] = useDisclosure(false);

  async function handleRemoveFavorite(animeId: number) {
    console.log('Removing favorite anime with ID:', animeId);
    dispatch({ type: 'REMOVE_START', payload: animeId });
    try {
      await animeService.removeFavorite(animeId);
      dispatch({ type: 'REMOVE_SUCCESS', payload: animeId });
      close();

      notifications.show({
        title: 'Favorito eliminado',
        message: 'El anime se eliminó de tu lista.',
        color: 'green',
      });
    } catch {
      dispatch({ type: 'REMOVE_ERROR' });
      notifications.show({
        title: 'Error',
        message: 'No se pudo eliminar el favorito.',
        color: 'red',
      });
    }
  }

  function openRemoveConfirm(animeId: number) {
    dispatch({ type: 'CONFIRM_REMOVE', payload: animeId });
    open();
  }

  useEffect(() => {
    dispatch({ type: 'LOAD_START' });
    async function load() {
      try {
        const [userData, historyData, favoritesData] = await Promise.all([
          animeService.getProfile(),
          animeService.getHistory(),
          animeService.getFavorites(),
        ]);
        dispatch({
          type: 'LOAD_SUCCESS',
          payload: {
            user: userData,
            history: historyData,
            favorites: favoritesData,
          },
        });
      } catch {
        dispatch({ type: 'LOAD_ERROR' });
      }
    }

    load();
  }, []);

  const { user, history, favorites, loading, removingId, confirmAnimeId } = state;

  function closeConfirm() {
    close();
    dispatch({ type: 'CANCEL_REMOVE' });
  }

  return {
    state,
    user,
    history,
    favorites,
    loading,
    removingId,
    confirmAnimeId,
    opened,
    closeConfirm,
    handleRemoveFavorite,
    openRemoveConfirm,
  };
}
