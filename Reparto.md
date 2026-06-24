# Distribución del Proyecto - Aplicación de Anime con Mantine

## Integrante 1 — Frontend Base, Layout y Autenticación (25%)

### Desarrollo

Responsable de la estructura base de la aplicación y de las vistas de acceso de usuario:

- **Layout principal:** Configuración del cascarón de la app (`AppShell`).
- **Navegación:** Navbar, Sidebar, Breadcrumbs y sistema de rutas (React Router / Next.js).
- **Módulo de Acceso:** Pantallas de **Login** y **Registro de Usuarios** (Formularios).
- **Estilos:** Implementación del tema Dark/Light de Mantine y Responsive Design.

### Componentes Mantine

- `AppShell`, `Navbar`, `Header`, `Burger`, `Breadcrumbs`
- `TextInput`, `PasswordInput`, `Button`, `Checkbox`, `Paper`
- `Grid`, `Container`

### Investigación

#### Núcleo 1: Arquitectura de Mantine

- Arquitectura interna de Mantine.
- Bundle Size y optimización de rendimiento.
- Organización de paquetes y sistema de inyección de estilos (Mantine Emotion / CSS Modules).

### Entregables

- Estructura de navegación completa y responsiva.
- Vistas funcionales de Login y Registro con validación básica.
- Presentación de arquitectura.

---

## Integrante 2 — Catálogo Anime y Buscador (25%)

### Desarrollo

Responsable de la visualización principal de los datos de anime:

- **Página de catálogo:** Grilla principal de contenidos.
- **Tarjetas de anime:** Diseño individual con información clave (Puntuación, año, estado).
- **Sistema de búsqueda:** Barra de búsqueda en tiempo real.
- **Filtros avanzados:** Filtrado por géneros, año, tipo (TV, Película).
- **Paginación:** Control de navegación entre páginas de resultados.

### Componentes Mantine

- `Card`, `Image`, `Badge`
- `Pagination`
- `Select`, `MultiSelect`
- `Group`, `Stack`, `ActionIcon`

### Investigación

#### Núcleo 3: Patrones utilizados por Mantine

- Compound Components (Componentes compuestos).
- Composition over Inheritance (Composición sobre herencia).
- Atomic Design aplicado a librerías de componentes.
- **Requisito:** Mostrar snippets reales del código fuente de Mantine.

### Entregables

- Catálogo completo y responsivo.
- Sistema de filtros y buscador interactivo.
- Investigación de patrones de diseño.

---

## Integrante 3 — Backend Node.js y Base de Datos (25%)

### Desarrollo

Responsable de toda la capa lógica del servidor y persistencia:

- **Stack:** Node.js, Express, PostgreSQL y Prisma ORM.
- **Endpoints de Usuarios:** `POST /register`, `POST /login`, `GET /profile`
- **Endpoints de Animes:** `GET /animes`, `GET /animes/:id`, `POST /animes`, `PUT /animes/:id`, `DELETE /animes/:id`
- **Endpoints de Episodios:** `GET /episodes`, `POST /episodes`
- **Endpoints de Favoritos/Historial:** `POST /favorites`, `DELETE /favorites`, `GET /history`

### Base de Datos

Diseño e implementación de tablas en PostgreSQL con Prisma:

- `users`, `animes`, `episodes`, `genres`, `anime_genres`, `favorites`, `comments`, `watch_history`.

### Investigación

#### Núcleo 5: Testing en Ecosistemas UI

- Cómo realiza pruebas Mantine en sus componentes.
- Estrategias de CI/CD para librerías de componentes.
- Unit Testing vs Integration Testing en Frontend.

### Entregables

- API REST funcional y documentada.
- Base de datos desplegada o local con datos semilla (seeds).
- Investigación de testing.

---

## Integrante 4 — Perfil de Usuario, Interacciones y Ecosistema (25%)

### Desarrollo

Responsable de la experiencia del usuario autenticado dentro de la plataforma:

- **Perfil de Usuario (`GET /profile`):** Vista de detalles del usuario conectado.
- **Sección de Favoritos:** Lista de animes guardados por el usuario.
- **Historial de Reproducción:** Lista de episodios o animes vistos recientemente.
- **Sección de Detalles del Anime:** Vista interna de un anime con lista de episodios y sección de comentarios.
- **Feedback Visual:** Modales de confirmación, notificaciones de éxito/error al interactuar y loaders de carga.

### Componentes Mantine

- `Tabs` (para separar Favoritos de Historial)
- `Modal` (para confirmaciones o alertas)
- `Notification` / `Notification Provider`
- `Loader` / `Skeleton` (para estados de carga)
- `Timeline` o `List` (para el historial/episodios)

### Investigación

#### Núcleo 2: Historia y Filosofía

- Quién creó Mantine, evolución del proyecto y objetivos de diseño.

#### Núcleo 6: Comparativa del Ecosistema

- Mantine vs Material UI vs Ant Design vs Chakra UI.
- Criterios de elección: Cuándo usar Mantine y cuándo NO usarlo.

### Entregables

- Página de Perfil e historial de usuario integrada con el backend.
- Sección de detalles de anime con interactividad (modales y notificaciones).
- Investigación comparativa del ecosistema.

---

# Distribución de la Exposición (35 minutos)

## Persona 1 (8 min)

- Introducción al proyecto.
- Historia, filosofía y objetivos de Mantine.
- Arquitectura interna, bundle size y manejo de estilos.

## Persona 2 (8 min)

- Patrones de diseño de Mantine (Compound Components con ejemplos de código).
- Demostración de los componentes del catálogo y sistema de filtros.
- Temas y personalización (Dark/Light mode).

## Persona 3 (8 min)

- Arquitectura del Backend (Express + Prisma + PostgreSQL).
- Explicación del modelo de base de datos de la app de anime.
- Estrategias de Testing y CI/CD en el ecosistema.

## Persona 4 (8 min)

- Flujo del usuario autenticado (Perfil, interacciones, notificaciones).
- Comparativa detallada con competidores (MUI, Chakra, AntD).
- Conclusiones del proyecto.

---

# Demo Final (3 minutos por integrante)

Para la demostración en vivo, el orden lógico del flujo de la aplicación será:

1. **Integrante 1:** Muestra el Layout, el cambio de tema, y realiza el flujo de **Registro y Login** de un usuario.
2. **Integrante 2:** Entra a la aplicación y navega por el **Catálogo**, usa el buscador y aplica filtros en tiempo real.
3. **Integrante 3:** Muestra cómo impactan esas acciones en la **API y Base de Datos** (peticiones en consola, registros creados en PostgreSQL).
4. **Integrante 4:** Muestra el **Perfil del usuario** con sus animes favoritos guardados, el historial de navegación y las notificaciones/modales de la interfaz.
