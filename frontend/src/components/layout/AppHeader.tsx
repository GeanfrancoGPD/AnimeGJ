import { useState, useRef } from 'react';
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
  Popover,
  Stack,
  Badge,
  CloseButton,
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
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useAnimeData } from '../../context/AnimeDataContext';

const mainLinks = [
  { label: 'Home', path: '/' },
  { label: 'Catalogo', path: '/catalog' },
  { label: 'Mi lista', path: '/profile' },
];

interface AppHeaderProps {
  burgerOpened: boolean;
  onBurgerClick: () => void;
}

export default function AppHeader({
  burgerOpened,
  onBurgerClick,
}: AppHeaderProps) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const navigate = useNavigate();
  const location = useLocation();
  const [, setSearchParams] = useSearchParams();
  const { animes } = useAnimeData();
  const [headerSearch, setHeaderSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function isActive(path: string, label: string): boolean {
    if (label === 'Home' && location.pathname === '/') return true;
    if (label === 'Catalogo' && location.pathname === '/catalog') return true;
    if (label === 'Mi lista' && location.pathname === '/profile') return true;
    return location.pathname === path;
  }

  const searchResults = headerSearch.trim()
    ? animes
        .filter(
          (a) =>
            a.title.toLowerCase().includes(headerSearch.toLowerCase()) ||
            (a.titleEnglish?.toLowerCase() ?? '').includes(headerSearch.toLowerCase()),
        )
        .slice(0, 6)
    : [];

  function clearSearch() {
    setHeaderSearch('');
    inputRef.current?.focus();
    if (location.pathname === '/catalog') {
      setSearchParams({});
    }
  }

  function selectAnime(id: number) {
    setHeaderSearch('');
    setShowDropdown(false);
    navigate(`/anime/${id}`);
  }

  function searchCatalog() {
    if (headerSearch.trim()) {
      if (location.pathname === '/catalog') {
        setSearchParams({ search: headerSearch.trim() });
      } else {
        navigate(`/catalog?search=${encodeURIComponent(headerSearch.trim())}`);
      }
      setShowDropdown(false);
    }
  }

  const borderColor = isDark ? 'var(--mantine-color-dark-4)' : 'var(--mantine-color-gray-3)';

  return (
    <Group h="100%" px="md" justify="space-between" wrap="nowrap">
      <Group gap="lg" wrap="nowrap">
        <Burger
          opened={burgerOpened}
          onClick={onBurgerClick}
          hiddenFrom="sm"
          size="sm"
          aria-label="Toggle navigation"
        />

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
                    ? 'var(--mantine-color-red)'
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

      <Group gap="sm" wrap="nowrap">
        <Popover
          opened={showDropdown && searchResults.length > 0}
          onClose={() => setShowDropdown(false)}
          width={320}
          position="bottom-end"
          shadow="lg"
          withArrow
          offset={4}
        >
          <Popover.Target>
            <TextInput
              ref={inputRef}
              placeholder="Buscar anime..."
              leftSection={<IconSearch size={16} stroke={1.5} />}
              rightSection={
                headerSearch ? (
                  <CloseButton size="sm" onClick={clearSearch} />
                ) : null
              }
              visibleFrom="md"
              size="sm"
              radius="md"
              value={headerSearch}
              onChange={(e) => {
                const val = e.currentTarget.value;
                setHeaderSearch(val);
                if (val.trim()) setShowDropdown(true);
                else setShowDropdown(false);
                if (location.pathname === '/catalog') {
                  if (val.trim()) {
                    setSearchParams({ search: val.trim() });
                  } else {
                    setSearchParams({});
                  }
                }
              }}
              onFocus={() => { if (headerSearch.trim()) setShowDropdown(true); }}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  searchCatalog();
                }
              }}
              style={{ width: rem(220) }}
              styles={{
                input: {
                  backgroundColor: isDark ? 'var(--mantine-color-dark-6)' : 'var(--mantine-color-gray-1)',
                  border: `1px solid ${borderColor}`,
                  '&:focus': {
                    borderColor: 'var(--mantine-color-violet-5)',
                  },
                },
              }}
            />
          </Popover.Target>

          <Popover.Dropdown
            p={0}
            style={{
              backgroundColor: isDark ? 'var(--mantine-color-dark-6)' : 'var(--mantine-color-white)',
              border: `1px solid ${borderColor}`,
              overflow: 'hidden',
            }}
          >
            <Stack gap={0}>
              {searchResults.map((anime) => (
                <UnstyledButton
                  key={anime.id}
                  onClick={() => selectAnime(anime.id)}
                  style={{
                    display: 'flex',
                    gap: 8,
                    padding: '10px 14px',
                    alignItems: 'center',
                    width: '100%',
                    transition: 'background 0.15s',
                  }}
                  styles={{
                    root: {
                      '&:hover': {
                        backgroundColor: isDark ? 'var(--mantine-color-dark-5)' : 'var(--mantine-color-gray-1)',
                      },
                      '&:not(:last-child)': {
                        borderBottom: `1px solid ${borderColor}`,
                      },
                    },
                  }}
                >
                  <Text size="sm" fw={500} style={{ flex: 1 }}>
                    {anime.titleEnglish ?? anime.title}
                  </Text>
                  <Badge size="xs" variant="light" color="violet" style={{ flexShrink: 0 }}>
                    {anime.type}
                  </Badge>
                </UnstyledButton>
              ))}
              <UnstyledButton
                onClick={searchCatalog}
                style={{
                  padding: '10px 12px',
                  textAlign: 'center',
                  borderTop: `1px solid ${borderColor}`,
                }}
                styles={{
                  root: {
                    '&:hover': {
                      backgroundColor: isDark ? 'var(--mantine-color-dark-5)' : 'var(--mantine-color-gray-1)',
                    },
                  },
                }}
              >
                <Text size="sm" c="violet.5" fw={500}>
                  Ver todos los resultados en Catálogo &rarr;
                </Text>
              </UnstyledButton>
            </Stack>
          </Popover.Dropdown>
        </Popover>

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
