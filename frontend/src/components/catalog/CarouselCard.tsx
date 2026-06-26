import { Paper, Image, Text, Badge, Group, Stack, useMantineColorScheme } from '@mantine/core';
import { IconStar } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import type { Anime } from '../../types';

interface CarouselCardProps {
  anime: Anime;
}

export default function CarouselCard({ anime }: CarouselCardProps) {
  const navigate = useNavigate();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Paper
      radius="md"
      style={{
        minWidth: 180,
        maxWidth: 180,
        backgroundColor: isDark ? 'var(--mantine-color-dark-6)' : 'var(--mantine-color-gray-0)',
        border: `1px solid ${isDark ? 'var(--mantine-color-dark-4)' : 'var(--mantine-color-gray-3)'}`,
        overflow: 'hidden',
        cursor: 'pointer',
        flexShrink: 0,
        transition: 'transform 0.2s ease, border-color 0.2s ease',
      }}
      styles={{
        root: {
          '&:hover': {
            transform: 'scale(1.05)',
            borderColor: 'var(--mantine-color-violet-5)',
          },
        },
      }}
      onClick={() => navigate(`/anime/${anime.id}`)}
    >
      <Image
        src={anime.imageUrl}
        alt={anime.title}
        height={240}
        fallbackSrc="https://placehold.co/300x450/1a1630/7c3aed?text=AnimeVerse"
        style={{ objectFit: 'cover' }}
      />
      <Stack gap={4} p="xs">
        <Text size="xs" fw={600} lineClamp={1}>
          {anime.titleEnglish ?? anime.title}
        </Text>
        <Group gap={4}>
          <IconStar size={10} fill="var(--mantine-color-yellow-5)" color="var(--mantine-color-yellow-5)" />
          <Text size="xs" c="yellow.5" fw={600}>{anime.score?.toFixed(1)}</Text>
          <Badge size="xs" variant="light" color="violet" ml="auto">{anime.type}</Badge>
        </Group>
      </Stack>
    </Paper>
  );
}
