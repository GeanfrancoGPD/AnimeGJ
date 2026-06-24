import {
  Button,
  Card,
  Image,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
} from '@mantine/core';
import type { Favorite } from '../../types';
import { formatDate } from '../../utils/formateDate';

interface HistoryTabProps {
  favorites: Favorite[];
  onRemove: (animeId: number) => void;
  removingId: number | null;
}

export default function FavoritesTab({
  favorites,
  onRemove,
  removingId,
}: HistoryTabProps) {
  return (
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
                onClick={() => onRemove(fav.animeId)}
              >
                Quitar
              </Button>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Tabs.Panel>
  );
}
