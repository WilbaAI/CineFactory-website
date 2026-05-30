import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'tcf-hero',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="tcf-hero" id="home">
      <div class="tcf-hero__glow"></div>
      <div class="tcf-hero__vignette"></div>
      <div class="tcf-hero__content">
        <h1 class="tcf-hero__title">
          IGNITE YOUR<br />
          <em>Brand.</em>
        </h1>
        <p class="tcf-hero__subtitle">
          We transform brands into experiences through cinematic content and data-driven marketing.
        </p>
        <div class="tcf-hero__cta">
          <button class="tcf-btn tcf-btn--primary" (click)="primary.emit()">
            View our work
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </button>
          <button class="tcf-btn tcf-btn--ghost" (click)="secondary.emit()">
            What we do
          </button>
        </div>
      </div>
    </section>
  `,
})
export class HeroComponent {
  @Output() primary = new EventEmitter<void>();
  @Output() secondary = new EventEmitter<void>();
}
