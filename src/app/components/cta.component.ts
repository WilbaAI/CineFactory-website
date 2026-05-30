import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'tcf-cta',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="tcf-section" id="contact" style="padding-block: 80px;">
      <div class="tcf-cta">
        <div class="tcf-cta__bg"></div>
        <div class="tcf-cta__vignette"></div>
        <h2>
          Let's build
          <em>something cinematic.</em>
        </h2>
        <p class="tcf-cta__copy">
          Tell us about your brand. We'll come back with a plan to make it unforgettable.
        </p>
        <div class="tcf-cta__actions">
          <button class="tcf-btn tcf-btn--primary tcf-cta__btn-dark" (click)="clicked.emit()">
            Start a project
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </button>
          <a href="mailto:hello@thecinefactory.com" class="tcf-btn tcf-btn--ghost tcf-cta__btn-ghost">
            hello&#64;thecinefactory.com
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .tcf-cta__copy {
      max-width: 560px;
      margin: 0 auto 40px;
      font-family: var(--font-serif);
      font-style: italic;
      font-size: 20px;
      line-height: 1.5;
      color: rgba(255, 255, 255, 0.95);
    }
    .tcf-cta__actions { display: inline-flex; gap: 16px; }
    .tcf-cta__btn-dark { background: #000; box-shadow: none; }
    .tcf-cta__btn-ghost { border-color: rgba(0, 0, 0, 0.4); color: #000; }
  `],
})
export class CtaComponent {
  @Output() clicked = new EventEmitter<void>();
}
