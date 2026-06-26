import { Box, Title, Group, Button, Stack } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import CarouselCard from './CarouselCard';
import type { Anime } from '../../types';

interface ContentRowProps {
  title: string;
  data: Anime[];
}

export default function ContentRow({ title, data }: ContentRowProps) {
  const navigate = useNavigate();

  return (
    <Stack gap="sm">
      <Group justify="space-between" align="center">
        <Title order={3} size="h4">{title}</Title>
        <Button
          variant="subtle"
          color="violet"
          size="sm"
          onClick={() => navigate('/catalog')}
        >
          VER TODO &gt;
        </Button>
      </Group>
      <Box
        style={{
          display: 'flex',
          gap: 12,
          overflowX: 'auto',
          paddingBottom: 8,
          scrollBehavior: 'smooth',
        }}
      >
        {data.map((anime) => (
          <CarouselCard key={anime.id} anime={anime} />
        ))}
      </Box>
    </Stack>
  );
}
