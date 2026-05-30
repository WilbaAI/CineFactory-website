import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../reveal.directive';

export interface Work {
  id: string;
  client: string;
  title: string;
  bg: string;
}

@Component({
  selector: 'tcf-works',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="tcf-section" id="work">
      <div class="tcf-section__inner">
        <div class="tcf-section__head" [tcfReveal]="0">
          <div class="tcf-eyebrow-tag">Selected work</div>
          <h2 class="tcf-section__title">Our Work</h2>
        </div>

        <div class="tcf-works-grid">
          @for (w of works; track w.id) {
            <button
              type="button"
              class="tcf-work"
              [tcfReveal]="$index"
              (click)="selectWork.emit(w)"
              [attr.aria-label]="'View case study: ' + w.title + ' for ' + w.client"
            >
              <span class="tcf-work__bg" [style.background]="w.bg"></span>
              <span class="tcf-work__play">
                <span class="tcf-work__play-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </span>
              <span class="tcf-work__meta">
                <span class="tcf-work__client">{{ w.client }}</span>
                <span class="tcf-work__title">{{ w.title }}</span>
              </span>
            </button>
          }
        </div>
      </div>
    </section>
  `,
})
export class WorksComponent {
  @Output() selectWork = new EventEmitter<Work>();

  readonly works: Work[] = [
    {
      id: 'avatar',
      client: 'Avatar Band SL',
      title: 'Bus campaign',
      bg: "url('assets/portfolio/08-works.webp') -120px -380px / 600px auto no-repeat",
    },
    {
      id: 'wijaya',
      client: 'Wijaya Products',
      title: 'Biriyaani mix launch',
      bg: "url('assets/portfolio/08-works.webp') -120px -900px / 600px auto no-repeat",
    },
    {
      id: 'wijaya-map',
      client: 'Wijaya Products',
      title: 'Origins map sequence',
      bg: "url('assets/portfolio/08-works.webp') -560px -900px / 600px auto no-repeat",
    },
    {
      id: 'anura',
      client: 'Anura Advertising',
      title: 'New Year wish',
      bg: "url('assets/portfolio/08-works.webp') -440px -1430px / 700px auto no-repeat",
    },
  ];
}
