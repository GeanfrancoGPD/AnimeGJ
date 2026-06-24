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
import type { User, WatchHistoryEntry, Favorite } from '../types';
import { animeService } from '../services/animeService';
import Loaders from '../components/shared/Loaders';
import ConfirmModal from '../components/shared/ConfirmModal';
import { formatDate } from '../utils/formateDate';

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
      <Group align="flex-start" gap="lg" mb="xl">
        <Avatar size={80} name={user.name} color="initials" />
        <Stack gap={4}>
          <Title order={2}>{user.name}</Title>
          <Text size="sm" c="dimmed">
            {user.email}
          </Text>
          <Text size="xs" c="dimmed">
            Miembro desde: {formatDate(user.createdAt)}
          </Text>
        </Stack>
      </Group>

      <Tabs defaultValue="history">
        <Tabs.List mb="md">
          <Tabs.Tab value="history">Watching History</Tabs.Tab>
          <Tabs.Tab value="favorites">My List / Favorites</Tabs.Tab>
          <Tabs.Tab value="settings">Account Settings</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="history">
          {history.length === 0 ? (
            <Text c="dimmed" py="xl">
              No hay historial de reproducción.
            </Text>
          ) : (
            <Timeline active={history.length - 1} bulletSize={20} lineWidth={2}>
              {history.map((entry) => (
                <Timeline.Item key={entry.id} title={entry.animeTitle}>
                  <Text size="sm">
                    {entry.episodeNumber != null && (
                      <>
                        Episodio {entry.episodeNumber}
                        {entry.episodeTitle
                          ? `: ${entry.episodeTitle}`
                          : ''}{' '}
                        —{' '}
                      </>
                    )}
                    <Text component="span" c="dimmed">
                      {formatDate(entry.watchedAt)}
                    </Text>
                  </Text>
                  <Box mt={4}>
                    <Progress
                      value={entry.progress ?? 0}
                      size="sm"
                      color={entry.progress === 100 ? 'green' : 'blue'}
                    />
                    <Text size="xs" c="dimmed" mt={2}>
                      {entry.progress ?? 0}% completado
                    </Text>
                  </Box>
                </Timeline.Item>
              ))}
            </Timeline>
          )}
        </Tabs.Panel>

        <Tabs.Panel value="favorites">
          {favorites.length === 0 ? (
            <Text c="dimmed" py="xl">
              No tienes animes favoritos aún.
            </Text>
          ) : (
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
              {favorites.map((fav) => (
                <Card key={fav.id} shadow="sm" radius="md" withBorder>
                  <Card.Section>
                    <Image
                      src={fav.imageUrl}
                      alt={fav.title}
                      height={160}
                      fallbackSrc="https://placehold.co/300x160/2e303a/9ca3af?text=Sin+imagen"
                    />
                  </Card.Section>
                  <Stack gap={4} mt="sm" mb="xs">
                    <Text fw={500} lineClamp={2}>
                      {fav.title}
                    </Text>
                    <Text size="xs" c="dimmed">
                      Agregado el {formatDate(fav.addedAt)}
                    </Text>
                  </Stack>
                  <Button
                    variant="light"
                    color="red"
                    size="xs"
                    fullWidth
                    onClick={() => openRemoveConfirm(fav.animeId)}
                  >
                    Quitar
                  </Button>
                </Card>
              ))}
            </SimpleGrid>
          )}
        </Tabs.Panel>

        <Tabs.Panel value="settings">
          <Card withBorder shadow="sm" radius="md" p="lg" maw={480}>
            <Stack gap="md">
              <Group gap="xs">
                <Text fw={500}>Account Settings</Text>
                <Badge
                  size="sm"
                  variant="light"
                  color={user.role === 'admin' ? 'yellow' : 'blue'}
                >
                  {user.role}
                </Badge>
              </Group>
              <TextInput label="Nombre" value={user.name} readOnly />
              <TextInput label="Email" value={user.email} readOnly />
              <Text size="xs" c="dimmed">
                Los cambios de perfil estarán disponibles cuando el backend
                implemente el endpoint de actualización.
              </Text>
            </Stack>
          </Card>
        </Tabs.Panel>
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
