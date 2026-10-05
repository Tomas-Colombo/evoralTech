---
version: alpha
name: EvoralTech-design-system
description: Sitio de un engineering studio con estética editorial de plano técnico. Página blanca, tipografía casi negra cálida y marrones bronce para todos los detalles (reglas, guías, etiquetas, acciones). Display en serif Newsreader de peso liviano y tracking negativo, cuerpo en Schibsted Grotesk y metadatos en Geist Mono en mayúsculas. La firma visual es el logo trazado como escultura de 3 piezas que se arma al cargar y se despieza en un plano anotado al hacer scroll. Nada de estética SaaS, template o "AI".

colors:
  primary: "#926a42"          # accent-deep — CTAs, foco, selección, texto de acento
  accent: "#a67e54"           # bronce — puntos, barras, trazos, detalles gráficos
  accent-light: "#c9a67f"     # bronce claro — acentos sobre superficies marrones
  ink: "#1a1512"
  body: "#1a1512"
  muted: "#6f6255"            # ink-2 — texto secundario
  muted-soft: "#a39585"       # solo decorativo / texto grande
  hairline: "rgba(146, 106, 66, 0.24)"
  hairline-soft: "rgba(146, 106, 66, 0.10)"
  canvas: "#ffffff"
  surface-soft: "#f7f2ec"     # paper-2 — bandas y paneles suaves
  surface-dark: "#33261d"     # brown — paneles invertidos, footer, menú móvil
  surface-dark-elevated: "#3d2e24"
  on-primary: "#ffffff"
  on-dark: "#ffffff"
  on-dark-soft: "rgba(255, 255, 255, 0.6)"
  on-dark-accent: "#c9a67f"

typography:
  display-xl:
    fontFamily: "Newsreader, Times New Roman, serif"
    fontSize: "clamp(3rem, 8.2vw, 9rem)"
    fontWeight: 350
    lineHeight: 0.9
    letterSpacing: -0.035em
  display-lg:
    fontFamily: "Newsreader, Times New Roman, serif"
    fontSize: "clamp(2.75rem, 6.2vw, 6.75rem)"
    fontWeight: 350
    lineHeight: 0.9
    letterSpacing: -0.035em
  display-md:
    fontFamily: "Newsreader, Times New Roman, serif"
    fontSize: "clamp(2rem, 3vw, 3rem)"
    fontWeight: 350
    lineHeight: 1
    letterSpacing: -0.02em
  title-lg:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: 1.5rem
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: -0.01em
  title-md:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: 1.125rem
    fontWeight: 500
    lineHeight: 1.35
    letterSpacing: -0.01em
  body-md:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: 1.0625rem
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0
  body-sm:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: 0.9375rem
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0
  meta:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: 0.6875rem
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0.08em
    textTransform: uppercase
  button:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: 0.9375rem
    fontWeight: 500
    lineHeight: 1
    letterSpacing: -0.01em

rounded:
  none: 0
  full: 9999px     # solo puntos de estado y marcadores circulares

spacing:
  margin: "clamp(1rem, 3.6vw, 3.5rem)"
  gutter: "clamp(0.75rem, 1.4vw, 1.5rem)"
  nav-h: 4.25rem

motion:
  ease-out: "cubic-bezier(0.16, 1, 0.3, 1)"
  ease-in-out: "cubic-bezier(0.76, 0, 0.24, 1)"

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    hoverFill: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    height: 48px
    padding: 0 20px
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-primary}"
    hoverFill: "{colors.primary}"
    rounded: "{rounded.none}"
  button-paper:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    hoverFill: "{colors.primary}"
    rounded: "{rounded.none}"
  top-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    height: "{spacing.nav-h}"
  mobile-menu:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-dark}"
  soft-panel:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
  dark-panel:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.none}"
  meta-label:
    textColor: "{colors.muted}"
    typography: "{typography.meta}"
  status-dot:
    backgroundColor: "{colors.accent}"
    rounded: "{rounded.full}"
    size: 6px
  footer:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-dark-soft}"
---

## Overview

EvoralTech es un engineering studio, y el sitio tiene que leerse como un **plano técnico editorial**, no como una landing de SaaS. La base es una **página blanca** (`{colors.canvas}`) con tipografía casi negra y cálida (`{colors.ink}` — #1a1512). Todo detalle (reglas, guías de columna, etiquetas, puntos, acciones) va en **marrones bronce**: `{colors.accent}` (#a67e54) y `{colors.primary}` (#926a42). El naranja del logo original **no se usa**: la paleta es bronce independientemente del logo.

**Rasgos clave:**
- Página blanca con un grano de papel estático y casi invisible (`.paper-grain`, teñido en bronce).
- Guías de columna como hairlines (`{colors.hairline}`) que dejan ver la grilla de 12 columnas: el sitio muestra su estructura.
- Display en Newsreader de peso 350, tracking -0.035em e interlineado 0.9. Grande y liviano, nunca bold.
- Metadatos en Geist Mono 11px en mayúsculas con tracking 0.08em, como las cotas de un plano.
- Esquinas rectas en todo. Lo único redondo son los puntos de estado y los marcadores circulares.
- Pocas superficies marrón oscuro (`{colors.surface-dark}` — #33261d), solo para paneles invertidos, el menú móvil y el footer.
- Firma visual: el logo trazado (`logo-paths.ts`) como escultura de 3 piezas que se despieza en un plano anotado (A Arquitectura / B Sistema / C Producción).

## Colors

### Acento (bronce)
- **Primary / Accent Deep** (`{colors.primary}` — #926a42): CTAs, anillo de foco, selección de texto y **todo texto de acento**. Contraste 4.81:1 sobre blanco (AA para texto normal).
- **Accent** (`{colors.accent}` — #a67e54): puntos, barras, trazos y rellenos gráficos. Contraste 3.66:1 sobre blanco: **no usarlo para texto chico**, solo para gráficos o texto ≥ 24px.
- **Accent Light** (`{colors.accent-light}` — #c9a67f): acento sobre superficies marrón oscuro (6.44:1 sobre `{colors.surface-dark}`).

### Superficies
- **Canvas** (`{colors.canvas}` — #ffffff): fondo de página por defecto.
- **Surface Soft** (`{colors.surface-soft}` — #f7f2ec): paneles suaves y bandas; suele ir al 70–80% de opacidad sobre la grilla.
- **Surface Dark** (`{colors.surface-dark}` — #33261d): panel invertido, menú móvil, footer. Lleva `.grain-dark` y `.guides-dark`.
- **Surface Dark Elevated** (`{colors.surface-dark-elevated}` — #3d2e24): elementos elevados dentro de paneles oscuros.
- **Hairline** (`{colors.hairline}` — bronce al 24%): reglas, bordes y guías de columna.
- **Hairline Soft** (`{colors.hairline-soft}` — bronce al 10%): divisores apenas visibles.

### Texto
- **Ink** (`{colors.ink}` — #1a1512): titulares y texto principal (18.1:1).
- **Muted** (`{colors.muted}` — #6f6255): texto secundario y metadatos (5.91:1).
- **Muted Soft** (`{colors.muted-soft}` — #a39585): solo decorativo o texto grande (2.92:1).
- **On Dark** (`{colors.on-dark}` — #ffffff): texto sobre marrón oscuro (14.6:1).

## Typography

### Familias
- **Newsreader** (serif, eje óptico `opsz`, normal + itálica) para el display. La itálica se usa para énfasis dentro de los titulares.
- **Schibsted Grotesk** para cuerpo, navegación, botones y títulos de UI.
- **Geist Mono** para metadatos, cotas, numeración y etiquetas.

Todas se cargan con `next/font/google` en `src/app/layout.tsx` y se exponen como `--font-display`, `--font-sans` y `--font-mono`.

### Jerarquía

| Token | Tamaño | Peso | Interlineado | Tracking | Uso |
|---|---|---|---|---|---|
| `{typography.display-xl}` | clamp(3rem, 8.2vw, 9rem) | 350 | 0.9 | -0.035em | Hero y titulares de sección (`display-tight`) |
| `{typography.display-lg}` | clamp(2.75rem, 6.2vw, 6.75rem) | 350 | 0.9 | -0.035em | Titulares secundarios |
| `{typography.display-md}` | clamp(2rem, 3vw, 3rem) | 350 | 1 | -0.02em | Subtítulos editoriales, citas |
| `{typography.title-lg}` | 1.5rem | 500 | 1.2 | -0.01em | Títulos de servicio y proyecto |
| `{typography.title-md}` | 1.125rem | 500 | 1.35 | -0.01em | Títulos de ítems, lead |
| `{typography.body-md}` | 1.0625rem | 400 | 1.55 | 0 | Texto corrido |
| `{typography.body-sm}` | 0.9375rem | 400 | 1.55 | 0 | Texto secundario, footer |
| `{typography.meta}` | 0.6875rem | 400 | 1.4 | 0.08em, mayúsculas | Etiquetas, índices (01 / 02), cotas |
| `{typography.button}` | 0.9375rem | 500 | 1 | -0.01em | Botones |

### Principios
- El display va siempre liviano (350) y con tracking negativo. El énfasis se logra con escala o itálica, nunca con peso.
- La utilidad `meta` es la voz técnica del sitio: numeración de secciones, estados y anotaciones del plano.
- El copy va en español rioplatense (voseo).

## Layout

### Grilla
- `grid-page`: 4 columnas en móvil y 12 desde 768px. Margen `{spacing.margin}`, gutter `{spacing.gutter}`.
- Las guías de columna son elementos visibles (`GridLines` en la página, `.guides-dark` en los paneles oscuros). El contenido se alinea a ellas.
- Las secciones se separan con `.rule-top`, una hairline de borde a borde.
- La composición es asimétrica sobre la grilla de 12 columnas, no grillas de cards 3-up centradas.

### Espacio en blanco
Mucho aire vertical entre secciones; el ritmo lo marcan las hairlines y la numeración en mono, no el cambio de fondo en cada banda.

## Elevation & Depth

| Nivel | Tratamiento | Uso |
|---|---|---|
| Plano | Sin sombra ni borde | Casi todo |
| Hairline | 1px `{colors.hairline}` | Reglas, bordes de paneles, guías |
| Panel suave | `{colors.surface-soft}` | Paneles de servicio, estudio y fundadores |
| Panel oscuro | `{colors.surface-dark}` + grano | Footer, menú, paneles invertidos |

**No hay sombras.** La profundidad viene de las hairlines, del cambio de superficie y del grano.

## Shapes

- Radio 0 en botones, paneles, imágenes y cards.
- `{rounded.full}` solo para puntos de estado (`{component.status-dot}`) y marcadores circulares de los diagramas.
- Los gráficos de marca se derivan de `logo-paths.ts` (trazo vectorial del logo original). No se inventan íconos ni ilustraciones nuevas fuera de ese lenguaje.
- No se usan fotos de stock, retratos inventados, clientes ni métricas que no existan: solo contenido real.

## Components

### Botones (`ButtonLink`)
Botón con esquinas rectas y flecha. En hover, un segundo color sube desde el borde inferior (`scale-y` con `ease-out-expo`, 500ms) y la flecha avanza.
- **`button-primary`** (variante `accent`): fondo `{colors.primary}`, texto blanco y relleno ink en hover.
- **`button-ink`**: fondo ink, texto blanco y relleno bronce en hover.
- **`button-paper`**: fondo blanco, texto ink y relleno bronce en hover (el texto pasa a blanco).
- Tamaños: `sm` 36px, `md` 48px y `lg` 64px de alto.
- Para destinos externos se usa la flecha diagonal (`external`).

### Navegación
- **`top-nav`**: blanca, de alto `{spacing.nav-h}`, con el logo bronce (`public/EvoralTechLogoMarron.png` vía `<Logo>`).
- **`mobile-menu`**: hoja a pantalla completa en `{colors.surface-dark}`.

### Paneles
- **`soft-panel`**: `{colors.surface-soft}` al 70–80%, esquinas rectas y hairline.
- **`dark-panel`**: `{colors.surface-dark}` con `.grain-dark` y `.guides-dark`; los acentos pasan a `{colors.accent-light}`.

### Lenguaje de plano (utilidades en `globals.css`)
- **`corner-marks`**: marcas de registro en las 4 esquinas de una caja. Se ajustan con `--cm-size`, `--cm-gap` y `--cm-color`. Se usan en el marco del hero y en los visuales de proyectos, donde se abren en hover/focus.
- **`dot-field`**: puntos de mesa de dibujo que se desvanecen hacia los bordes. Solo detrás de una figura, nunca a página completa.
- **`band-soft`**: banda `{colors.surface-soft}` con bordes que se funden con la página.
- **`rule-top`**: la hairline superior de sección se dibuja de izquierda a derecha al entrar (scroll-driven CSS, sin JS; estática si no hay soporte o con reduced motion).

### Etiquetas
- **`meta-label`**: Geist Mono 11px en mayúsculas, color `{colors.muted}` o `{colors.primary}`.
- **`status-dot`**: punto de 6px, `{colors.accent}` si está en vivo y `{colors.muted}` si no.

### Footer
`{colors.surface-dark}`, texto `{colors.on-dark-soft}` y logo y acentos en bronce claro.

## Motion

- Easing: `--ease-out` (expo) para entradas y hovers; `--ease-in-out` (quart) para transiciones de página y loader.
- Primitivas en `src/components/motion/` (`Reveal`, `TextReveal`, `ScrubText`, `Parallax`, `ImageReveal`, `MagneticButton`, `SmoothScroll`, `Cursor`, `PageTransition`). Hay que reutilizarlas en vez de escribir GSAP ad hoc.
- Los titulares entran palabra por palabra con máscara (`.word-mask`).
- Se respeta `prefers-reduced-motion`: `data-motion` solo se setea si hay movimiento permitido, y un failsafe libera el contenido.

## Do's and Don'ts

### Do
- Usar `{colors.primary}` (#926a42) para todo texto de acento y para los CTAs.
- Reservar `{colors.accent}` (#a67e54) para gráficos, puntos, barras y trazos.
- Mostrar la grilla con guías y hairlines; alinear todo a ella.
- Display grande, liviano y apretado; metadatos en mono en mayúsculas.
- Derivar cualquier gráfico de marca del trazo del logo.
- Usar solo contenido real.

### Don't
- No usar el naranja del logo (#FF9800) ni ningún naranja, coral, azul o violeta como acento.
- No usar `{colors.accent}` ni `{colors.muted-soft}` para texto chico (no pasan AA).
- No usar bordes redondeados, sombras, gradientes, glassmorphism ni glows.
- No usar display en bold ni display en sans.
- No hacer grillas de cards 3-up genéricas, hero centrado con badge ni "estética AI".
- No inventar clientes, métricas, testimonios ni retratos.

## Responsive Behavior

| Nombre | Ancho | Cambios |
|---|---|---|
| Móvil | < 768px | Grilla de 4 columnas; menú en hoja marrón; el display baja por `clamp`; columnas apiladas |
| Tablet+ | ≥ 768px | Grilla de 12 columnas; composición asimétrica completa |

- Margen lateral mínimo de 16px (`{spacing.margin}`) y sin scroll horizontal.
- Áreas táctiles de al menos 44px (los botones `md` miden 48px).

## Iteration Guide

1. Los tokens viven en `src/app/globals.css` (`:root` + `@theme inline`). Este documento los refleja; si cambian ahí, actualizá acá.
2. Usar las clases de Tailwind de los tokens (`bg-accent-deep`, `text-ink-2`, `border-rule`) y nunca hex sueltos.
3. Ante la duda sobre énfasis: más escala o itálica en Newsreader antes que más peso.
4. Blanco + ink + bronce es la trinidad. Marrón oscuro solo en pocos paneles invertidos.
