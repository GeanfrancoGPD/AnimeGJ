import { Box, Progress, Tabs, Text, Timeline } from '@mantine/core';
import type { WatchHistoryEntry } from '../../types';
import { formatDate } from '../../utils/formateDate';

interface Props {
  entries: WatchHistoryEntry[];
}

export default function WatchingHistoryTab({ entries }: Props) {
  const history = entries.sort(
    (a, b) => new Date(a.watchedAt).getTime() - new Date(b.watchedAt).getTime(),
  );

  return (
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
                    {entry.episodeTitle ? `: ${entry.episodeTitle}` : ''} —{' '}
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
  );
}
