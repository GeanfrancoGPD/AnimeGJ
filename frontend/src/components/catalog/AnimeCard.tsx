import { Card, Image, Badge, Group, Text, Stack, useMantineColorScheme } from '@mantine/core';
import { IconStar } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import type { Anime } from '../../types';

interface AnimeCardProps {
  anime: Anime;
}

export default function AnimeCard({ anime }: AnimeCardProps) {
  const navigate = useNavigate();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Card
      radius="md"
      padding={0}
      withBorder
      style={{
        backgroundColor: isDark ? 'var(--mantine-color-dark-6)' : 'var(--mantine-color-gray-0)',
        overflow: 'hidden',
        cursor: 'pointer',
        borderColor: isDark ? 'var(--mantine-color-dark-4)' : 'var(--mantine-color-gray-3)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
      }}
      styles={{
        root: {
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: isDark ? '0 8px 24px rgba(124, 58, 237, 0.25)' : '0 8px 24px rgba(124, 58, 237, 0.15)',
            borderColor: 'var(--mantine-color-violet-5)',
          },
          '&:hover .anime-card-image': {
            transform: 'scale(1.05)',
          },
        },
      }}
      onClick={() => navigate(`/anime/${anime.id}`)}
    >
      <Card.Section style={{ overflow: 'hidden' }}>
        <div
          className="anime-card-image"
          style={{
            transition: 'transform 0.3s ease',
            height: 260,
          }}
        >
          <Image
            src={anime.imageUrl}
            alt={anime.title}
            height={260}
            fallbackSrc="https://placehold.co/300x450/1a1630/7c3aed?text=AnimeVerse"
            style={{ objectFit: 'cover', width: '100%' }}
          />
        </div>
      </Card.Section>

      <Stack gap={4} p="sm">
        <Text fw={600} size="sm" lineClamp={1}>
          {anime.titleEnglish ?? anime.title}
        </Text>

        <Group gap={4}>
          <IconStar size={12} fill="var(--mantine-color-yellow-5)" color="var(--mantine-color-yellow-5)" />
          <Text size="xs" fw={600} c="yellow.5">{anime.score?.toFixed(1) ?? 'N/A'}</Text>
          <Text size="xs" c="dimmed" ml="auto">{anime.episodes ?? '?'} ep.</Text>
        </Group>

        <Group gap={4}>
          {anime.genres.slice(0, 2).map((genre) => (
            <Badge key={genre} size="xs" variant="light" color="violet" radius="sm">
              {genre}
            </Badge>
          ))}
        </Group>
      </Stack>
    </Card>
  );
}
