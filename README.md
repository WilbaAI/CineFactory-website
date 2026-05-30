# The Cine Factory — Website

Marketing site for The Cine Factory. Angular 17 standalone components, signals,
OnPush change detection. A self-contained Angular workspace — `npm install && npm start`
and you're running.

## Run it

```bash
npm install
npm start
```

Then open http://localhost:4200.

## Scripts

| Command                | What it does                              |
| ---------------------- | ----------------------------------------- |
| `npm start`            | Dev server (`ng serve`) on :4200          |
| `npm run build`        | Production build to `dist/cinefactory`    |
| `npm run lint`         | ESLint (angular-eslint, incl. a11y rules) |
| `npm run format`       | Prettier write across the repo            |
| `npm run format:check` | Prettier check (CI-friendly)              |

## Structure

```
.
├── package.json
├── angular.json
├── eslint.config.js            # angular-eslint flat config
├── .prettierrc.json
└── src/
    ├── colors_and_type.css     # design tokens (colors, type, spacing, motion)
    ├── styles.scss             # global .tcf-* component styles
    ├── index.html              # bootstraps <app-root>, loads fonts + SEO meta
    ├── main.ts                 # bootstrapApplication entry
    ├── assets/
    │   ├── logo-lockup-dark.png
    │   ├── logo-mark.png
    │   └── portfolio/          # webp imagery used by mission/vision + works
    └── app/
        ├── app.component.ts    # root — composes sections, scroll spy, work modal
        └── components/
            ├── header.component.ts        # <tcf-header>
            ├── hero.component.ts          # <tcf-hero>
            ├── marquee.component.ts       # <tcf-marquee>
            ├── mission-vision.component.ts# <tcf-mission-vision>
            ├── services.component.ts      # <tcf-services>
            ├── works.component.ts         # <tcf-works>
            ├── cta.component.ts           # <tcf-cta>
            └── footer.component.ts        # <tcf-footer>
```

## Design system

Dark canvas, single vivid red accent, modern sans typography.

- **Display:** Space Grotesk (geometric grotesque) — headings, hero, section titles.
- **Body:** Inter — nav, cards, copy, eyebrows.
- **Accent:** `--ember-500` (`#E5342A`). Change it in `colors_and_type.css` and the
  whole site re-tints. Translucent red tints (`--tint-ember-*`) drive pills, banners, hovers.
- Fonts load via `<link>` + `preconnect` in `index.html` (not CSS `@import`) for faster paint.

## Angular-isms

- **Standalone components**, no NgModule.
- **`ChangeDetectionStrategy.OnPush`** everywhere.
- **Signals** for state in `AppComponent` (active section, work modal).
- **New control flow** (`@if`, `@for` with `track`) — Angular 17+.
- **`@Input` / `@Output`** for parent-child; no global state or services.
- Element selectors prefixed `tcf-` (root stays `app-root`).

## Accessibility & performance notes

- Section titles are real `<h2>`s; one `<h1>` in the hero. Decorative SVGs are `aria-hidden`.
- Work cards are native `<button>`s — keyboard-focusable and operable.
- The work modal is a `role="dialog"` with `aria-modal`, Escape-to-close, a Tab focus
  trap, and focus restore on close. (For heavier needs, swap in `@angular/cdk/overlay`.)
- Active-section nav tracking uses `IntersectionObserver` (no per-frame scroll work).
- `prefers-reduced-motion` is respected — animations and smooth-scroll are disabled.
- Portfolio imagery is `webp`, lazy-loaded with intrinsic `width`/`height` to avoid layout shift.

## Not yet wired

- Social/footer links (`Process`, TikTok, Instagram) are placeholders.
- No router — single scrolling page. Add `@angular/router` to split routes.
- The work modal shows a preview stub, not a real case-study player.
