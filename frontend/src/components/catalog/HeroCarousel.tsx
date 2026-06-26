import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Container,
  Title,
  Text,
  Badge,
  Group,
  Stack,
  Button,
  UnstyledButton,
  useMantineColorScheme,
} from '@mantine/core';
import { useInterval } from '@mantine/hooks';
import { IconPlayerPlay, IconInfoCircle, IconStar } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import type { Anime } from '../../types';

const HERO_INTERVAL = 6000;

interface HeroCarouselProps {
  animes: Anime[];
}

export default function HeroCarousel({ animes }: HeroCarouselProps) {
  const navigate = useNavigate();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const [heroIndex, setHeroIndex] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);

  if (!animes.length) return null;

  const hero = animes[heroIndex];

  const next = useCallback(() => {
    setFadeKey((k) => k + 1);
    setHeroIndex((prev) => (prev + 1) % animes.length);
  }, [animes.length]);

  const interval = useInterval(next, HERO_INTERVAL);

  useEffect(() => {
    if (animes.length > 1) {
      interval.start();
      return interval.stop;
    }
  }, [animes.length, interval]);

  function goToHero(idx: number) {
    setFadeKey((k) => k + 1);
    setHeroIndex(idx);
    interval.stop();
    setTimeout(() => interval.start(), 100);
  }

  return (
    <Box
      style={{
        position: 'relative',
        height: '70vh',
        minHeight: 420,
        maxHeight: 560,
        overflow: 'hidden',
      }}
    >
      <Box
        key={fadeKey}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${hero.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.5)',
          animation: 'heroFadeIn 0.6s ease forwards',
        }}
      />
      <Box
        style={{
          position: 'absolute',
          inset: 0,
          background: isDark
            ? 'linear-gradient(to top, var(--mantine-color-dark-9) 0%, transparent 50%, rgba(12,13,20,0.4) 100%)'
            : 'linear-gradient(to top, var(--mantine-color-gray-0) 0%, transparent 50%, rgba(255,255,255,0.4) 100%)',
        }}
      />
      <Container
        size="xl"
        style={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          paddingBottom: 60,
        }}
      >
        <Stack gap="md" maw={600} key={`content-${fadeKey}`} style={{ animation: 'heroContentUp 0.5s 0.15s ease both' }}>
          <Title
            order={1}
            style={{
              fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
              lineHeight: 1.1,
            }}
          >
            {hero.titleEnglish ?? hero.title}
          </Title>
          <Group gap="md">
            <Badge size="lg" variant="filled" color="violet">{hero.type}</Badge>
            <Group gap={4}>
              <IconStar size={16} fill="var(--mantine-color-yellow-5)" color="var(--mantine-color-yellow-5)" />
              <Text fw={600}>{hero.score?.toFixed(1)}</Text>
            </Group>
            <Text size="sm" c="dimmed">{hero.year}</Text>
            <Text size="sm" c="dimmed">{hero.episodes} episodios</Text>
          </Group>
          <Text
            size="sm"
            c="dimmed"
            lineClamp={3}
            style={{ maxWidth: '90%' }}
          >
            {hero.synopsis}
          </Text>
          <Group gap="sm">
            <Button
              size="md"
              color="violet"
              radius="md"
              leftSection={<IconPlayerPlay size={18} />}
              onClick={() => navigate(`/anime/${hero.id}`)}
            >
              Ver ahora
            </Button>
            <Button
              size="md"
              variant="default"
              radius="md"
              leftSection={<IconInfoCircle size={18} />}
              onClick={() => navigate(`/anime/${hero.id}`)}
              style={{ borderColor: 'var(--mantine-color-dark-4)' }}
            >
              Más información
            </Button>
          </Group>
        </Stack>
      </Container>

      {animes.length > 1 && (
        <Group
          justify="center"
          gap={8}
          style={{
            position: 'absolute',
            bottom: 16,
            left: 0,
            right: 0,
          }}
        >
          {animes.map((a, idx) => (
            <UnstyledButton
              key={a.id}
              onClick={() => goToHero(idx)}
              style={{
                width: idx === heroIndex ? 24 : 10,
                height: 10,
                borderRadius: 5,
                background: idx === heroIndex ? 'var(--mantine-color-violet-5)' : isDark ? 'var(--mantine-color-dark-3)' : 'var(--mantine-color-gray-4)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                border: 'none',
              }}
            />
          ))}
        </Group>
      )}
    </Box>
  );
}
