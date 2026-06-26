import { Paper, Text, Group, Stack, Chip, Select, Checkbox, Slider, Button, Badge, Divider, useMantineColorScheme } from '@mantine/core';
import { IconAdjustmentsHorizontal } from '@tabler/icons-react';

interface FilterOptions {
  genres: string[];
  years: number[];
}

interface FiltersSidebarProps {
  filterOptions: FilterOptions;
  selectedGenres: string[];
  selectedYear: string | null;
  statusAiring: boolean;
  statusFinished: boolean;
  minRating: number;
  isFiltered: boolean;
  resultCount: number;
  onGenreChange: (genres: string[]) => void;
  onYearChange: (year: string | null) => void;
  onStatusAiringChange: (checked: boolean) => void;
  onStatusFinishedChange: (checked: boolean) => void;
  onMinRatingChange: (rating: number) => void;
  onReset: () => void;
}

export default function FiltersSidebar({
  filterOptions,
  selectedGenres,
  selectedYear,
  statusAiring,
  statusFinished,
  minRating,
  isFiltered,
  resultCount,
  onGenreChange,
  onYearChange,
  onStatusAiringChange,
  onStatusFinishedChange,
  onMinRatingChange,
  onReset,
}: FiltersSidebarProps) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Paper
      p="md"
      radius="md"
      style={{
        backgroundColor: isDark ? 'var(--mantine-color-dark-6)' : 'var(--mantine-color-gray-0)',
        border: `1px solid ${isDark ? 'var(--mantine-color-dark-4)' : 'var(--mantine-color-gray-3)'}`,
      }}
    >
      <Stack gap="lg">
        <Group justify="space-between" align="center">
          <Group gap={6}>
            <IconAdjustmentsHorizontal size={18} stroke={1.5} />
            <Text fw={600} size="sm">Filtros</Text>
          </Group>
          {isFiltered && (
            <Badge size="sm" color="violet" variant="filled">{resultCount}</Badge>
          )}
        </Group>

        <Divider color={isDark ? 'dark.4' : 'gray.3'} />

        <Stack gap="xs">
          <Text size="xs" fw={600} tt="uppercase" c="dimmed">Género</Text>
          <Chip.Group multiple value={selectedGenres} onChange={onGenreChange}>
            <Group gap={6}>
              {filterOptions.genres.map((genre) => (
                <Chip
                  key={genre}
                  value={genre}
                  size="xs"
                  variant="light"
                  color="violet"
                  radius="sm"
                >
                  {genre}
                </Chip>
              ))}
            </Group>
          </Chip.Group>
        </Stack>

        <Stack gap="xs">
          <Text size="xs" fw={600} tt="uppercase" c="dimmed">Año</Text>
          <Select
            data={filterOptions.years.map((y) => ({ value: String(y), label: String(y) }))}
            value={selectedYear}
            onChange={onYearChange}
            placeholder="Cualquier año"
            clearable
            size="xs"
            radius="md"
          />
        </Stack>

        <Stack gap="xs">
          <Text size="xs" fw={600} tt="uppercase" c="dimmed">Estado</Text>
          <Checkbox
            label="En emisión"
            checked={statusAiring}
            onChange={(e) => onStatusAiringChange(e.currentTarget.checked)}
            color="violet"
            size="xs"
          />
          <Checkbox
            label="Finalizado"
            checked={statusFinished}
            onChange={(e) => onStatusFinishedChange(e.currentTarget.checked)}
            color="violet"
            size="xs"
          />
        </Stack>

        <Stack gap="xs">
          <Group justify="space-between">
            <Text size="xs" fw={600} tt="uppercase" c="dimmed">Puntuación mín.</Text>
            <Text size="xs" c="violet.4" fw={600}>{minRating > 0 ? `${minRating}+` : 'Cualquiera'}</Text>
          </Group>
          <Slider
            value={minRating}
            onChange={onMinRatingChange}
            min={0}
            max={10}
            step={1}
            marks={[
              { value: 0, label: '0' },
              { value: 5, label: '5' },
              { value: 10, label: '10' },
            ]}
            color="violet"
            size="xs"
          />
        </Stack>

        <Button
          variant="default"
          size="xs"
          radius="md"
          onClick={onReset}
          fullWidth
          style={{ borderColor: isDark ? 'var(--mantine-color-dark-4)' : 'var(--mantine-color-gray-3)' }}
        >
          Limpiar filtros
        </Button>
      </Stack>
    </Paper>
  );
}
