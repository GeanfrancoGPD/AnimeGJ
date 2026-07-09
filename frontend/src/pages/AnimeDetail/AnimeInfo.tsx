import {
  Image,
  Title,
  Text,
  Badge,
  Group,
  Stack,
  Button,
  Card,
} from '@mantine/core';
import { IconHeart, IconHeartOff } from '@tabler/icons-react';
import type { Anime } from '../../types';

interface AnimeInfoProps {
  anime: Anime;
  isFavorited: boolean;
  togglingFavorite: boolean;
  onToggleFavorite: () => void;
}

function AnimeInfo({
  anime,
  isFavorited,
  togglingFavorite,
  onToggleFavorite,
}: AnimeInfoProps) {
  return (
    <Card withBorder shadow="sm" radius="md" p="lg" mb="xl">
      <Group align="flex-start" gap="lg" wrap="nowrap">
        <Image
          src={anime.imageUrl}
          alt={anime.title}
          w={220}
          radius="md"
          fallbackSrc="https://placehold.co/220x310/2e303a/9ca3af?text=Sin+imagen"
        />

        <Stack gap="xs" style={{ flex: 1 }}>
          <Title order={2}>{anime.title}</Title>

          {anime.titleEnglish && anime.titleEnglish !== anime.title && (
            <Text size="sm" c="dimmed">
              {anime.titleEnglish}
            </Text>
          )}

          <Group gap="xs">
            {anime.score != null && (
              <Badge size="lg" variant="filled" color="yellow">
                ⭐ {anime.score}
              </Badge>
            )}
            {anime.type && (
              <Badge size="lg" variant="light">
                {anime.type}
              </Badge>
            )}
            {anime.year && (
              <Badge size="lg" variant="light">
                {anime.year}
              </Badge>
            )}
            {anime.rating && (
              <Badge size="lg" variant="light">
                {anime.rating}
              </Badge>
            )}
          </Group>

          <Group gap={4}>
            {anime.genres.map((genre) => (
              <Badge key={genre} size="sm" variant="outline" color="grape">
                {genre}
              </Badge>
            ))}
          </Group>

          <Text size="sm" c="dimmed">
            {anime.status}
            {anime.episodes != null && ` · ${anime.episodes} episodios`}
            {anime.duration && ` · ${anime.duration}`}
          </Text>

          <Text size="sm" lineClamp={5} mt="xs">
            {anime.synopsis}
          </Text>

          <Button
            mt="md"
            variant={isFavorited ? 'light' : 'filled'}
            color={isFavorited ? 'red' : 'pink'}
            leftSection={
              isFavorited ? <IconHeartOff size={18} /> : <IconHeart size={18} />
            }
            onClick={onToggleFavorite}
            loading={togglingFavorite}
            style={{ alignSelf: 'flex-start' }}
          >
            {isFavorited ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          </Button>
        </Stack>
      </Group>
    </Card>
  );
}

export default AnimeInfo;
