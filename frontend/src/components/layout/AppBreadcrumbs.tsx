import { Breadcrumbs, Anchor, Text, Container } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Mapa de segmentos de URL → etiquetas legibles.
 * Si un segmento no está en el mapa (ej. un ID numérico) se mostrará tal cual.
 */
const routeLabels: Record<string, string> = {
  catalog: 'Catalog',
  profile: 'My List',
  login: 'Login',
  register: 'Register',
  anime: 'Anime',
};

/**
 * Componente Breadcrumbs dinámico.
 *
 * Genera las migas de pan automáticamente en base a la ruta actual
 * usando `useLocation()` de React Router. No se muestra en la página
 * raíz ("/") porque ya es el Home.
 */
export default function AppBreadcrumbs() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  // No mostrar breadcrumbs en la raíz
  if (pathSegments.length === 0) return null;

  const items = [
    // Primer item siempre es "Home"
    <Anchor
      key="home"
      component={Link}
      to="/"
      size="sm"
      c="dimmed"
      underline="hover"
    >
      Home
    </Anchor>,

    // Items intermedios y final
    ...pathSegments.map((segment, index) => {
      const path = '/' + pathSegments.slice(0, index + 1).join('/');
      const label = routeLabels[segment] || decodeURIComponent(segment);
      const isLast = index === pathSegments.length - 1;

      if (isLast) {
        return (
          <Text key={path} size="sm" fw={500}>
            {label}
          </Text>
        );
      }

      return (
        <Anchor
          key={path}
          component={Link}
          to={path}
          size="sm"
          c="dimmed"
          underline="hover"
        >
          {label}
        </Anchor>
      );
    }),
  ];

  return (
    <Container size="xl" py="sm">
      <Breadcrumbs
        separator={<IconChevronRight size={14} stroke={1.5} color="var(--mantine-color-dimmed)" />}
      >
        {items}
      </Breadcrumbs>
    </Container>
  );
}
