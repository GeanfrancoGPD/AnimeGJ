import { AppShell, NavLink, Stack, Text, Divider, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconHome,
  IconLayoutGrid,
  IconHeart,
  IconLogin,
  IconUserPlus,
} from '@tabler/icons-react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import AppBreadcrumbs from './AppBreadcrumbs';

/* ─── Links del Sidebar (solo visible en mobile) ─── */
const sidebarLinks = [
  { label: 'Home', icon: IconHome, path: '/' },
  { label: 'Catalog', icon: IconLayoutGrid, path: '/' },
  { label: 'My List', icon: IconHeart, path: '/profile' },
];

const authLinks = [
  { label: 'Iniciar Sesión', icon: IconLogin, path: '/login' },
  { label: 'Registrarse', icon: IconUserPlus, path: '/register' },
];

/* ─── Props ─── */
interface AppLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout principal de la aplicación.
 *
 * Usa `AppShell` de Mantine con:
 * - **Header** fijo de 60 px con navegación horizontal (desktop)
 * - **Navbar/Sidebar** colapsable, solo visible en mobile (< sm breakpoint)
 *   y controlado por el botón Burger en el Header
 * - **Main** con Breadcrumbs dinámicos + contenido + Footer
 *
 * El Navbar se oculta completamente en desktop (`collapsed.desktop = true`)
 * porque la navegación se maneja en el Header, tal como se ve en las imágenes.
 */
export default function AppLayout({ children }: AppLayoutProps) {
  const [mobileOpened, { toggle: toggleMobile, close: closeMobile }] =
    useDisclosure(false);
  const navigate = useNavigate();
  const location = useLocation();

  function handleNav(path: string) {
    navigate(path);
    closeMobile();
  }

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 260,
        breakpoint: 'sm',
        collapsed: { desktop: true, mobile: !mobileOpened },
      }}
      padding={0}
    >
      {/* ═══ HEADER ═══ */}
      <AppShell.Header>
        <AppHeader burgerOpened={mobileOpened} onBurgerClick={toggleMobile} />
      </AppShell.Header>

      {/* ═══ NAVBAR / SIDEBAR (solo mobile) ═══ */}
      <AppShell.Navbar p="md">
        <ScrollArea>
          <Stack gap={4}>
            <Text size="xs" fw={600} c="dimmed" tt="uppercase" mb="xs">
              Navegación
            </Text>

            {sidebarLinks.map((link) => (
              <NavLink
                key={link.label}
                label={link.label}
                leftSection={<link.icon size={18} stroke={1.5} />}
                active={location.pathname === link.path}
                onClick={() => handleNav(link.path)}
                variant="light"
                color="violet"
              />
            ))}

            <Divider my="sm" />

            <Text size="xs" fw={600} c="dimmed" tt="uppercase" mb="xs">
              Acceso
            </Text>

            {authLinks.map((link) => (
              <NavLink
                key={link.label}
                label={link.label}
                leftSection={<link.icon size={18} stroke={1.5} />}
                active={location.pathname === link.path}
                onClick={() => handleNav(link.path)}
                variant="light"
                color="violet"
              />
            ))}
          </Stack>
        </ScrollArea>
      </AppShell.Navbar>

      {/* ═══ MAIN ═══ */}
      <AppShell.Main>
        <AppBreadcrumbs />
        {children}
        <AppFooter />
      </AppShell.Main>
    </AppShell>
  );
}
