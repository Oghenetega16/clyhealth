# ClyHealth — Biological Age Dashboard

A production-grade IoT health analytics dashboard built with the **latest** versions of every dependency.

## 🚀 Tech Stack (Latest Versions)

| Technology | Version | Notes |
|---|---|---|
| **Next.js** | `^16.2.0` | App Router, Turbopack dev server, `next.config.ts` |
| **React** | `^19.2.1` | Latest stable with React Compiler improvements |
| **TypeScript** | `^5.8.3` | Strict mode, `moduleResolution: bundler` |
| **Tailwind CSS** | `^4.3.0` | **CSS-first config** — no `tailwind.config.ts`, uses `@theme {}` in CSS |
| **@tailwindcss/postcss** | `^4.3.0` | Replaces `autoprefixer` + old `tailwindcss` postcss plugin |
| **Zustand** | `^5.0.14` | Updated store signature: `create<T>()((set) => ...)` |
| **Motion (framer-motion)** | `^12.40.0` | Import from `motion/react` (rebranded) |
| **Recharts** | `^3.8.1` | Latest chart library |
| **Lucide React** | `^1.17.0` | Latest icon set |
| **clsx** | `^2.1.1` | |
| **tailwind-merge** | `^3.3.0` | |

## ⚡ Key v4 Tailwind Changes Applied

- **No `tailwind.config.ts`** — all design tokens in `@theme {}` inside `globals.css`
- **`@import "tailwindcss"`** replaces the old three-directive pattern
- **`@utility`** directive for custom utilities
- **`color-mix(in oklch, ...)`** for alpha variants instead of opacity modifiers
- **`postcss.config.mjs`** uses `@tailwindcss/postcss` only — no autoprefixer

## 📦 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🏗 Project Structure

```
clyhealth/
├── app/
│   ├── globals.css        # Tailwind v4 @theme config + keyframes + @utility
│   ├── layout.tsx         # Root layout with Metadata + Viewport exports
│   └── page.tsx
├── components/
│   ├── charts/
│   │   ├── RadarChart.tsx         # Custom SVG radar (no dep)
│   │   ├── RiskGauge.tsx          # Custom SVG animated arc gauge
│   │   ├── TelomereChart.tsx      # Recharts AreaChart
│   │   └── InflammationChart.tsx  # Recharts AreaChart
│   ├── dashboard/
│   │   ├── Dashboard.tsx          # AnimatePresence page transitions
│   │   ├── OverviewView.tsx       # Main grid layout
│   │   ├── AgeReportPanel.tsx
│   │   ├── RiskGaugePanel.tsx
│   │   ├── TelomerePanel.tsx
│   │   ├── MethylationPanel.tsx
│   │   ├── ImmunityPanel.tsx
│   │   ├── InflammationPanel.tsx
│   │   ├── EpigeneticMarkersPanel.tsx
│   │   ├── ImmunityView.tsx       # Full immunity tab
│   │   ├── InflammationView.tsx   # Full inflammation tab
│   │   ├── MethylationView.tsx    # Full methylation tab
│   │   └── TelomereView.tsx       # Full telomere tab
│   └── layout/
│       ├── TopBar.tsx     # AnimatePresence notification dropdown
│       ├── Sidebar.tsx    # Spring animation slide-in
│       └── TabNav.tsx     # layoutId tab indicator
├── lib/
│   ├── mock-data.ts
│   └── utils.ts
├── store/
│   └── health-store.ts    # Zustand 5 with updated create() syntax
└── types/
    └── health.ts
```

## 🎨 Design System (Tailwind v4 CSS-first)

All tokens are defined in `app/globals.css` under `@theme {}` and become available as `var(--color-*)`, `var(--font-*)` CSS custom properties automatically:

```css
@theme {
  --color-accent-blue:   #4f8ef7;
  --color-accent-cyan:   #38d9c0;
  --font-display: "Syne", sans-serif;
  --font-mono:    "JetBrains Mono", monospace;
  /* ... */
}
```

Custom utilities are registered with `@utility`:
```css
@utility glass {
  backdrop-filter: blur(14px);
  /* ... */
}
```

## ✨ Features

- **5 fully interactive tabs** — Overview, Immunity, Inflammation, Methylation, Telomere
- **Animated arc gauge** — disease risk percentile with spring-animated risk bubbles
- **Custom SVG radar chart** — body system health dimensions
- **Telomere reference chart** — age-adjusted with percentile band
- **Inflammation trend** — 8-month history with reference line
- **DNA methylation** — epigenetic clock comparison across 5 clocks
- **Live data refresh** — simulated sensor update with overlay
- **Notification dropdown** — `AnimatePresence` fade/scale
- **Sidebar** — spring-physics slide-in with backdrop blur
- **Tab transitions** — `AnimatePresence mode="wait"` between views
- **Motion tab indicator** — `layoutId` shared element animation
