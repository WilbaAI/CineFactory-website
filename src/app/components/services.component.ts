import { ChangeDetectionStrategy, Component } from '@angular/core';

import { RevealDirective } from '../reveal.directive';

interface Service {
  num: string;
  title: string;
  desc: string;
}

@Component({
  selector: 'tcf-services',
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="tcf-section" id="services">
      <div class="tcf-section__inner">
        <div class="tcf-section__head" [tcfReveal]="0">
          <div class="tcf-eyebrow-tag">What we specialize in</div>
          <h2 class="tcf-section__title">Services</h2>
        </div>

        <div class="tcf-services">
          @for (s of services; track s.num) {
            <article class="tcf-service" [tcfReveal]="$index">
              <div>
                <div class="tcf-service__num">{{ s.num }}</div>
                <h3 class="tcf-service__title">{{ s.title }}</h3>
                <p class="tcf-service__desc">{{ s.desc }}</p>
              </div>
              <div class="tcf-service__arrow">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  aria-hidden="true"
                >
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
      desc: 'Next-generation AI-powered videos for modern brands. Cinematic, realistic, emotionally engaging - never generic.',
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
