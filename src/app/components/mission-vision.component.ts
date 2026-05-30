import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tcf-mission-vision',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="tcf-section" id="about">
      <div class="tcf-section__inner">
        <div class="tcf-mv">
          <div class="tcf-mv__media">
            <img src="assets/portfolio/04-mission.png" alt="Cinematic camera under warm light" />
          </div>
          <div class="tcf-mv__body">
            <div class="tcf-eyebrow-tag">— What drives us</div>
            <div class="tcf-stacked">
              <div>Our Mission</div>
              <div>Our Mission</div>
              <div>Our Mission</div>
            </div>
            <p>
              To transform brands into experiences through cinematic content and data-driven marketing.
            </p>
          </div>
        </div>
      </div>

      <div class="tcf-section__inner" style="margin-top: 160px;">
        <div class="tcf-mv" style="direction: rtl;">
          <div class="tcf-mv__media">
            <img src="assets/portfolio/05-vision.png" alt="Spiral of light over a laptop" />
          </div>
          <div class="tcf-mv__body" style="direction: ltr;">
            <div class="tcf-eyebrow-tag">— Where we're going</div>
            <div class="tcf-stacked">
              <div>Our Vision</div>
              <div>Our Vision</div>
              <div>Our Vision</div>
            </div>
            <p>
              To become a leading creative force in digital media — known for innovation, storytelling, and results.
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class MissionVisionComponent {}
