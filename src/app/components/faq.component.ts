import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealDirective } from '../reveal.directive';

interface Faq {
  q: string;
  a: string;
}

@Component({
  selector: 'tcf-faq',
  standalone: true,
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="tcf-section" id="faq">
      <div class="tcf-section__inner">
        <div class="tcf-section__head" [tcfReveal]="0">
          <div class="tcf-eyebrow-tag">FAQ</div>
          <h2 class="tcf-section__title">Questions, answered</h2>
        </div>

        <div class="tcf-faq" [tcfReveal]="0">
          @for (f of faqs; track f.q) {
            <details class="tcf-faq__item">
              <summary class="tcf-faq__q">{{ f.q }}</summary>
              <p class="tcf-faq__a">{{ f.a }}</p>
            </details>
          }
        </div>
      </div>
    </section>
  `,
})
export class FaqComponent {
  // Kept in sync with the FAQPage JSON-LD in index.html.
  readonly faqs: Faq[] = [
    {
      q: 'What does The Cine Factory do?',
      a: 'The Cine Factory is a creative marketing and media production studio in Homagama, Sri Lanka. We produce cinematic video content and run data-driven marketing — turning brands into experiences across video, social media, and digital campaigns.',
    },
    {
      q: 'What services do you offer?',
      a: 'Four core services: AI Video Content, Video Production (commercial-grade, film-quality lighting and colour), Social Media Management (short-form, viral-first), and Digital Marketing (data-driven campaigns across channels).',
    },
    {
      q: 'Where is The Cine Factory located?',
      a: 'We are based at No 6, Deepangoda, Homagama, Sri Lanka, and work with clients across the country.',
    },
    {
      q: 'What kind of brands do you work with?',
      a: 'Music acts, vehicle and bus branding, personal brands, and businesses. Recent work includes Avatar Band SL, Edirisinghe Cushion Works, Heshan de Silva, and Anura Advertising.',
    },
    {
      q: 'How do I start a project?',
      a: 'Call +94 70 5 98 98 98, email thecinefactory.tfc@gmail.com, or tap “Start a project”. Tell us about your brand and we will come back with a plan.',
    },
    {
      q: 'What makes The Cine Factory different?',
      a: 'We pair cinematic, film-quality production with AI-powered content and measurable, data-driven marketing — creative built to convert, not just to look good.',
    },
  ];
}
