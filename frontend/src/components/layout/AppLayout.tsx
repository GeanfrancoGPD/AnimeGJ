import { AppShell, Group, Text } from '@mantine/core';

interface AppLayoutProps {
  children: React.ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
  return (
    <AppShell padding="md" header={{ height: 56 }} footer={{ height: 40 }}>
      <AppShell.Header>
        <Group h="100%" px="md">
          <Text fw={700} size="lg">
            AnimeVerse
          </Text>
        </Group>
      </AppShell.Header>

      <AppShell.Main>{children}</AppShell.Main>

      <AppShell.Footer>
        <Group h="100%" px="md" justify="center">
          <Text size="xs" c="dimmed">
            &copy; {new Date().getFullYear()} AnimeVerse. Proyecto académico.
          </Text>
        </Group>
      </AppShell.Footer>
    </AppShell>
  );
}

export default AppLayout;
