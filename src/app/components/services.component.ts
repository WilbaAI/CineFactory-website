import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Service {
  num: string;
  title: string;
  desc: string;
}

@Component({
  selector: 'tcf-services',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="tcf-section" id="services">
      <div class="tcf-section__inner">
        <div class="tcf-eyebrow-tag">— What we specialize in</div>
        <div class="tcf-stacked">
          <div>Services</div>
          <div>Services</div>
          <div>Services</div>
        </div>

        <div class="tcf-services">
          @for (s of services; track s.num) {
            <article class="tcf-service">
              <div>
                <div class="tcf-service__num">{{ s.num }}</div>
                <h3 class="tcf-service__title">{{ s.title }}</h3>
                <p class="tcf-service__desc">{{ s.desc }}</p>
              </div>
              <div class="tcf-service__arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M7 17 17 7M9 7h8v8" />
                </svg>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class ServicesComponent {
  readonly services: Service[] = [
    {
      num: '01',
      title: 'AI Video Content',
      desc: 'Next-generation AI-powered videos for modern brands. Cinematic, realistic, emotionally engaging — never generic.',
    },
    {
      num: '02',
      title: 'Video Production',
      desc: 'Live-action commercial-style work with film-quality lighting, motion, and color grading.',
    },
    {
      num: '03',
      title: 'Social Media Management',
      desc: 'Strategy, content calendars, and management built around viral short-form formats that actually convert.',
    },
    {
      num: '04',
      title: 'Digital Marketing',
      desc: 'Data-driven campaigns that pair creative direction with measurable growth across every channel.',
    },
  ];
}
