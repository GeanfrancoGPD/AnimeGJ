import {
  Box,
  Container,
  Group,
  Stack,
  Text,
  Anchor,
  ActionIcon,
  Divider,
  useMantineColorScheme,
} from '@mantine/core';
import {
  IconBrandGithub,
  IconBrandDiscord,
  IconAt,
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';

/* ─── Columnas del footer ─── */
const navigationLinks = [
  { label: 'Home', path: '/' },
  { label: 'Catalog', path: '/catalog' },
  { label: 'My List', path: '/profile' },
  { label: 'Seasonal', path: '/' },
];

const legalLinks = [
  { label: 'Privacy Policy', path: '#' },
  { label: 'Terms of Service', path: '#' },
  { label: 'Help Center', path: '#' },
  { label: 'Contact us', path: '#' },
];

export default function AppFooter() {
  const { colorScheme } = useMantineColorScheme();

  const footerBg =
    colorScheme === 'dark'
      ? 'var(--mantine-color-dark-8)'
      : 'var(--mantine-color-gray-0)';

  return (
    <Box
      className="app-footer"
      mt="xl"
      pt="xl"
      pb="lg"
      style={{ backgroundColor: footerBg }}
    >
      <Container size="xl">
        {/* ─── Columnas principales ─── */}
        <Group
          align="flex-start"
          justify="space-between"
          gap="xl"
          wrap="wrap"
        >
          {/* Columna 1: Branding */}
          <Stack gap="xs" maw={280}>
            <Text fw={800} size="lg">
              AnimeVerse
            </Text>
            <Text size="sm" c="dimmed" lh={1.6}>
              The ultimate destination for premium anime streaming. Immerse
              yourself in worlds beyond imagination.
            </Text>
          </Stack>

          {/* Columna 2: Navigation */}
          <Stack gap="xs">
            <Text fw={600} size="sm" tt="uppercase" mb={4}>
              Navigation
            </Text>
            {navigationLinks.map((link) => (
              <Anchor
                key={link.label}
                component={Link}
                to={link.path}
                size="sm"
                c="dimmed"
                underline="hover"
              >
                {link.label}
              </Anchor>
            ))}
          </Stack>

          {/* Columna 3: Legal */}
          <Stack gap="xs">
            <Text fw={600} size="sm" tt="uppercase" mb={4}>
              Legal
            </Text>
            {legalLinks.map((link) => (
              <Anchor
                key={link.label}
                component={Link}
                to={link.path}
                size="sm"
                c="dimmed"
                underline="hover"
              >
                {link.label}
              </Anchor>
            ))}
          </Stack>

          {/* Columna 4: Stay Connected */}
          <Stack gap="xs">
            <Text fw={600} size="sm" tt="uppercase" mb={4}>
              Stay Connected
            </Text>
            <Group gap="sm">
              <ActionIcon
                variant="subtle"
                color="gray"
                size="lg"
                radius="xl"
                aria-label="GitHub"
              >
                <IconBrandGithub size={20} stroke={1.5} />
              </ActionIcon>
              <ActionIcon
                variant="subtle"
                color="gray"
                size="lg"
                radius="xl"
                aria-label="Discord"
              >
                <IconBrandDiscord size={20} stroke={1.5} />
              </ActionIcon>
              <ActionIcon
                variant="subtle"
                color="gray"
                size="lg"
                radius="xl"
                aria-label="Contact"
              >
                <IconAt size={20} stroke={1.5} />
              </ActionIcon>
            </Group>
          </Stack>
        </Group>

        {/* ─── Copyright ─── */}
        <Divider my="lg" color={colorScheme === 'dark' ? 'dark.5' : 'gray.3'} />
        <Text ta="center" size="xs" c="dimmed">
          &copy; {new Date().getFullYear()} AnimeVerse. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
}
