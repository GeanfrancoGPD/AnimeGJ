import { Title, Text, Stack, Group, Badge, Card } from '@mantine/core';
import { IconPlayerPlay } from '@tabler/icons-react';
import type { Episode } from '../../types';
import { formatDate } from '../../utils/formateDate';

interface EpisodeListProps {
  episodes: Episode[];
}

function EpisodeList({ episodes }: EpisodeListProps) {
  if (episodes.length === 0) {
    return (
      <Text c="dimmed" py="xl">
        No hay episodios disponibles.
      </Text>
    );
  }

  return (
    <>
      <Title order={3} mb="md">
        Episodios ({episodes.length})
      </Title>

      <Stack gap="xs">
        {episodes
          .slice()
          .sort((a, b) => a.number - b.number)
          .map((ep) => (
            <Card key={ep.id} withBorder shadow="sm" radius="md" p="sm">
              <Group justify="space-between" align="center">
                <Group gap="sm" align="center">
                  <Badge
                    size="lg"
                    variant="filled"
                    color="blue"
                    leftSection={<IconPlayerPlay size={12} />}
                    style={{ minWidth: 48 }}
                  >
                    {ep.number}
                  </Badge>
                  <div>
                    <Text size="sm" fw={500}>
                      {ep.title || `Episodio ${ep.number}`}
                    </Text>
                    {ep.aired && (
                      <Text size="xs" c="dimmed">
                        {formatDate(ep.aired)}
                      </Text>
                    )}
                  </div>
                </Group>

                <Group gap={4}>
                  {ep.filler && (
                    <Badge size="xs" variant="light" color="orange">
                      Filler
                    </Badge>
                  )}
                  {ep.recap && (
                    <Badge size="xs" variant="light" color="violet">
                      Recap
                    </Badge>
                  )}
                  {ep.duration != null && (
                    <Text size="xs" c="dimmed">
                      {ep.duration > 60
                        ? `${Math.floor(ep.duration / 60)} min`
                        : `${ep.duration}s`}
                    </Text>
                  )}
                </Group>
              </Group>
            </Card>
          ))}
      </Stack>
    </>
  );
}

export default EpisodeList;
