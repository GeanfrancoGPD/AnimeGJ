import { Box, Container, Stack } from '@mantine/core';
import { useAnimeData } from '../context/AnimeDataContext';
import HeroCarousel from '../components/catalog/HeroCarousel';
import ContentRow from '../components/catalog/ContentRow';

function Home() {
  const { animes, loading } = useAnimeData();

  if (loading) return null;

  const trending = [...animes].sort((a, b) => (a.rank ?? 999) - (b.rank ?? 999));
  const topRated = [...animes].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
  const movies = animes.filter((a) => a.type === 'Movie');
  const recent = [...animes].sort((a, b) => (b.year ?? 0) - (a.year ?? 0));

  const sections = [
    { title: 'Tendencias', data: trending },
    { title: 'Mejor Puntuados', data: topRated },
    ...(movies.length > 0 ? [{ title: 'Películas', data: movies }] : []),
    { title: 'Nuevos Lanzamientos', data: recent },
  ];

  return (
    <Box>
      <HeroCarousel animes={trending.slice(0, 5)} />

      <Container size="xl" py="xl" style={{ marginTop: -20 }}>
        <Stack gap="xl">
          {sections.map((section) => (
            <ContentRow key={section.title} title={section.title} data={section.data} />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

export default Home;
