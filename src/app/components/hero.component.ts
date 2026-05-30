import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  Output,
  afterNextRender,
  computed,
  signal,
} from '@angular/core';
import { EmberFieldComponent } from './ember-field.component';

const HEAD = 'Ignite Your ';
const TAIL = 'Brand';
const FULL = HEAD + TAIL;

@Component({
  selector: 'tcf-hero',
  imports: [EmberFieldComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="tcf-hero" id="home">
      <div class="tcf-hero__glow"></div>
      <div class="tcf-hero__grain"></div>
      <div class="tcf-hero__vignette"></div>
      <tcf-ember-field></tcf-ember-field>
      <div class="tcf-hero__content">
        <img
          class="tcf-hero__mark"
          src="assets/mark.png"
          alt="The Cine Factory"
          width="72"
          height="72"
        />
        <h1 class="tcf-hero__title" aria-label="Ignite Your Brand">
          <span aria-hidden="true"
            >{{ head() }}<span class="tcf-hero__accent">{{ tail() }}</span
            ><span class="tcf-hero__caret"></span
          ></span>
        </h1>
        <p class="tcf-hero__subtitle">
          We transform brands into experiences through cinematic content and data-driven marketing.
        </p>
        <div class="tcf-hero__cta">
          <button class="tcf-btn tcf-btn--primary" (click)="primary.emit()">
            View our work
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </button>
          <button class="tcf-btn tcf-btn--ghost" (click)="secondary.emit()">What we do</button>
        </div>
      </div>
      <button class="tcf-hero__scroll" (click)="scrollDown.emit()" aria-label="Scroll to content">
        <span>Scroll</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </button>
    </section>
  `,
})
export class HeroComponent implements OnDestroy {
  @Output() primary = new EventEmitter<void>();
  @Output() secondary = new EventEmitter<void>();
  @Output() scrollDown = new EventEmitter<void>();

  // Starts full so prerender/no-JS render the complete headline (SEO); the
  // browser resets to 0 and types it out after hydration.
  private readonly typed = signal(FULL.length);
  private timer?: ReturnType<typeof setTimeout>;

  readonly head = computed(() => HEAD.slice(0, Math.min(this.typed(), HEAD.length)));
  readonly tail = computed(() => TAIL.slice(0, Math.max(0, this.typed() - HEAD.length)));

  constructor() {
    afterNextRender(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; // keep full text
      this.typed.set(0);
      const step = (): void => {
        if (this.typed() >= FULL.length) return;
        this.typed.update((n) => n + 1);
        const justTyped = FULL[this.typed() - 1];
        this.timer = setTimeout(step, justTyped === ' ' ? 120 : 70 + Math.random() * 50);
      };
      this.timer = setTimeout(step, 450);
    });
  }

  ngOnDestroy(): void {
    if (this.timer) clearTimeout(this.timer);
  }
}
