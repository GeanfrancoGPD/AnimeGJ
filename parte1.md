# Integrante 1 — Frontend Base, Layout y Autenticación

## Tabla de Contenidos

1. [Resumen General](#resumen-general)
2. [Estructura de Archivos Creados y Modificados](#estructura-de-archivos-creados-y-modificados)
3. [Sistema de Tema y Diseño Visual](#sistema-de-tema-y-diseño-visual)
4. [Layout Principal — AppShell](#layout-principal--appshell)
5. [Componente AppHeader — Navegación Superior](#componente-appheader--navegación-superior)
6. [Componente AppFooter — Pie de Página](#componente-appfooter--pie-de-página)
7. [Componente AppBreadcrumbs — Migas de Pan](#componente-appbreadcrumbs--migas-de-pan)
8. [Página de Login — Inicio de Sesión](#página-de-login--inicio-de-sesión)
9. [Página de Register — Registro de Usuario](#página-de-register--registro-de-usuario)
10. [Toggle Dark/Light — Cambio de Tema](#toggle-darklight--cambio-de-tema)
11. [Responsive Design](#responsive-design)
12. [Investigación — Núcleo 1: Arquitectura de Mantine](#investigación--núcleo-1-arquitectura-de-mantine)
13. [Entregables](#entregables)

---

## Resumen General

Esta parte del proyecto implementa la **estructura base** de la aplicación AnimeVerse: el cascarón visual que envuelve toda la app (Layout), el sistema de navegación completo (Header, Sidebar mobile, Breadcrumbs y React Router), las pantallas de acceso de usuario (Login y Registro con validación), y el soporte para cambiar entre tema oscuro y claro.

Todas las decisiones de diseño están alineadas con las imágenes de referencia del proyecto, utilizando una paleta oscura con acentos violeta/púrpura y la fuente **Inter** de Google Fonts.

### Tecnologías Utilizadas

| Tecnología         | Versión  | Propósito                                              |
| ------------------ | -------- | ------------------------------------------------------ |
| React              | 19.x     | Librería de UI para construir componentes               |
| Mantine UI         | 9.x      | Librería de componentes (AppShell, TextInput, Paper...) |
| React Router DOM   | 7.x      | Sistema de rutas del lado del cliente (SPA)             |
| @tabler/icons-react| 3.x      | Iconografía consistente (búsqueda, campana, candado...) |
| TypeScript         | 6.x      | Tipado estático para mayor robustez                     |
| Vite               | 8.x      | Bundler y servidor de desarrollo                        |

---

## Estructura de Archivos Creados y Modificados

```
frontend/
├── index.html                              ← [MODIFICADO] Título, fuente Inter, meta SEO
├── src/
│   ├── theme.ts                            ← [NUEVO] Tema personalizado de Mantine
│   ├── main.tsx                            ← [MODIFICADO] Provider del tema + Notifications
│   ├── index.css                           ← [MODIFICADO] Estilos globales, scrollbar, overrides
│   ├── App.tsx                             ← (sin cambios – rutas ya existentes)
│   ├── components/
│   │   └── layout/
│   │       ├── AppLayout.tsx               ← [MODIFICADO] AppShell completo con Header+Sidebar+Footer
│   │       ├── AppHeader.tsx               ← [NUEVO] Barra de navegación superior
│   │       ├── AppFooter.tsx               ← [NUEVO] Pie de página multi-columna
│   │       └── AppBreadcrumbs.tsx          ← [NUEVO] Migas de pan dinámicas
│   └── pages/
│       ├── Login.tsx                       ← [MODIFICADO] Formulario completo con validación
│       └── Register.tsx                    ← [MODIFICADO] Formulario completo con validación
```

---

## Sistema de Tema y Diseño Visual

### Archivo: `src/theme.ts`

El tema se configura usando la función `createTheme()` de Mantine, que permite personalizar colores, tipografía, radios, sombras y comportamiento de componentes de forma centralizada.

### Paleta de Colores Dark

La paleta `dark` por defecto de Mantine usa tonos grises neutros. Nosotros la reemplazamos con una paleta que tiene un **matiz violeta/púrpura**, siguiendo fielmente las imágenes de referencia:

```typescript
const darkColors: MantineColorsTuple = [
  '#C1C2C5', // dark[0] – texto principal (claro)
  '#A6A7AB', // dark[1] – texto secundario
  '#909296', // dark[2] – placeholders
  '#5c5f66', // dark[3] – bordes suaves
  '#373A40', // dark[4] – bordes
  '#2C2835', // dark[5] – hover backgrounds
  '#1a1630', // dark[6] – card / surface
  '#0e0c1d', // dark[7] – body background ← el más importante
  '#0a0818', // dark[8] – extra oscuro
  '#070614', // dark[9] – más oscuro
];
```

**¿Por qué `dark[7]`?** Mantine usa internamente `dark[7]` como color de fondo del `<body>` en modo oscuro. Al darle el tono `#0e0c1d` (negro con matiz violeta), toda la aplicación adopta automáticamente el look de las imágenes sin necesidad de CSS extra.

### Color Primario: Violet

Se define una paleta `violet` personalizada con 10 niveles de intensidad (de `violet[0]` claro a `violet[9]` oscuro). El `primaryShade` se configura diferente para cada modo:
- **Dark mode:** shade `5` (`#9333ea`) — más brillante para contrastar con el fondo oscuro
- **Light mode:** shade `6` (`#7c3aed`) — más saturado sobre fondos claros

### Tipografía

La fuente `Inter` se carga desde Google Fonts en `index.html` y se aplica globalmente tanto al `fontFamily` base como a los `headings`.

### Overrides de Componentes

Los componentes `TextInput` y `PasswordInput` usan la variante `filled` por defecto, lo que les da el estilo con fondo sólido que se ve en las imágenes.

---

## Layout Principal — AppShell

### Archivo: `src/components/layout/AppLayout.tsx`

El **AppShell** de Mantine es el componente estructural que define la distribución visual de la aplicación. Funciona como un "cascarón" que organiza:

```
┌─────────────────────────────────────────────────┐
│                   HEADER (60px)                  │
├──────────┬──────────────────────────────────────┤
│ NAVBAR   │                                      │
│ (solo    │           MAIN CONTENT               │
│  mobile) │     ┌──────────────────────────┐     │
│          │     │      Breadcrumbs          │     │
│          │     ├──────────────────────────┤     │
│          │     │     {children}            │     │
│          │     ├──────────────────────────┤     │
│          │     │      Footer              │     │
│          │     └──────────────────────────┘     │
└──────────┴──────────────────────────────────────┘
```

### Configuración del AppShell

```tsx
<AppShell
  header={{ height: 60 }}
  navbar={{
    width: 260,
    breakpoint: 'sm',
    collapsed: { desktop: true, mobile: !mobileOpened },
  }}
  padding={0}
>
```

- **`header.height: 60`** — Altura fija del header.
- **`navbar.width: 260`** — Ancho del sidebar cuando está abierto.
- **`navbar.breakpoint: 'sm'`** — A partir de este breakpoint (768px), el navbar se comporta diferente.
- **`navbar.collapsed.desktop: true`** — En desktop el sidebar **no se muestra** (la navegación va en el Header horizontal).
- **`navbar.collapsed.mobile: !mobileOpened`** — En mobile se controla con el estado `mobileOpened` (botón Burger).

### ¿Por qué el Footer está dentro de Main?

El Footer **no** se usa como `AppShell.Footer` (que sería fijo en la parte inferior de la pantalla). En cambio, se coloca **dentro** de `AppShell.Main` para que se desplace con el contenido, igual que en las imágenes de referencia donde el footer aparece al hacer scroll hasta abajo.

### Hook `useDisclosure`

```tsx
const [mobileOpened, { toggle: toggleMobile, close: closeMobile }] = useDisclosure(false);
```

Este hook de `@mantine/hooks` simplifica el manejo del estado booleano del sidebar mobile (abierto/cerrado). Se pasa al `AppHeader` para que el botón `Burger` pueda controlarlo.

---

## Componente AppHeader — Navegación Superior

### Archivo: `src/components/layout/AppHeader.tsx`

El Header es la barra superior fija que aparece en todas las páginas. Replica exactamente el diseño de las imágenes de referencia:

### Lado Izquierdo

1. **Burger** (`hiddenFrom="sm"`) — Solo visible en pantallas pequeñas. Controla la apertura/cierre del sidebar mobile.
2. **Logo "AnimeVerse"** — Texto en blanco, `fontWeight: 800`, tamaño `xl`. Al hacer clic navega a `/`. No usa gradientes ni efectos especiales, solo texto bold blanco como en las imágenes.
3. **Links de Navegación** (`visibleFrom="sm"`) — "Home", "Catalog", "My List". El link activo tiene:
   - Color blanco (`--mantine-color-white`)
   - `fontWeight: 600`
   - Una línea inferior violeta de 2px (clase CSS `.nav-link-active::after`)

### Lado Derecho

4. **Barra de Búsqueda** (`visibleFrom="md"`) — `TextInput` con icono de lupa, placeholder "Search anime...", fondo que se adapta al tema.
5. **Campana de Notificaciones** — Icono `IconBell` con un indicador violeta pulsante (`Indicator` de Mantine).
6. **Reloj/Historial** — Icono `IconClock` que navega al perfil del usuario.
7. **Toggle Dark/Light** — Icono `IconSun`/`IconMoon` que alterna el esquema de colores usando `useMantineColorScheme()`.
8. **Avatar con Menú** — `Menu` dropdown con opciones: "Mi Perfil", "Configuración", "Cerrar Sesión".

### Componentes Mantine Utilizados

| Componente      | Uso en el Header                                  |
| --------------- | ------------------------------------------------- |
| `Group`         | Agrupar elementos horizontal con gap               |
| `Text`          | Logo "AnimeVerse"                                  |
| `TextInput`     | Barra de búsqueda                                  |
| `ActionIcon`    | Botones de icono (campana, reloj, tema)             |
| `Avatar`        | Foto de perfil del usuario                          |
| `Burger`        | Botón hamburguesa para mobile                       |
| `Menu`          | Menú desplegable del avatar                         |
| `Indicator`     | Punto de notificación sobre la campana              |
| `UnstyledButton`| Links de navegación con estilo personalizado        |

---

## Componente AppFooter — Pie de Página

### Archivo: `src/components/layout/AppFooter.tsx`

Footer multi-columna idéntico al de las imágenes:

```
AnimeVerse              Navigation        Legal           Stay Connected
Descripción...          Home              Privacy Policy  [GitHub] [Discord] [Mail]
                        Catalog           Terms of Service
                        My List           Help Center
                        Seasonal          Contact us

                   © 2026 AnimeVerse. All rights reserved.
```

### Estructura

- **Columna 1 (Branding):** Logo + descripción de la plataforma.
- **Columna 2 (Navigation):** Links internos de la app.
- **Columna 3 (Legal):** Links de políticas (placeholder por ahora).
- **Columna 4 (Stay Connected):** Iconos de redes sociales.
- **Copyright:** Centrado al fondo con `Divider` separador.

El fondo usa `dark[8]` en modo oscuro (ligeramente diferente al body `dark[7]`) para crear un contraste sutil.

---

## Componente AppBreadcrumbs — Migas de Pan

### Archivo: `src/components/layout/AppBreadcrumbs.tsx`

Genera automáticamente las migas de pan basándose en la URL actual, usando `useLocation()` de React Router.

### Lógica

```
URL: /profile       → Home > My List
URL: /login          → Home > Login
URL: /anime/5        → Home > Anime > 5
URL: /                → (no se muestra, es la raíz)
```

1. Se obtiene `location.pathname` y se divide por `/`.
2. Cada segmento se traduce a una etiqueta legible usando el mapa `routeLabels`.
3. El último segmento se muestra como `Text` (no clickeable).
4. Los anteriores se muestran como `Anchor` con `Link` de React Router.
5. El separador es un icono `IconChevronRight` sutil.

---

## Página de Login — Inicio de Sesión

### Archivo: `src/pages/Login.tsx`

### Estructura Visual

```
┌─────────────────────────────┐
│   ¡Bienvenido de nuevo!     │
│   Subtítulo dimmed           │
│                             │
│  ┌─────────────────────┐    │
│  │  Paper con borde     │    │
│  │                     │    │
│  │  📧 Email           │    │
│  │  🔒 Contraseña      │    │
│  │                     │    │
│  │  ☑ Recordarme  Link │    │
│  │                     │    │
│  │  [Iniciar Sesión]   │    │
│  │                     │    │
│  │  ¿No tienes cuenta? │    │
│  └─────────────────────┘    │
└─────────────────────────────┘
```

### Validación Básica

- **Email:** Campo obligatorio + formato válido (regex `^[^\s@]+@[^\s@]+\.[^\s@]+$`).
- **Contraseña:** Campo obligatorio + mínimo 4 caracteres.
- Los errores se muestran **debajo de cada campo** individualmente usando la prop `error` de los inputs de Mantine.

### Estado de Carga

Al enviar el formulario, el botón muestra un spinner (`loading={true}`) durante 800ms simulando la llamada al backend. En producción esto se reemplazará por la llamada real a `POST /api/auth/login`.

### Navegación

- **Botón "Iniciar Sesión"** → Navega a `/profile` tras login exitoso.
- **Link "Regístrate aquí"** → Navega a `/register`.

---

## Página de Register — Registro de Usuario

### Archivo: `src/pages/Register.tsx`

Sigue la misma estética que Login pero con campos adicionales:

1. **Nombre completo** — Obligatorio, mínimo 3 caracteres.
2. **Correo electrónico** — Obligatorio, formato válido.
3. **Contraseña** — Obligatoria, mínimo 8 caracteres.
4. **Confirmar contraseña** — Obligatoria, debe coincidir con la anterior.

### Validación

Cada campo tiene su propia validación independiente:
```typescript
const newErrors: {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
} = {};

if (!name.trim()) newErrors.name = 'El nombre es obligatorio.';
if (password !== confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden.';
```

Al registrarse exitosamente, navega a `/login` para que el usuario inicie sesión.

---

## Toggle Dark/Light — Cambio de Tema

### Implementación

El cambio de tema se hace con el hook `useMantineColorScheme()` de Mantine:

```tsx
const { colorScheme, toggleColorScheme } = useMantineColorScheme();
```

- **`colorScheme`** — Valor actual: `'dark'` o `'light'`.
- **`toggleColorScheme()`** — Alterna entre ambos modos.

### ¿Dónde se llama?

En el **AppHeader**, el botón de sol/luna:

```tsx
<ActionIcon onClick={toggleColorScheme}>
  {colorScheme === 'dark' ? <IconSun /> : <IconMoon />}
</ActionIcon>
```

### Persistencia

Mantine persiste automáticamente la preferencia del usuario en `localStorage` bajo la clave `mantine-color-scheme-value`. Al recargar la página, se mantiene el tema elegido.

### Adaptación de Componentes

Todos los componentes de Mantine se adaptan automáticamente al cambio de tema. Los componentes personalizados (Footer, Header) usan `useMantineColorScheme()` o las CSS variables de Mantine (`var(--mantine-color-dark-X)`, `var(--mantine-color-gray-X)`) para adaptarse.

---

## Responsive Design

### Breakpoints

Mantine define breakpoints por defecto que usamos en todo el layout:

| Breakpoint | Tamaño   | Comportamiento                            |
| ---------- | -------- | ----------------------------------------- |
| `xs`       | 576px    | —                                         |
| `sm`       | 768px    | Navbar mobile se oculta, nav links aparecen|
| `md`       | 992px    | Barra de búsqueda aparece en el header     |
| `lg`       | 1200px   | —                                         |
| `xl`       | 1408px   | Ancho máximo de contenedores               |

### Props Responsivas de Mantine

- **`hiddenFrom="sm"`** — El `Burger` solo aparece en mobile (< 768px).
- **`visibleFrom="sm"`** — Los links de navegación solo aparecen en desktop (≥ 768px).
- **`visibleFrom="md"`** — La barra de búsqueda solo aparece en ≥ 992px.

### Sidebar Mobile

Cuando la pantalla es menor a `sm` (768px):
1. El `Burger` aparece en el header.
2. Al hacer clic, se abre el `AppShell.Navbar` como un panel lateral de 260px.
3. El sidebar muestra links de navegación con iconos (`NavLink` de Mantine).
4. Al seleccionar un link, el sidebar se cierra automáticamente.

---

## Investigación — Núcleo 1: Arquitectura de Mantine

### 1. Arquitectura Interna de Mantine

Mantine es una librería de componentes de React de código abierto creada por **Vitaly Rtishchev** en 2021. Su arquitectura se basa en los siguientes pilares:

#### Organización Modular por Paquetes

Mantine no es un único paquete monolítico. Se divide en múltiples sub-paquetes independientes que se instalan por separado:

| Paquete                     | Propósito                                    |
| --------------------------- | -------------------------------------------- |
| `@mantine/core`             | Componentes base (Button, TextInput, Modal…) |
| `@mantine/hooks`            | Hooks utilitarios (useDisclosure, useForm…)  |
| `@mantine/notifications`    | Sistema de notificaciones toast               |
| `@mantine/form`             | Manejo de formularios con validación          |
| `@mantine/dates`            | Componentes de fecha/calendario               |
| `@mantine/charts`           | Componentes de gráficos                       |
| `@mantine/code-highlight`   | Resaltado de sintaxis de código               |
| `@mantine/dropzone`         | Zona de arrastrar y soltar archivos           |
| `@mantine/carousel`         | Carrusel de contenido                         |
| `@mantine/spotlight`        | Búsqueda tipo Spotlight/Command Palette       |

Esta separación permite instalar **solo lo que necesitas**, reduciendo el tamaño final del bundle.

#### Providers y Contexto

Mantine usa el patrón de **Provider** de React para distribuir configuración global:

```tsx
<MantineProvider theme={theme} defaultColorScheme="dark">
  <Notifications />
  <App />
</MantineProvider>
```

El `MantineProvider`:
- Inyecta las CSS Variables del tema en el DOM.
- Proporciona el contexto de `colorScheme` (dark/light) a toda la app.
- Permite overrides globales de componentes (a través de `theme.components`).

#### Composición sobre Herencia

Los componentes de Mantine siguen el principio de **composición**. Por ejemplo, `AppShell` no es un componente monolítico, sino que se compone de sub-componentes:

```tsx
<AppShell>
  <AppShell.Header>...</AppShell.Header>
  <AppShell.Navbar>...</AppShell.Navbar>
  <AppShell.Main>...</AppShell.Main>
</AppShell>
```

Este patrón se conoce como **Compound Components** y permite:
- Flexibilidad: usar solo las partes que necesitas.
- Claridad: la estructura del JSX refleja la estructura visual.
- Reutilización: cada sub-componente es independiente.

---

### 2. Bundle Size y Optimización de Rendimiento

#### Tree Shaking

Mantine soporta **tree shaking** de forma nativa gracias a que:
1. Usa **ES Modules** (`import/export`) en todos sus paquetes.
2. Marca sus paquetes con `"sideEffects": false` en `package.json`.
3. Los bundlers modernos (Vite/Rollup, esbuild, webpack 5) eliminan automáticamente el código no utilizado.

**Ejemplo práctico:** Si solo importas `Button` y `TextInput` de `@mantine/core`, Vite no incluirá el código de `Modal`, `Tabs`, `Accordion` ni ningún otro componente que no uses.

```typescript
// Solo se incluye el código de Button y TextInput en el bundle final
import { Button, TextInput } from '@mantine/core';
```

#### Tamaño de Bundle

Mantine es significativamente más ligero que competidores como Material UI:

| Librería      | Tamaño base (gzip) | Con tree shaking |
| ------------- | ------------------- | ---------------- |
| Mantine Core  | ~45 KB              | Variable         |
| Material UI   | ~90 KB              | Variable         |
| Ant Design    | ~120 KB             | Limitado         |
| Chakra UI     | ~50 KB              | Variable         |

*Nota: Los tamaños varían según la versión y los componentes utilizados.*

#### Lazy Loading

Para optimización adicional, se puede usar `React.lazy()` para cargar componentes de Mantine bajo demanda:

```typescript
const Modal = React.lazy(() => import('@mantine/core').then(m => ({ default: m.Modal })));
```

---

### 3. Sistema de Inyección de Estilos

#### Evolución: De Emotion a CSS Nativo

La historia del sistema de estilos de Mantine es clave para entender su arquitectura actual:

- **Mantine v1-v6:** Usaba **Emotion** (CSS-in-JS) como motor de estilos. Cada componente generaba estilos en runtime mediante JavaScript, lo que añadía peso al bundle y penalizaba ligeramente el rendimiento.

- **Mantine v7+ (actual):** Migró completamente a **CSS nativo** con **CSS Modules** y **PostCSS**. Este cambio eliminó la dependencia de Emotion y trajo beneficios significativos:

| Aspecto            | Emotion (v1-v6)                | CSS Nativo (v7+)                |
| ------------------- | ------------------------------ | ------------------------------- |
| Rendimiento         | Estilos generados en runtime   | Estilos pre-compilados          |
| Bundle size         | ~15 KB extra por Emotion       | 0 KB de motor de estilos extra  |
| SSR (Server Side)   | Requiere configuración especial| Funciona nativamente            |
| Especificidad CSS   | Inyección en `<style>` tags    | CSS clases con módulos          |
| Developer Experience| `sx` prop, `createStyles`      | `className`, `style`, `styles`  |

#### ¿Cómo funciona internamente?

1. **CSS Variables:** Mantine genera CSS Variables a nivel del `:root` basadas en el tema:
   ```css
   :root {
     --mantine-color-violet-5: #9333ea;
     --mantine-color-dark-7: #0e0c1d;
     --mantine-font-family: Inter, sans-serif;
     --mantine-radius-md: 0.5rem;
   }
   ```

2. **CSS Modules:** Cada componente de Mantine tiene su propio archivo `.module.css`. Al importar un componente, Vite procesa el CSS Module y genera clases únicas que evitan colisiones.

3. **PostCSS Preset Mantine:** El paquete `postcss-preset-mantine` agrega soporte para:
   - `postcss-nested` — Anidar selectores CSS.
   - `postcss-mixins` — Reusar bloques de estilos.
   - `postcss-simple-vars` — Variables simples en PostCSS.

   Esto se configura en el proyecto con el paquete `postcss-preset-mantine` que ya está instalado como devDependency.

4. **Props de Estilo:** Los componentes de Mantine aceptan props de estilo de varias formas:
   - `style` — Estilos inline de React.
   - `styles` — Objeto que permite sobrescribir estilos internos de sub-partes del componente.
   - `className` — Clase CSS estándar.
   - `classNames` — Similar a `styles` pero con clases CSS.
   - `vars` — CSS Variables personalizadas por componente.

#### Ejemplo Concreto en Nuestro Proyecto

En el `AppHeader`, la barra de búsqueda usa la prop `styles` para sobrescribir el estilo interno del input:

```tsx
<TextInput
  styles={{
    input: {
      backgroundColor: 'var(--mantine-color-dark-6)',
      border: '1px solid var(--mantine-color-dark-4)',
    },
  }}
/>
```

Esto modifica **solo** la parte `input` del componente `TextInput`, sin afectar al label, al wrapper ni a otros TextInputs de la app. Esta granularidad es posible gracias al sistema de CSS Modules de Mantine, donde cada sub-parte del componente tiene su propia clase CSS.

---

## Entregables

### 1. Estructura de Navegación Completa y Responsiva

- ✅ **AppShell** configurado con Header fijo (60px) + Navbar mobile colapsable.
- ✅ **Header** con logo "AnimeVerse", links horizontales (Home, Catalog, My List), barra de búsqueda, iconos de notificaciones/historial, toggle de tema, y menú de usuario.
- ✅ **Sidebar mobile** con links de navegación + acceso (Login/Registro) que aparece al presionar el Burger en pantallas menores a 768px.
- ✅ **Footer** multi-columna con branding, navegación, legal y redes sociales.
- ✅ **Breadcrumbs** dinámicos generados automáticamente según la URL actual.
- ✅ **React Router** con las rutas: `/`, `/login`, `/register`, `/profile`, `/anime/:id`.

### 2. Vistas Funcionales de Login y Registro con Validación Básica

- ✅ **Login** con campos email/contraseña, checkbox "Recordarme", validación de formato, estado de carga, y navegación a Registro.
- ✅ **Registro** con campos nombre/email/contraseña/confirmar contraseña, validación completa (formato, longitud, coincidencia), estado de carga, y navegación a Login.

### 3. Presentación de Arquitectura (Investigación Núcleo 1)

- ✅ **Arquitectura interna:** Organización modular, Provider pattern, Compound Components.
- ✅ **Bundle Size:** Tree shaking, comparativa de tamaños, lazy loading.
- ✅ **Sistema de estilos:** Evolución de Emotion a CSS nativo, CSS Variables, CSS Modules, PostCSS Preset.
