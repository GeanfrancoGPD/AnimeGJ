import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Group,
  Select,
  Pagination,
  Stack,
  Paper,
  Button,
  Grid,
  Skeleton,
  Center,
  useMantineColorScheme,
} from '@mantine/core';
import { IconAdjustmentsHorizontal, IconSearch } from '@tabler/icons-react';
import { useAnimeData } from '../context/AnimeDataContext';
import AnimeCard from '../components/catalog/AnimeCard';
import FiltersSidebar from '../components/catalog/FiltersSidebar';

const ITEMS_PER_PAGE = 8;

type SortOption = 'popular' | 'score' | 'year' | 'title';

function Catalog() {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const [searchParams] = useSearchParams();
  const { animes: allAnimes, loading } = useAnimeData();
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState(searchParams.get('search') ?? '');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [statusAiring, setStatusAiring] = useState(false);
  const [statusFinished, setStatusFinished] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  useEffect(() => {
    setPage(1);
  }, [search, selectedGenres, selectedYear, statusAiring, statusFinished, minRating, sortBy]);

  useEffect(() => {
    const q = searchParams.get('search') ?? '';
    if (q !== search) {
      setSearch(q);
    }
  }, [searchParams]);

  const filterOptions = useMemo(() => {
    const genres = [...new Set(allAnimes.flatMap((a) => a.genres))].sort();
    const years = [...new Set(allAnimes.map((a) => a.year).filter((y): y is number => y != null))].sort((a, b) => b - a);
    return { genres, years };
  }, [allAnimes]);

  const hasActiveStatus = statusAiring || statusFinished;

  const filtered = useMemo(() => {
    let result = [...allAnimes];

    const searchTerm = search.toLowerCase().trim();
    if (searchTerm) {
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(searchTerm) ||
          (a.titleEnglish?.toLowerCase() ?? '').includes(searchTerm) ||
          a.synopsis?.toLowerCase().includes(searchTerm),
      );
    }

    if (selectedGenres.length > 0) {
      result = result.filter((a) =>
        selectedGenres.some((g) => a.genres.includes(g)),
      );
    }

    if (selectedYear) {
      result = result.filter((a) => a.year === Number(selectedYear));
    }

    if (hasActiveStatus) {
      result = result.filter((a) => {
        if (statusAiring && a.status === 'Currently Airing') return true;
        if (statusFinished && a.status === 'Finished Airing') return true;
        return false;
      });
    }

    if (minRating > 0) {
      result = result.filter((a) => (a.score ?? 0) >= minRating);
    }

    switch (sortBy) {
      case 'score':
        result.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
        break;
      case 'year':
        result.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
        break;
      case 'title':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'popular':
      default:
        result.sort((a, b) => (a.rank ?? 9999) - (b.rank ?? 9999));
        break;
    }

    return result;
  }, [allAnimes, search, selectedGenres, selectedYear, hasActiveStatus, statusAiring, statusFinished, minRating, sortBy]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const paginatedResults = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const isFiltered = !!search || selectedGenres.length > 0 || !!selectedYear || hasActiveStatus || minRating > 0;

  function resetFilters() {
    setSearch('');
    setSelectedGenres([]);
    setSelectedYear(null);
    setStatusAiring(false);
    setStatusFinished(false);
    setMinRating(0);
    setSortBy('popular');
  }

  const sidebar = (
    <FiltersSidebar
      filterOptions={filterOptions}
      selectedGenres={selectedGenres}
      selectedYear={selectedYear}
      statusAiring={statusAiring}
      statusFinished={statusFinished}
      minRating={minRating}
      isFiltered={isFiltered}
      resultCount={filtered.length}
      onGenreChange={setSelectedGenres}
      onYearChange={setSelectedYear}
      onStatusAiringChange={setStatusAiring}
      onStatusFinishedChange={setStatusFinished}
      onMinRatingChange={setMinRating}
      onReset={resetFilters}
    />
  );

  return (
    <Container size="xl" py="xl">
      <Grid>
        <Grid.Col span={{ base: 12, md: 3 }} visibleFrom="md">
          {sidebar}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 9 }}>
          <Stack gap="lg">
            <Group justify="space-between" align="center" wrap="nowrap">
              <Stack gap={0}>
                <Title order={2}>Catálogo de Animes</Title>
                <Text size="sm" c="dimmed">
                  {filtered.length} título{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
                </Text>
              </Stack>
              <Group gap="sm" wrap="nowrap">
                <Button
                  variant="subtle"
                  color="gray"
                  size="sm"
                  hiddenFrom="md"
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  leftSection={<IconAdjustmentsHorizontal size={16} />}
                >
                  Filtros
                </Button>
                <Select
                  data={[
                    { value: 'popular', label: 'Más populares' },
                    { value: 'score', label: 'Mejor puntuados' },
                    { value: 'year', label: 'Más recientes' },
                    { value: 'title', label: 'A-Z' },
                  ]}
                  value={sortBy}
                  onChange={(v) => setSortBy((v as SortOption) ?? 'popular')}
                  size="xs"
                  radius="md"
                  w={160}
                />
              </Group>
            </Group>

            <Group hiddenFrom="md" hidden={sidebarCollapsed}>
              {sidebar}
            </Group>

            {loading ? (
              <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="md">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} height={340} radius="md" />
                ))}
              </SimpleGrid>
            ) : paginatedResults.length > 0 ? (
              <>
                <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="md">
                  {paginatedResults.map((anime) => (
                    <AnimeCard key={anime.id} anime={anime} />
                  ))}
                </SimpleGrid>

                <Center>
                  <Pagination
                    total={totalPages}
                    value={page}
                    onChange={setPage}
                    radius="md"
                    withEdges
                  />
                </Center>
              </>
            ) : (
              <Paper
                p="xl"
                radius="md"
                ta="center"
                style={{
                  backgroundColor: isDark ? 'var(--mantine-color-dark-6)' : 'var(--mantine-color-gray-0)',
                  border: `1px solid ${isDark ? 'var(--mantine-color-dark-4)' : 'var(--mantine-color-gray-3)'}`,
                }}
              >
                <Stack gap="sm" align="center">
                  <IconSearch size={48} stroke={1} color="var(--mantine-color-dimmed)" />
                  <Title order={4}>Sin resultados</Title>
                  <Text c="dimmed" size="sm">
                    {isFiltered
                      ? 'Intenta ajustar tu búsqueda o filtros.'
                      : 'No hay animes disponibles aún.'}
                  </Text>
                </Stack>
              </Paper>
            )}
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default Catalog;
