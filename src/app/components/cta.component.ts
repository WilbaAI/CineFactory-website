import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { RevealDirective } from '../reveal.directive';

@Component({
  selector: 'tcf-cta',
  standalone: true,
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="tcf-section" id="contact">
      <div class="tcf-cta" [tcfReveal]="0">
        <div class="tcf-cta__bg"></div>
        <h2>
          Let's build
          <em>something cinematic.</em>
        </h2>
        <p class="tcf-cta__copy">
          Tell us about your brand. We'll come back with a plan to make it unforgettable.
        </p>
        <div class="tcf-cta__actions">
          <button class="tcf-btn tcf-btn--primary" (click)="clicked.emit()">
            Start a project
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
          <a href="mailto:hello@thecinefactory.com" class="tcf-btn tcf-btn--ghost">
            hello&#64;thecinefactory.com
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .tcf-cta__copy {
        max-width: 560px;
        margin: 0 auto 36px;
        font-family: var(--font-sans);
        font-size: 17px;
        line-height: 1.6;
        color: var(--smoke-300);
      }
      .tcf-cta__actions {
        display: inline-flex;
        gap: 14px;
        flex-wrap: wrap;
        justify-content: center;
      }
    `,
  ],
})
export class CtaComponent {
  @Output() clicked = new EventEmitter<void>();
}
