# Sat4Life — Design System

## Colors

### Primary palette

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#0a0e1a` | Page background, deepest navy |
| `--bg-secondary` | `#0f1628` | Card backgrounds, elevated surfaces |
| `--accent` | `#00c8ff` | Primary interactive accent, cyan |
| `--accent-dim` | `rgba(0, 200, 255, 0.15)` | Hover states, subtle highlights |
| `--accent-glow` | `rgba(0, 200, 255, 0.3)` | Glowing borders, active indicators |

### Semantic

| Token | Value | Usage |
|-------|-------|-------|
| `--green` | `#00e676` | Live status, success |
| `--red` | `#ff4d6a` | Errors, offline |
| `--orange` | `#ffab40` | Demo mode, warnings |

### Text

| Token | Value | Usage |
|-------|-------|-------|
| `--text-primary` | `#e6f0ff` | Headings, body text |
| `--text-secondary` | `#8ba4c7` | Secondary labels, metadata |
| `--text-dim` | `#4a6080` | Disabled, timestamps |

### Borders

| Token | Value | Usage |
|-------|-------|-------|
| `--border` | `rgba(0, 200, 255, 0.12)` | Default card borders |
| `--border-bright` | `rgba(0, 200, 255, 0.35)` | Active/hover borders |

## Typography

- **Primary font:** Inter (sans-serif)
- **Monospace font:** JetBrains Mono (for data, timestamps, satellite IDs)
- **Scale:** 14px base, 1.25 ratio between steps
- **Headings:** Inter bold/semibold, uppercase for satellite names

## Spacing

- **Nav height:** 72px
- **Container max:** 1400px
- **Border radius:** 12px (default), 8px (small), 20px (large)
- **Card padding:** 20-24px
- **Section gaps:** 48-80px

## Components

### Cards (PassCard)
- Glass-morphism background with subtle cyan border
- Thumbnail image with lazy loading
- Satellite name, date, type badge, PNG count
- Hover: border brightens, slight scale

### Status badge
- Green dot + "EN VIVO" when connected to Supabase with data
- Orange dot + "MODO DEMO" when offline or no data

### Lightbox
- Full-screen overlay with keyboard navigation
- Shows full-resolution image with pass metadata
- Escape to close, arrow keys to navigate

## Motion

- Page transitions: fade-in 300ms ease-out
- Card hover: scale 1.02, border glow 200ms
- Lightbox: fade-in 200ms, image scale from 0.95
- No bounce, no elastic easing

## Anti-patterns to avoid

- No purple-to-blue gradients
- No glassmorphism as default (only on cards, purposefully)
- No side-stripe borders
- No bounce/elastic animations
- No Inter as the only personality (pair with JetBrains Mono for data)
- No generic SaaS card grids with identical cards