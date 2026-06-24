import {
  Group,
  Text,
  TextInput,
  ActionIcon,
  Avatar,
  Burger,
  Menu,
  UnstyledButton,
  useMantineColorScheme,
  rem,
  Indicator,
} from '@mantine/core';
import {
  IconSearch,
  IconBell,
  IconSun,
  IconMoon,
  IconUser,
  IconLogout,
  IconSettings,
  IconClock,
} from '@tabler/icons-react';
import { useLocation, useNavigate } from 'react-router-dom';

/* ─── Navegación principal ─── */
const mainLinks = [
  { label: 'Home', path: '/' },
  { label: 'Catalog', path: '/' },
  { label: 'My List', path: '/profile' },
];

/* ─── Props ─── */
interface AppHeaderProps {
  burgerOpened: boolean;
  onBurgerClick: () => void;
}

export default function AppHeader({
  burgerOpened,
  onBurgerClick,
}: AppHeaderProps) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const navigate = useNavigate();
  const location = useLocation();

  /** Determina si un link está activo */
  function isActive(path: string, label: string): boolean {
    if (label === 'Home' && location.pathname === '/') return true;
    if (label === 'Catalog' && location.pathname === '/') return false; // Home tiene prioridad
    if (label === 'My List' && location.pathname === '/profile') return true;
    return location.pathname === path && label !== 'Home';
  }

  return (
    <Group h="100%" px="md" justify="space-between" wrap="nowrap">
      {/* ─── Lado izquierdo: Burger (mobile) + Logo + Nav Links ─── */}
      <Group gap="lg" wrap="nowrap">
        <Burger
          opened={burgerOpened}
          onClick={onBurgerClick}
          hiddenFrom="sm"
          size="sm"
          aria-label="Toggle navigation"
        />

        {/* Logo */}
        <Text
          fw={800}
          size="xl"
          style={{
            cursor: 'pointer',
            letterSpacing: '-0.5px',
            userSelect: 'none',
            whiteSpace: 'nowrap',
          }}
          onClick={() => navigate('/')}
        >
          AnimeVerse
        </Text>

        {/* Nav links (desktop) */}
        <Group gap={rem(4)} visibleFrom="sm" wrap="nowrap">
          {mainLinks.map((link) => {
            const active = isActive(link.path, link.label);
            return (
              <UnstyledButton
                key={link.label}
                onClick={() => navigate(link.path)}
                className={active ? 'nav-link-active' : ''}
                style={{
                  padding: `${rem(6)} ${rem(14)}`,
                  fontSize: rem(14),
                  fontWeight: active ? 600 : 400,
                  color: active
                    ? 'var(--mantine-color-white)'
                    : 'var(--mantine-color-dimmed)',
                  position: 'relative',
                  whiteSpace: 'nowrap',
                }}
              >
                {link.label}
              </UnstyledButton>
            );
          })}
        </Group>
      </Group>

      {/* ─── Lado derecho: Search + Iconos + Avatar ─── */}
      <Group gap="sm" wrap="nowrap">
        {/* Search */}
        <TextInput
          placeholder="Search anime..."
          leftSection={<IconSearch size={16} stroke={1.5} />}
          visibleFrom="md"
          size="sm"
          radius="md"
          style={{ width: rem(200) }}
          styles={{
            input: {
              backgroundColor:
                colorScheme === 'dark'
                  ? 'var(--mantine-color-dark-6)'
                  : 'var(--mantine-color-gray-1)',
              border: `1px solid ${
                colorScheme === 'dark'
                  ? 'var(--mantine-color-dark-4)'
                  : 'var(--mantine-color-gray-3)'
              }`,
              '&:focus': {
                borderColor: 'var(--mantine-color-violet-5)',
              },
            },
          }}
        />

        {/* Notificaciones */}
        <Indicator
          color="violet"
          size={8}
          offset={4}
          processing
          visibleFrom="sm"
        >
          <ActionIcon
            variant="subtle"
            color="gray"
            size="lg"
            aria-label="Notifications"
          >
            <IconBell size={20} stroke={1.5} />
          </ActionIcon>
        </Indicator>

        {/* Historial / Reloj */}
        <ActionIcon
          variant="subtle"
          color="gray"
          size="lg"
          aria-label="History"
          visibleFrom="sm"
          onClick={() => navigate('/profile')}
        >
          <IconClock size={20} stroke={1.5} />
        </ActionIcon>

        {/* Toggle Dark/Light */}
        <ActionIcon
          variant="subtle"
          color="gray"
          size="lg"
          onClick={toggleColorScheme}
          aria-label="Toggle color scheme"
        >
          {colorScheme === 'dark' ? (
            <IconSun size={20} stroke={1.5} />
          ) : (
            <IconMoon size={20} stroke={1.5} />
          )}
        </ActionIcon>

        {/* Avatar con menú */}
        <Menu
          shadow="lg"
          width={200}
          position="bottom-end"
          withArrow
          arrowPosition="center"
        >
          <Menu.Target>
            <UnstyledButton aria-label="User menu">
              <Avatar
                size="sm"
                radius="xl"
                color="violet"
                variant="filled"
                style={{ cursor: 'pointer' }}
              />
            </UnstyledButton>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Mi cuenta</Menu.Label>
            <Menu.Item
              leftSection={<IconUser size={14} />}
              onClick={() => navigate('/profile')}
            >
              Mi Perfil
            </Menu.Item>
            <Menu.Item
              leftSection={<IconSettings size={14} />}
              onClick={() => navigate('/profile')}
            >
              Configuración
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
              color="red"
              leftSection={<IconLogout size={14} />}
              onClick={() => navigate('/login')}
            >
              Cerrar Sesión
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Group>
  );
}
