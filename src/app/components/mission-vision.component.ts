import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealDirective } from '../reveal.directive';

@Component({
  selector: 'tcf-mission-vision',
  standalone: true,
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="tcf-section" id="about">
      <div class="tcf-section__inner">
        <div class="tcf-mv">
          <div class="tcf-mv__media" [tcfReveal]="0">
            <img
              src="assets/portfolio/04-mission.webp"
              alt="Cinematic camera under warm light"
              width="1400"
              height="1977"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div class="tcf-mv__body" [tcfReveal]="1">
            <div class="tcf-eyebrow-tag">What drives us</div>
            <h2 class="tcf-section__title">Our Mission</h2>
            <p>
              To transform brands into experiences through cinematic content and data-driven
              marketing.
            </p>
          </div>
        </div>
      </div>

      <div class="tcf-section__inner tcf-mv-stack">
        <div class="tcf-mv tcf-mv--reverse">
          <div class="tcf-mv__media" [tcfReveal]="0">
            <img
              src="assets/portfolio/05-vision.webp"
              alt="Spiral of light over a laptop"
              width="1400"
              height="1965"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div class="tcf-mv__body" [tcfReveal]="1">
            <div class="tcf-eyebrow-tag">Where we're going</div>
            <h2 class="tcf-section__title">Our Vision</h2>
            <p>
              To become a leading creative force in digital media - known for innovation,
              storytelling, and results.
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class MissionVisionComponent {}
