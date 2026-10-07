---
name: Palmeras Vinyl Console
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#434655'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#747686'
  outline-variant: '#c4c5d7'
  surface-tint: '#2151da'
  primary: '#0037b0'
  on-primary: '#ffffff'
  primary-container: '#1d4ed8'
  on-primary-container: '#cad3ff'
  inverse-primary: '#b7c4ff'
  secondary: '#445ba0'
  on-secondary: '#ffffff'
  secondary-container: '#9db3fe'
  on-secondary-container: '#2c4387'
  tertiary: '#003ca3'
  on-tertiary: '#ffffff'
  tertiary-container: '#0051d6'
  on-tertiary-container: '#c9d4ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b7c4ff'
  on-primary-fixed: '#001551'
  on-primary-fixed-variant: '#0039b5'
  secondary-fixed: '#dbe1ff'
  secondary-fixed-dim: '#b4c5ff'
  on-secondary-fixed: '#00174c'
  on-secondary-fixed-variant: '#2b4386'
  tertiary-fixed: '#dbe1ff'
  tertiary-fixed-dim: '#b4c5ff'
  on-tertiary-fixed: '#00174b'
  on-tertiary-fixed-variant: '#003ea8'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  headline-xl:
    fontFamily: EB Garamond
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: EB Garamond
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: EB Garamond
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: EB Garamond
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: EB Garamond
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 30px
  headline-sm:
    fontFamily: EB Garamond
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 26px
  body-lg:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Manrope
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Manrope
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.06em
  label-xs:
    fontFamily: Manrope
    fontSize: 9px
    fontWeight: '600'
    lineHeight: 12px
    letterSpacing: 0.08em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system blends high-precision catalog engineering with the romantic tactility of vinyl archivists. It caters to audiophiles, collectors, selectors, and store managers who demand archival accuracy alongside editorial reverence.

The aesthetic fuses **Modern Swiss Cataloguer Minimalism** with **Editorial Vinyl Prestige**:
- **Purity & Canvas**: Pristine porcelain backgrounds (`#ffffff`, `#f8fafc`) framed by hairline slate rules (`#e2e8f0`).
- **Sonic Electric Blue**: Vivid cobalt and deep royal sapphire anchors (`#2563eb`, `#0f2b6e`) echoing classic blue-note pressings and vinyl rim highlights.
- **Typographic Rigor**: High-contrast serif headlines for heritage and album dignity paired with dense, unyielding sans-serifs for matrix numbers, pressing plants, runout groove notes, and pricing tiers.

## Colors

The palette establishes an archive-grade light canvas complemented by sapphire depth and charcoal legibility.

- **Primary (`#1d4ed8`) & Tertiary (`#2563eb`)**: Cobalt tones for key state indicators, interactive action buttons, vinyl spine tags, and active playback scrubbers.
- **Secondary (`#0f2b6e`)**: Midnight sapphire utilized for circular center label emblems, high-tier status badges, and contrasting dark-shell media drawers.
- **Neutral (`#0f172a`)**: Deep vinyl charcoal for foundational headlines and heavy-gauge text, supported by `#334155` for descriptive metadata and `#64748b` for serial labels.
- **Canvas & Surface**: Surface base `#ffffff` backed by container `#f8fafc` and divider hairline borders `#e2e8f0`.

## Typography

The typography establishes a curated dialogue between history and technical precision:

- **EB Garamond** confers heritage, literary sophistication, and warmth to artist names, record release titles, and editorial curators' notes.
- **Manrope** provides seamless ergonomic reading for reviews, track annotations, shipping manifests, commerce body text, matrix codes, and archival labels.

## Layout & Spacing

A structured 12-column modular grid anchors desktop views, contracting to 8 columns on tablets and 4 columns on mobile devices.

- **Rhythm**: Built on a strict 4px base increment. Grid structures prioritize catalog density while maintaining clean air around release artwork and audio player consoles.
- **Breakpoints**:
  - `Desktop (>1280px)`: 12 columns, `gutter: 1.5rem`, `margin: 2rem`, maximum container constraint `1440px`.
  - `Tablet (768px - 1279px)`: 8 columns, `gutter: 1.25rem`, `margin: 1.5rem`.
  - `Mobile (<768px)`: 4 columns, `gutter: 1rem`, `margin: 1rem`. Bottom sheets replace split inspector sidebars.

## Elevation & Depth

Visual hierarchy is maintained through crisp structural segmentation rather than heavy skeuomorphic shading:

- **Surface Tiers**:
  - `Layer 0 (Canvas)`: `#ffffff` crisp background.
  - `Layer 1 (Card/Dock)`: `#f8fafc` with a 1px boundary of `#e2e8f0`.
  - `Layer 2 (Floating Player/Popover)`: Pure `#ffffff` framed by `#cbd5e1` with a diffuse ambient shadow: `0 8px 30px rgba(15, 43, 110, 0.08)`.
- **Vinyl Depth Accents**: Concentric record grooves employ micro-borders and soft ambient concentric gradients instead of harsh drop shadows.

## Shapes

The design uses soft, tailored edges (`0.25rem` / 4px base border radius) evoking classic record sleeves, archive drawers, and index cards. Circular treatments (`rounded-full`) are reserved exclusively for vinyl disc badges, center record labels, circular tone arm controls, and numeric playback chips.

## Components

- **Buttons**:
  - *Primary*: `#1d4ed8` fill, white Manrope semi-bold label, 4px corner radius, hovering to `#2563eb`.
  - *Catalog Action (Ghost)*: Transparent surface, 1px `#e2e8f0` border, `#0f172a` text, shifting to `#f8fafc` background on hover.
  - *Vinyl Cue*: Circular 40px sapphire button containing a cobalt center punch and white play/pause glyph.

- **Chips & Metadata Badges**:
  - Compact Manrope labels in uppercase.
  - *Status Badge*: `#0f2b6e` background with white text, or pale tint `#eff6ff` with `#1d4ed8` border and typography.
  - *RPM / Weight Chip*: 1px bordered pill with micro dot indicators (`180g VIRGIN VINYL`).

- **Record Cards**:
  - Square album sleeve container with a 1px `#e2e8f0` frame.
  - Hover reveals the vinyl disc sliding slightly out from the sleeve with a signature cobalt vinyl rim outline.
  - Typography stack: EB Garamond album title, Manrope artist subtitle, Manrope catalog/price tag.

- **Lists & Data Tables**:
  - Tracklist and stock logs feature hairline horizontal dividers (`#f1f5f9`).
  - Strict columnar alignment: Track Number (Sans) | Title (Manrope) | Duration (Sans) | Key / BPM | Add to Cart.

- **Form Controls & Inputs**:
  - Inputs feature 1px `#e2e8f0` borders, `#f8fafc` background on idle, shifting to `#ffffff` with a 1.5px `#1d4ed8` ring on focus.
  - Clean sans-serif filtering selectors for genre, catalog year, and pressing origin.