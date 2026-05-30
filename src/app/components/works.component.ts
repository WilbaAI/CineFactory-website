import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Work {
  id: string;
  client: string;
  title: string;
  bg: string;
}

@Component({
  selector: 'tcf-works',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="tcf-section" id="work">
      <div class="tcf-section__inner">
        <div class="tcf-eyebrow-tag">— Selected work</div>
        <div class="tcf-stacked">
          <div>Our Works</div>
          <div>Our Works</div>
          <div>Our Works</div>
        </div>

        <div class="tcf-works-grid">
          @for (w of works; track w.id) {
            <article class="tcf-work" (click)="selectWork.emit(w)">
              <div class="tcf-work__bg" [style.background]="w.bg"></div>
              <div class="tcf-work__play">
                <div class="tcf-work__play-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div class="tcf-work__meta">
                <div class="tcf-work__client">{{ w.client }}</div>
                <div class="tcf-work__title">{{ w.title }}</div>
              </div>
            </article>
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
      bg: "url('assets/portfolio/08-works.png') -120px -380px / 600px auto no-repeat",
    },
    {
      id: 'wijaya',
      client: 'Wijaya Products',
      title: 'Biriyaani mix launch',
      bg: "url('assets/portfolio/08-works.png') -120px -900px / 600px auto no-repeat",
    },
    {
      id: 'wijaya-map',
      client: 'Wijaya Products',
      title: 'Origins map sequence',
      bg: "url('assets/portfolio/08-works.png') -560px -900px / 600px auto no-repeat",
    },
    {
      id: 'anura',
      client: 'Anura Advertising',
      title: 'New Year wish',
      bg: "url('assets/portfolio/08-works.png') -440px -1430px / 700px auto no-repeat",
    },
  ];
}
