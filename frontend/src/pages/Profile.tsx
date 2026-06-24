import { useEffect, useState } from 'react';
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
} from '@mantine/core';
import type { User, WatchHistoryEntry } from '../types';
import { animeService } from '../services/animeService';
import Loaders from '../components/shared/Loaders';
import { formatDate } from '../utils/formateDate';

function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [history, setHistory] = useState<WatchHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [userData, historyData] = await Promise.all([
          animeService.getProfile(),
          animeService.getHistory(),
        ]);
        setUser(userData);
        setHistory(historyData);
      } catch (error) {
        console.error('Error loading profile or history:', error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <Container size="md" py="xl">
        <Loaders type="skeleton" lines={6} height={24} />
      </Container>
    );
  }

  if (!user) {
    return (
      <Container size="md" py="xl">
        <Text c="dimmed">No se pudo cargar el perfil.</Text>
      </Container>
    );
  }

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
          <Text c="dimmed" py="xl">
            Cargando favoritos...
          </Text>
        </Tabs.Panel>

        <Tabs.Panel value="settings">
          <Text c="dimmed" py="xl">
            Cargando configuración...
          </Text>
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}

export default Profile;
