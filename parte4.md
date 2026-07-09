# Investigación del Integrante #4

## Núcleo 2: Historia y Filosofía de Mantine

---

### 1. Creador del Proyecto

Mantine fue creado por **Vitaly Rtishchev** (alias `rtivital` en GitHub), un desarrollador full-stack con sede en Moscú, Rusia.

- **Background:** Vitaly estudió en la Universidad Estatal de Moscú y aprendió programación de forma autodidacta en aproximadamente 3 años. Consiguió su primer trabajo una semana después de graduarse.
- **Trayectoria laboral:** Trabajó durante 5 años en **Align Technology** (empresa de software dental, conocida por Invisalign). Ha experimentado con múltiples lenguajes como Ruby, Go, Python y Haskell, pero se ha especializado en TypeScript, React y Nest.js.
- **Estado actual:** Es el mantenedor principal del proyecto, respaldado por **más de 500 contribuidores** y una comunidad activa.

> *"He probado muchos lenguajes, incluyendo Ruby, Go, Python, Haskell, pero realmente disfruté trabajar con JavaScript y últimamente TypeScript. En el trabajo y en mis proyectos personales, trabajo principalmente con TypeScript, React y Nest.js"* — Vitaly Rtishchev, entrevista en Console #87

---

### 2. Historia del Proyecto

#### Cronología de versiones

| Versión | Fecha | Hitos principales |
|---------|-------|-------------------|
| **Inicio desarrollo** | Enero 2021 | Vitaly comienza a construir Mantine |
| **v1.0.0** | 3 Mayo 2021 | Primera release pública |
| **v1.1.0 – v1.3.0** | Mayo – Junio 2021 | Correcciones y mejoras iniciales |
| **v2.0.0** | 5 Julio 2021 | 100+ hooks y componentes con soporte nativo de tema oscuro |
| **v2.1.0 – v2.5.0** | Julio – Septiembre 2021 | Iteraciones de mejora continua |
| **v3.0.0** | 11 Octubre 2021 | Expansión significativa de componentes |
| **v3.1.0 – v3.6.0** | Octubre 2021 – Enero 2022 | Maduración de la API |
| **v4.0.0** | 10 Marzo 2022 | Refactorización y nuevas features |
| **v4.1.0 – v4.2.0** | Marzo – Abril 2022 | Mejoras en documentación |
| **v5.0.0** | 25 Julio 2022 | Crecimiento a 50+ hooks, mejoras en accesibilidad |
| **v5.1.0 – v5.10.0** | Julio 2022 – Enero 2023 | Optimizaciones de rendimiento |
| **v6.0.0** | 2 Marzo 2023 | Nuevo sistema de temas, mejoras en formularios |
| **v7.0.0** | **18 Septiembre 2023** | ⭐ **Migración masiva de Emotion a CSS Modules nativos** — el cambio más importante en la historia del proyecto. Elimina el runtime CSS-in-JS, mejora rendimiento SSR, soporte nativo con Next.js App Router |
| **v7.1.0 – v7.17.0** | Sept 2023 – Abr 2025 | Perfeccionamiento del nuevo sistema de estilos |
| **v8.0.0** | 5 Mayo 2025 | Soporte para React 19, nuevas APIs, mejoras en tipos |
| **v8.1.0 – v8.3.0** | Mayo – 2025 | Mejoras progresivas |
| **v9.0.0** | 31 Marzo 2026 | React 19.2+ requerido, nuevas extensiones (schedule, etc.) |
| **v9.4.1** | **8 Junio 2026** | ⭐ **Versión actual — 303 releases hasta la fecha** |

#### Hito clave: La migración a CSS Modules (v7.0.0)

La versión 7.0.0 representa el punto de inflexión más significativo de Mantine. Las decisiones clave fueron:

- **Eliminación de Emotion:** Mantine dejó de depender de Emotion para la generación de estilos. Todos los paquetes `@mantine/*` ahora se distribuyen con archivos CSS nativos importables desde `@mantine/{package}/styles.css`.
- **Adiós a `createStyles` y `sx` prop:** Se eliminaron en favor de CSS Modules.
- **Rendimiento:** Esta migración eliminó por completo el overhead de runtime CSS-in-JS, mejorando drásticamente el rendimiento SSR y reduciendo el tamaño de bundle.
- **Compatibilidad RSC:** Permitió que Mantine funcionara de forma nativa con React Server Components (Next.js App Router) sin necesidad de directivas `"use client"`.

---

### 3. Evolución del Proyecto

#### Crecimiento en cifras (Junio 2026)

| Métrica | Valor |
|---------|-------|
| Estrellas en GitHub | **31,249** ⭐ |
| Forks | 2,317 |
| Contribuidores | 460+ |
| Releases publicadas | 303 |
| Paquetes npm | 20+ (`@mantine/core`, `@mantine/hooks`, `@mantine/form`, `@mantine/charts`, `@mantine/notifications`, `@mantine/tiptap`, etc.) |
| Componentes | **142** en total |
| Hooks | **82** en `@mantine/hooks` |
| Páginas de documentación | 355 |
| Demos interactivos | 1,809 |
| Descargas semanales (npm) | ~**1.35 millones** |
| Descargas semanales (`@mantine/core`) | ~**2.0 millones** |
| Licencia | MIT |
| Sponsor principal | OpenCollective (backers de la comunidad) |

#### Crecimiento de popularidad

Mantine ha experimentado un crecimiento explosivo:
- A principios de 2025 tenía ~900K descargas semanales
- Para mediados de 2026 alcanzó ~1.35M — **un crecimiento del 50% en 18 meses**
- Es la biblioteca de UI para React de **crecimiento más rápido en los últimos 2 años consecutivos**
- Su ratio descargas/estrellas (1.35M / 31K) sugiere **adopción real en producción**, no solo estrellas olvidadas

---

### 4. Filosofía y Objetivos de Diseño

#### Motivación original

> *"Puede parecer que hay innumerables opciones en el mundo de las librerías de componentes React, pero realmente no las hay: algunas librerías son difíciles de personalizar, otras están atadas a un sistema de diseño específico, otras ya no tienen mantenimiento. Siempre tuve dificultades cuando trabajaba con otras librerías, y fue más fácil para mí simplemente construir componentes desde cero. Mi idea con Mantine era construir una librería que sea **altamente personalizable** y pueda satisfacer **casi cualquier requisito de diseño**. Y funcionó muy bien, tengo 5 grandes proyectos en el trabajo con diseños muy diferentes y Mantine encaja perfectamente en todos ellos."*
> — Vitaly Rtishchev

#### Principios fundamentales

1. **Batteries-included (Todo incluido)**
   - Mantine incluye **todo lo que necesitas** sin depender de paquetes externos: formularios con validación, editor de texto enriquecido, notificaciones, date pickers, charts, spotlight search, carrusel, dropzone para archivos, code highlighting, y más.
   - Esto elimina la necesidad de instalar y mantener 5-8 paquetes separados.

2. **TypeScript-first**
   - Todos los componentes y hooks están escritos en TypeScript con tipos completos.
   - Tipos exportados para todas las props, eventos y retornos.
   - Autocompletado nativo en editores modernos.

3. **Accesibilidad por defecto**
   - Todos los componentes siguen las pautas **WAI-ARIA**.
   - Roles, atributos `aria-*` y semántica correcta incorporados.
   - Soporte completo de navegación por teclado.
   - Contraste de colores que cumple WCAG 2.1 AA.
   - Manejo de foco lógico y compatibilidad con lectores de pantalla.

4. **Zero runtime CSS-in-JS (desde v7)**
   - CSS Modules + PostCSS eliminan el overhead de runtime.
   - SSR más rápido sin problemas de hidratación.
   - Sin dependencia de Emotion u otras librerías CSS-in-JS.
   - Compatibilidad nativa con React Server Components.

5. **Tema oscuro/claro nativo**
   - Todos los componentes soportan dark mode sin configuración extra.
   - Soporte para `prefers-color-scheme` (modo auto).
   - `MantineProvider` con `defaultColorScheme="auto"`.

6. **Excelente experiencia de desarrollador (DX)**
   - Documentación extensa con ejemplos interactivos en vivo.
   - APIs consistentes en todos los componentes.
   - Props de estilo (`style props`) intuitivas.
   - Soporte para CSS Modules, Vanilla Extract y PostCSS.

7. **Personalización en múltiples niveles**
   - Global: a través del theme object en `MantineProvider`.
   - Por componente: `defaultProps`, `classNames`, `styles` via Styles API.
   - Inline: `className`, `style`, style props.
   - CSS Modules para overrides locales.

#### Filosofía de gobernanza

- **Modelo:** Maintainer-led con Vitaly Rtishchev como BDFL (Benevolent Dictator for Life).
- **Open source:** Código abierto bajo licencia MIT, sin tiers comerciales.
- **Roadmap público** en GitHub Discussions.
- **Financiamiento:** Via OpenCollective — donaciones de la comunidad.
- **Breaking changes:** Los major versions (v6→v7, v7→v8, v8→v9) introducen cambios intencionales con guías de migración documentadas.
- **Ciclo de releases:** Patches cada 1-2 semanas, minor cada 1-2 meses, major cada 1-2 años.

#### Inspiración del nombre

El nombre "Mantine" proviene de **Mantine, el Pokémon**. Vitaly es fanático de los juegos Pokémon desde los 5 años.

---

### 5. Arquitectura de Paquetes

Mantine está organizado en un ecosistema de paquetes npm modulares:

| Paquete | Descripción |
|---------|-------------|
| `@mantine/core` | Componentes principales: inputs, botones, overlays, layout, etc. (100+ componentes) |
| `@mantine/hooks` | 82 hooks para estado y UI (useForm, useDisclosure, useLocalStorage, useMediaQuery, etc.) |
| `@mantine/form` | Sistema de gestión de formularios con validación |
| `@mantine/dates` | Date pickers, calendarios, date range pickers |
| `@mantine/charts` | Gráficos basados en Recharts |
| `@mantine/notifications` | Sistema de notificaciones toast |
| `@mantine/tiptap` | Editor de texto enriquecido basado en Tiptap |
| `@mantine/spotlight` | Command palette (Ctrl+K) tipo Spotlight |
| `@mantine/modals` | Gestor centralizado de modales |
| `@mantine/dropzone` | Área de carga de archivos drag & drop |
| `@mantine/carousel` | Carrusel basado en Embla |
| `@mantine/code-highlight` | Resaltado de código con highlight.js |
| `@mantine/nprogress` | Barra de progreso de navegación |
| `@mantine/schedule` | Componente de programación/calendario de eventos (nuevo en v9) |
| `@mantinex/mantine-logo` | Componente del logo de Mantine |

---

## Núcleo 6: Comparativa del Ecosistema

---

### 1. Visión General

Mantine compite directamente con las bibliotecas de componentes más establecidas del ecosistema React. A continuación se presenta una comparativa exhaustiva basada en datos reales de npm, GitHub y análisis de rendimiento (actualizado a Julio 2026).

---

### 2. Tabla Comparativa Detallada

| Métrica | **Mantine** | **MUI (Material UI)** | **Ant Design** | **Chakra UI** |
|---------|-------------|----------------------|----------------|---------------|
| **Creador** | Vitaly Rtishchev | MUI Team (anteriormente Material-UI) | Alibaba Group | Chakra UI Team |
| **Año de inicio** | 2021 | 2014 | 2015 | 2019 |
| **Versión actual** | v9.4.1 | v6.x | v5.x | v3.x |
| **Descargas semanales** | ~1.35M | ~1.4M | ~1.1M | ~587K |
| **Descargas `@mantine/core`** | ~2.0M | ~9.4M (`@mui/material`) | ~3.1M (`antd`) | 941 (`chakra-ui`) |
| **Estrellas GitHub** | 31K+ | 94K+ | 94K+ | 38K+ |
| **Componentes** | 120+ | 100+ (core) / 100+ (MUI X de pago) | 70+ | 60+ |
| **Hooks incluidos** | **82** | Limitados | Muy pocos | ~30 |
| **Bundle gzip (típico)** | ~55KB | ~95KB | ~120KB | ~65KB |
| **Bundle gzip (core package)** | ~144KB | ~1.6MB | ~14.3MB (antd completo) | ~88KB |
| **Sistema de estilos** | CSS Modules + PostCSS | Emotion (CSS-in-JS) | CSS-in-JS | Emotion (CSS-in-JS) |
| **Runtime CSS-in-JS** | ❌ No (eliminado en v7) | ✅ Sí (Emotion) | ✅ Sí | ✅ Sí (Emotion) |
| **RSC Ready** | ✅ **Excelente** — sin `"use client"` para estilos | ⚠️ En desarrollo (Pigment CSS) | ⚠️ Parcial — en transición | ⚠️ Requiere `"use client"` |
| **Dark mode** | ✅ Built-in en todos los componentes | ✅ Built-in | ✅ Built-in | ✅ Built-in |
| **Sistema de diseño** | Diseño custom neutro | **Material Design** (Google) | **Ant Design** (Alibaba) | Diseño custom |
| **TypeScript** | ✅ Built-in completo | ✅ Built-in completo | ✅ Built-in completo | ✅ Built-in completo |
| **Internacionalización** | Parcial (via librerías externas) | ✅ Excelente | ✅ **Excelente** — 60+ locales con RTL | Básica |
| **Licencia** | MIT | MIT (core) / Pago (MUI X Pro) | MIT | MIT |
| **Features premium** | ✅ **Todas incluidas gratis** (forms, RTE, charts, notifications, date pickers, spotlight) | ⚠️ Data grid, date pickers avanzados, charts requieren **MUI X Pro (pago)** | ⚠️ Features enterprise limitadas en versión gratuita | ❌ No incluye RTE, charts, date pickers avanzados |
| **Health score (PkgPulse)** | **85/100** ⭐ | 79/100 | 85/100 | 47/100 |
| **Maintenance score** | **100/100** ⭐ | 80/100 | 100/100 | — |
| **Templates/plugins** | Pequeño ecosistema | ✅ **Enorme** | ✅ **Grande** | Moderado |
| **Adopción enterprise** | Creciente pero menor | ✅ **Estándar de facto** | ✅ **Estándar en APAC** | Baja |
| **Migración desde otra lib** | La más fácil desde Chakra | Dificultad media | Difícil (sistema de tokens rígido) | — |

---

### 3. Análisis por Biblioteca

#### Mantine

**Fortalezas:**
- **Mayor cantidad de componentes gratuitos:** 120+ componentes y 82 hooks sin ningún tier de pago.
- **Mejor compatibilidad RSC:** CSS Modules sin runtime JS — funciona nativamente con Next.js App Router sin directivas `"use client"`.
- **Zero runtime CSS:** Desde v7, no hay overhead de CSS-in-JS en el cliente.
- **Todo incluido:** Forms, notificaciones, editor de texto enriquecido, date pickers, charts, spotlight, carrusel, dropzone — todo en un solo ecosistema.
- **Documentación excepcional:** 355 páginas con 1,809 demos interactivos en vivo.
- **Hooks library:** `@mantine/hooks` es útil incluso sin usar los componentes.
- **Crecimiento más rápido:** +50% en descargas en 18 meses. Biblioteca con mayor momentum en 2026.
- **Health score superior:** 85/100 con maintenance score perfecto de 100/100.

**Debilidades:**
- **Ecosistema más pequeño:** Menos templates, plugins de terceros y dashboards premium que MUI o Ant Design.
- **Personalización visual compleja:** El sistema de temas no es tan granular como MUI — para cambios estéticos radicales, se requieren más CSS overrides.
- **Breaking changes frecuentes:** Las migraciones entre major versions (v6→v7, v7→v8, v8→v9) requieren esfuerzo.
- **React 19.2+ requerido:** Mantine 9 no soporta React 18 — no hay rama LTS.
- **Menos adopción enterprise:** Para decisiones corporativas conservadoras, MUI sigue siendo la opción "segura".

**Mejor para:**
- Proyectos nuevos (greenfield)
- Dashboards y admin panels
- SaaS e internal tools
- Freelancers y equipos pequeños/medianos
- Proyectos con Next.js App Router
- Equipos que quieren evitar dependencias múltiples
- Migración desde Chakra UI (API similar con style props)

---

#### MUI (Material UI)

**Fortalezas:**
- **Ecosistema más grande:** La biblioteca React más usada — más tutoriales, Stack Overflow answers, templates y community plugins.
- **Hiring pool masivo:** Fácil encontrar desarrolladores con experiencia en MUI.
- **Componentes enterprise (MUI X):** Data grid con virtual scrolling, charts, date pickers avanzados (aunque de pago).
- **Sistema de temas profundo:** Personalización granular via tokens — ideal para grandes organizaciones con design systems propios.
- **Madurez probada:** Desde 2014, usado por Fortune 500.
- **Componentes para datos:** Tablas complejas con sorting, filtering, pagination, row selection.

**Debilidades:**
- **CSS-in-JS runtime:** Emotion añade overhead en el bundle y en SSR.
- **Material Design obligatorio:** El sistema de diseño de Google es muy opinado — difícil de desmarcar visualmente.
- **Features premium de pago:** Data grid, date pickers y charts avanzados requieren MUI X Pro ($).
- **Mala compatibilidad RSC:** Actualmente requiere `"use client"` — Pigment CSS está en desarrollo pero no listo.
- **Bundle pesado:** Aunque tree-shaking ayuda, el peso total es considerable.

**Cuándo elegir MUI:**
- Equipos enterprise que priorizan estabilidad sobre innovación
- Proyectos donde el Material Design es aceptable o deseado
- Necesitas data grid enterprise-grade
- Tu equipo ya tiene expertise en MUI
- Hiring pool grande es un factor crítico

---

#### Ant Design

**Fortalezas:**
- **Componentes enterprise inigualables:** Table con sorting, filtering, paginación y virtual scrolling; Form con validación compleja; Tree, Transfer, Cascader — todo incluido gratis.
- **Internacionalización superior:** 60+ locales con soporte RTL (right-to-left).
- **Design system completo:** Desde Figma hasta código (Ant Design Pro).
- **Respaldo de Alibaba:** Mantenimiento corporativo, ciclo de releases formal.
- **Ideal para dashboards admin:** El estándar de facto para paneles de administración en el mercado APAC.

**Debilidades:**
- **Bundle más pesado:** Puede superar 350KB+ gzipped — el más pesado de los 4.
- **Personalización más difícil:** El sistema de tokens es complejo y rígido.
- **Estética enterprise distintiva:** Visualmente orientado a negocios — puede chocar en aplicaciones de consumo.
- **RSC limitado:** En transición desde CSS-in-JS, no completamente server-compatible.
- **Comunidad occidental menor:** Menos tutoriales y recursos en inglés comparado con MUI.

**Cuándo elegir Ant Design:**
- Construyendo dashboards admin complejos
- Necesitas i18n con 60+ locales y RTL
- Aplicaciones enterprise con tablas de datos densas
- Equipos en mercado APAC o familiarizados con Ant

---

#### Chakra UI

**Fortalezas:**
- **Excelente DX:** Sistema de style props intuitivo — si sabes CSS, sabes Chakra.
- **Accesibilidad first-class:** Todos los componentes siguen WAI-ARIA — foco, teclado, screen readers.
- **Bundle competitivo:** ~85KB para uso típico — el más ligero para sets estándar.
- **Dark mode nativo:** Todos los componentes funcionan en modo oscuro sin CSS extra.

**Debilidades:**
- **Crecimiento estancado:** Única biblioteca en esta comparación que no crece — 587K descargas (Mantine la superó).
- **Menos componentes:** 60+ — significativamente menos que MUI (100+) o Mantine (120+).
- **Sin features incluidas:** No tiene RTE, charts, date pickers avanzados — requieren paquetes externos.
- **RSC problemático:** Emotion requiere `"use client"` — la migración a Panda CSS en v3 fragmentó la comunidad.
- **Migración v2→v3 costosa:** El cambio a Ark UI + Panda CSS fue disruptivo.

**Cuándo elegir Chakra UI:**
- La accesibilidad es tu prioridad máxima
- Amas el sistema de style props
- Tus necesidades de componentes son estándar (forms, modals, navigation)
- Bundle size es crítico
- Ya estás en Chakra v3 y estás satisfecho

---

### 4. Compatibilidad con React Server Components (RSC)

En 2026, la compatibilidad con RSC es **el factor diferenciador más importante** en la elección de una biblioteca de componentes:

| Biblioteca | Estado RSC | Detalle técnico |
|------------|------------|-----------------|
| **Mantine** | ✅ **Mejor** | CSS Modules sin runtime JS. No requiere `"use client"` para estilos. Los componentes pueden usarse directamente en Server Components. |
| **MUI** | ⚠️ Trabajando | Actualmente requiere `"use client"` (Emotion). Pigment CSS (compilación a CSS estático) está en desarrollo pero no establecido. |
| **Ant Design** | ⚠️ Parcial | En transición desde CSS-in-JS. Algunos componentes funcionan, pero no es completo. |
| **Chakra UI** | ⚠️ Limitado | Emotion obliga a `"use client"`. La nueva versión con Panda CSS mejora esto, pero la migración es costosa. |

> Para aplicaciones con Next.js App Router, Mantine ofrece la experiencia más limpia — sin necesidad de agregar `"use client"` a cada componente que importa estilos.

---

### 5. Bundle Size Comparativo

Datos de bundle para una página típica con Button, Dialog, Select, Table y Form:

| Biblioteca | Bundle gzip añadido |
|------------|-------------------|
| Headless UI + Tailwind | ~12KB |
| Radix + Tailwind | ~15KB |
| shadcn/ui | ~18KB |
| **Mantine** | **~55KB** |
| Chakra UI | ~65KB |
| Material UI (MUI) | ~95KB |
| Ant Design | ~120KB |

> **Nota importante:** El bundle de Mantine (55KB) es competitivo considerando que incluye forms, hooks, date pickers, notificaciones y RTE — funcionalidades que en otras bibliotecas requerirían paquetes adicionales que suman al bundle total.

---

### 6. Cuándo Usar Mantine (Checklist)

✅ **Usa Mantine si:**
- Estás iniciando un **proyecto nuevo** en 2026
- Construyes **dashboards, admin panels o internal tools**
- Quieres **máxima funcionalidad con mínimas dependencias** (1 biblioteca vs 8 paquetes)
- Usas **Next.js App Router** o necesitas compatibilidad RSC
- Quieres evitar **runtime CSS-in-JS** y su overhead
- Necesitas **forms con validación, date pickers, notificaciones, RTE y charts** sin pagar
- Eres **freelancer o equipo pequeño/mediano** que quiere velocidad de desarrollo
- Vienes de **Chakra UI** y buscas la migración más natural
- El **dark mode** es un requisito
- Quieres **82 hooks** reutilizables incluso fuera de la biblioteca de componentes

❌ **NO uses Mantine si:**
- Necesitas **personalización visual extremadamente profunda** (MUI con su sistema de tokens es mejor)
- Tu equipo ya **estandarizó en Material Design** y no hay razón para cambiar
- Estás en **React 18** y no puedes actualizar a React 19.2+ (Mantine 9 lo requiere)
- **Cada kilobyte importa** al máximo (elige shadcn/ui o headless)
- Necesitas un **ecosistema enorme de templates premium** (MUI o Ant Design)
- Eres una **empresa grande** donde el "hiring pool" (disponibilidad de desarrolladores) es un factor crítico
- Construyes un **design system ultra-personalizado desde cero** (elige Radix + Tailwind)
- Trabajas en un entorno que **prohíbe breaking changes frecuentes**

---

### 7. Veredicto Final

> **Mantine es la biblioteca con mayor momentum en 2026.** Su crecimiento del 50% en descargas en 18 meses, su arquitectura moderna (CSS Modules, zero runtime), su compatibilidad RSC superior, y su set de características "todo incluido" la convierten en la opción más difícil de argumentar en contra para **proyectos nuevos**.

> Para **entornos enterprise conservadores**, MUI sigue siendo la opción "segura" con su ecosistema masivo y hiring pool.
>
> Para **dashboards admin con datos complejos**, Ant Design ofrece profundidad inigualable en tablas y formularios enterprise.
>
> Para **accesibilidad como prioridad máxima**, Chakra UI sigue siendo excelente pero su crecimiento estancado y problemas de migración son preocupaciones reales.

**En resumen:**
- Mantine = El pick del momentum (2026)
- MUI = El estándar enterprise probado
- Ant Design = El rey de los dashboards admin
- Chakra UI = El excelente en accesibilidad que perdió tracción

---

## Fuentes de Investigación

### Documentación oficial y repositorio

| Fuente | URL | Descripción |
|--------|-----|-------------|
| About Mantine | https://mantine.dev/about/ | Página oficial "Acerca de" con historia, stats y equipo |
| Mantine GitHub | https://github.com/mantinedev/mantine | Repositorio oficial — 31K+ estrellas, 303 releases |
| Getting Started | https://mantine.dev/getting-started/ | Guía oficial de inicio |
| Changelog v7.0.0 | https://mantine.dev/changelog/7-0-0/ | Documentación de la migración a CSS Modules |
| Changelog All Releases | https://mantine.dev/changelog/all-releases/ | Historial completo de versiones |
| v6 Mantine Docs | https://v6.mantine.dev/ | Documentación de la versión 6 (pre-migración CSS Modules) |
| v5 Changelog | https://v5.mantine.dev/pages/changelog/ | Changelog histórico de v1 a v5 |
| Perfil Vitaly Rtishchev | https://github.com/rtivital | GitHub del creador |

### Entrevistas y artículos del creador

| Fuente | URL | Descripción |
|--------|-----|-------------|
| Entrevista Console #87 | https://console.substack.com/p/console-87 | Entrevista con Vitaly — motivación, inspiración, historia |
| Startup Spotlight | https://startupspotlight.co/founder/rtivital | Perfil de Vitaly como founder de Mantine |
| Front-End Front | https://frontendfront.com/author/rtivital | Artículos escritos por Vitaly |

### Análisis de la biblioteca

| Fuente | URL | Descripción |
|--------|-----|-------------|
| DesignSystems.one | https://www.designsystems.one/design-systems/mantine | Análisis detallado de Mantine como design system |
| MakerStack Review | https://makerstack.co/reviews/mantine-review/ | Review 8.1/10 con pros/cons detallados |
| Doolpa Review | https://doolpa.com/article/mantine | Review exhaustiva 2026 — 92/100, análisis de rendimiento |
| StudyRaid | https://app.studyraid.com/en/read/12411/400670/what-is-mantine-and-its-role-in-react-development | Guía educativa sobre filosofía de Mantine |
| BuildPilot Review | https://trybuildpilot.com/541-mantine-ui-review-2026 | Review con nota 8/10 y casos de uso |

### Comparativas Mantine vs Competencia

| Fuente | URL | Descripción |
|--------|-----|-------------|
| DEV.to — React UI Library Showdown | https://dev.to/royce_fabbd83cb268312e928/mui-vs-ant-design-vs-mantine-vs-chakra-the-react-ui-library-showdown-97m | Comparativa detallada 2026 de las 4 bibliotecas |
| PkgPulse — Best React UI Libraries 2026 | https://www.pkgpulse.com/guides/best-react-ui-libraries-2026 | Análisis basado en datos npm en tiempo real |
| PkgPulse — @mantine/core vs @mui/material | https://www.pkgpulse.com/compare/mantine__core-vs-mui__material | Comparativa directa de paquetes con health scores |
| PkgPulse — Comparison All 4 | https://www.pkgpulse.com/compare/mantine__core-vs-mui__material-vs-antd-vs-chakra-ui-vs-core-vs-material-vs-react | Comparativa completa de las 4 bibliotecas |
| AdminLTE — Mantine vs Chakra vs MUI 2026 | https://adminlte.io/blog/mantine-vs-chakra-ui-vs-mui/ | Comparativa actualizada a Julio 2026 |
| Wood CP — 8 Libraries Dashboard | https://www.woodcp.com/2026/03/react-ui-library-comparison/ | Dashboard comparativo de 8 bibliotecas con bundle sizes |
| FastBuilder.ai — MUI vs Mantine | https://fastbuilder.ai/blog/material-ui-v6-vs-mantine | Comparativa MUI vs Mantine con análisis CBFDAE |
| tinyctl.dev — 7 Best React UI Libraries 2026 | https://tinyctl.dev/roundups/react-ui-libraries/ | Ranking y guía de selección |
| Makers Den — React UI Libraries 2025 | https://makersden.io/blog/react-ui-libs-2025-comparing-shadcn-radix-mantine-mui-chakra | Comparativa con shadcn/ui, Radix y más |
| TechResolve — Why Mantine isn't most popular | https://techresolve.blog/2025/12/28/how-is-mantine-ui-not-the-most-popular-ui-library/ | Análisis del "first-mover advantage" y mercado |
| DEV.to — Why Mantine for Dashboards | https://dev.to/devforgedev/why-i-chose-mantine-over-shadcnui-for-every-dashboard-project-5fd0 | Experiencia práctica usando Mantine para dashboards |
| ShadcnDeck — Mantine vs shadcn/ui | https://www.shadcndeck.com/blog/mantine-vs-shadcn | Comparativa Mantine vs shadcn/ui |
| PkgPulse — Top React Component Libraries 2026 | https://www.pkgpulse.com/guides/top-react-component-libraries | Guía general de las mejores librerías 2026 |

### Ejemplo de código real de GitHub

| Fuente | URL | Descripción |
|--------|-----|-------------|
| Mantine Accesibilidad | https://github.com/mantinedev/mantine/blob/master/apps/help.mantine.dev/src/pages/q/are-mantine-components-accessible.mdx | Documentación oficial sobre accesibilidad WAI-ARIA |
| Changelog v7 source | https://github.com/mantinedev/mantine/blob/master/apps/mantine.dev/src/pages/changelog/7-0-0.mdx | Código fuente del changelog v7 en el repo |
| GitHub Comparison Repo | https://github.com/HighBridgeDragon/react-ui-framework-comparison | Repo con comparativa visual en Storybook de 6 frameworks |

---

*Documento de investigación preparado para el Integrante #4 — Proyecto AnimeGJ*
*Julio 2026*
