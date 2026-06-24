import { useEffect, useReducer } from 'react';
import {
  Container,
  Avatar,
  Title,
  Text,
  Group,
  Stack,
  Tabs,
  Timeline,
  Progress,
  Box,
  Card,
  SimpleGrid,
  Image,
  Button,
  TextInput,
  Badge,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import type { User, WatchHistoryEntry, Favorite } from '../../types';
import { animeService } from '../../services/animeService';
import Loaders from '../../components/shared/Loaders';
import ConfirmModal from '../../components/shared/ConfirmModal';
import { formatDate } from '../../utils/formateDate';
import ProfileHeader from './ProfileHeader';
import WatchingHistoryTab from './WatchingHistoryTab';
import FavoritesTab from './FavoritesTab';
import SettingsTab from './SettingsTab';

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

function Profile() {
  const [state, dispatch] = useReducer(profileReducer, initialState);
  const [opened, { open, close }] = useDisclosure(false);

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

  if (state.loading) {
    return (
      <Container size="md" py="xl">
        <Loaders type="skeleton" lines={6} height={24} />
      </Container>
    );
  }

  if (!state.user) {
    return (
      <Container size="md" py="xl">
        <Text c="dimmed">No se pudo cargar el perfil.</Text>
      </Container>
    );
  }

  const { user, history, favorites, removingId, confirmAnimeId } = state;

  return (
    <Container size="md" py="xl">
      <ProfileHeader user={user} />

      <Tabs defaultValue="history">
        <Tabs.List mb="md">
          <Tabs.Tab value="history">Watching History</Tabs.Tab>
          <Tabs.Tab value="favorites">My List / Favorites</Tabs.Tab>
          <Tabs.Tab value="settings">Account Settings</Tabs.Tab>
        </Tabs.List>

        <WatchingHistoryTab entries={history} />
        <FavoritesTab
          favorites={favorites}
          onRemove={openRemoveConfirm}
          removingId={removingId}
        />
        <SettingsTab user={user} />
      </Tabs>

      <ConfirmModal
        opened={opened}
        onClose={() => {
          close();
          dispatch({ type: 'CANCEL_REMOVE' });
        }}
        onConfirm={() => confirmAnimeId && handleRemoveFavorite(confirmAnimeId)}
        title="Quitar favorito"
        message="¿Estás seguro de que deseas eliminar este anime de tu lista de favoritos?"
        confirmLabel="Eliminar"
        color="red"
        loading={removingId !== null}
      />
    </Container>
  );
}

export default Profile;
