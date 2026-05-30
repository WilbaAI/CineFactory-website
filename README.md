# Cine Factory — Angular UI Kit

Angular 17+ port of the marketing site. Standalone components, signals, OnPush change detection. **This folder is a complete Angular workspace** — `npm install && ng serve` and you're running.

## Run it

```bash
cd ui_kits/website-angular
npm install
npm start
```

Then open http://localhost:4200.

## Structure

```
ui_kits/website-angular/
├── package.json
├── angular.json
├── tsconfig.json
├── tsconfig.app.json
└── src/
    ├── colors_and_type.css      # design tokens (copied from project root)
    ├── styles.scss              # global .tcf-* component styles
    ├── index.html               # bootstraps <app-root>
    ├── main.ts                  # bootstrapApplication entry
    ├── assets/
    │   ├── logo-lockup-dark.png
    │   ├── logo-mark.png
    │   └── portfolio/           # all 8 brand pages, used as imagery
    └── app/
        ├── app.component.ts     # root — composes sections, owns scroll/modal state
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

## Angular-isms preserved

- **Standalone components**, no NgModule.
- **`ChangeDetectionStrategy.OnPush`** everywhere.
- **Signals** (`signal<T>()`) for state in `AppComponent` (active section, work modal).
- **New control flow** (`@if`, `@for` with `track`) — requires Angular 17+.
- **`@Input` / `@Output`** for parent-child communication; no global state, no services needed.
- Element selectors prefixed `tcf-` (configured in `angular.json` `prefix`).

## Behaviors preserved

- Smooth-scroll anchor nav with active-section underline (`scrollTo()` + `@HostListener('window:scroll')`).
- Sticky nav with backdrop-blur.
- Service cards: hover-lifted ember radial glow (pure CSS).
- Work cards: image-scale-on-hover + ember play-button reveal.
- Click work card → opens an overlay modal (no Angular Material dep; swap in CDK Overlay or MatDialog when productionizing).
- Endless tagline marquee (pure CSS animation).

## Customization

- **Brand tokens** live in `src/colors_and_type.css`. Change `--ember-500` and the whole site shifts.
- **Component styles** live in `src/styles.scss` (the `.tcf-*` classes). Same source as the JSX version.
- **Component logic** is per-file in `src/app/components/*.component.ts` — find-and-edit just the surface you need.

## Notes

- Strict mode + strict templates are on (`tsconfig.json`). All inputs are typed.
- The work modal uses a plain `<div>` overlay. For production, swap to `@angular/cdk/overlay` or `@angular/material/dialog` for accessibility (focus trap, escape-to-close, ARIA).
- No router yet — the site is a single scrolling page. Add `@angular/router` if you split routes (services-detail, blog, etc).
