import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  afterNextRender,
  inject,
} from '@angular/core';

import { RevealDirective } from '../reveal.directive';

export interface Work {
  client: string;
  title: string;
  image?: string;
  url?: string;
  videoId?: string;
}

interface WorkItem {
  title: string;
  image?: string;
  url?: string;
  videoId?: string;
  client?: string; // overrides the rail label on the card (for mixed rails)
}

interface WorkGroup {
  client: string;
  items: WorkItem[];
}

@Component({
  selector: 'tcf-works',
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="tcf-section" id="work">
      <div class="tcf-section__inner">
        <div class="tcf-section__head" [tcfReveal]="0">
          <div class="tcf-eyebrow-tag">Selected work</div>
          <h2 class="tcf-section__title">Our Work</h2>
        </div>

        @for (group of groups; track group.client) {
          <div class="tcf-works-rail" [tcfReveal]="0">
            <h3 class="tcf-works-rail__label">{{ group.client }}</h3>
            <div class="tcf-works-rail__scroller">
              <button
                type="button"
                class="tcf-rail-arrow tcf-rail-arrow--prev"
                aria-label="Scroll left"
                (click)="scrollRail($event, -1)"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  aria-hidden="true"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <div class="tcf-works-track">
                @for (item of group.items; track item.title) {
                  <button
                    type="button"
                    class="tcf-reel"
                    (click)="
                      selectWork.emit({
                        client: item.client ?? group.client,
                        title: item.title,
                        url: item.url,
                        videoId: item.videoId,
                      })
                    "
                    [attr.aria-label]="
                      'View ' + item.title + ' for ' + (item.client ?? group.client)
                    "
                  >
                    <span
                      class="tcf-reel__bg"
                      [class.is-placeholder]="!item.image"
                      [style.background-image]="item.image ? 'url(' + item.image + ')' : null"
                    ></span>
                    <span class="tcf-reel__play">
                      <span class="tcf-reel__play-icon">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="white"
                          aria-hidden="true"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </span>
                    <span class="tcf-reel__meta">
                      <span class="tcf-reel__client">{{ item.client ?? group.client }}</span>
                      <span class="tcf-reel__title">{{ item.title }}</span>
                    </span>
                  </button>
                }
              </div>

              <button
                type="button"
                class="tcf-rail-arrow tcf-rail-arrow--next"
                aria-label="Scroll right"
                (click)="scrollRail($event, 1)"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  aria-hidden="true"
                >
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
        }
      </div>
    </section>
  `,
})
export class WorksComponent implements OnDestroy {
  @Output() selectWork = new EventEmitter<Work>();

  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);

  constructor() {
    // Browser-only: arrows depend on measured overflow (no DOM during prerender).
    afterNextRender(() => {
      this.updateOverflow();
      window.addEventListener('resize', this.updateOverflow, { passive: true });
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.updateOverflow);
  }

  // Mark only the rails that overflow so arrows show just where they're useful.
  private readonly updateOverflow = (): void => {
    const rails = this.host.nativeElement.querySelectorAll<HTMLElement>('.tcf-works-rail');
    rails.forEach((rail) => {
      const track = rail.querySelector<HTMLElement>('.tcf-works-track');
      if (track) rail.classList.toggle('has-overflow', track.scrollWidth > track.clientWidth + 4);
    });
  };

  // Real portfolio. Drop reel thumbnails into src/assets/works/<client>/ and set
  // `image` on each item to swap the placeholder for the actual frame.
  readonly groups: WorkGroup[] = [
    {
      client: 'Bus & Vehicle Branding',
      items: [
        {
          client: 'Avatar Band SL — Bus',
          title: 'Avatar Band SL branding',
          videoId: '7622921197524733200',
          url: 'https://www.tiktok.com/@anuraadvertising.pvt.ltd/video/7622921197524733200',
          image: 'assets/works/avatar-band/7622921197524733200.webp',
        },
        {
          client: 'Edirisinghe Cushion Works',
          title: 'Avatar Band — the makeover',
          videoId: '7624500400682454292',
          url: 'https://www.tiktok.com/@edirisinghacushionworks/video/7624500400682454292',
          image: 'assets/works/edirisinghe/7624500400682454292.webp',
        },
      ],
    },
    {
      client: 'Heshan de Silva — Personal Content',
      items: [
        {
          title: 'තමන්ව විශ්වාස කරන්න!',
          videoId: '7640818599820659969',
          url: 'https://www.tiktok.com/@heshan_de_silva01/video/7640818599820659969',
          image: 'assets/works/heshan/7640818599820659969.webp',
        },
        {
          title: 'Branding නියාමනය කළොත්…',
          videoId: '7641958552478715152',
          url: 'https://www.tiktok.com/@heshan_de_silva01/video/7641958552478715152',
          image: 'assets/works/heshan/7641958552478715152.webp',
        },
        {
          title: 'දැනගෙන ඇසුරු කරන්න!',
          videoId: '7643077290691153153',
          url: 'https://www.tiktok.com/@heshan_de_silva01/video/7643077290691153153',
          image: 'assets/works/heshan/7643077290691153153.webp',
        },
        {
          title: 'ධෛර්යය ඇතුව වැඩ කරන්න.',
          videoId: '7620487660741659920',
          url: 'https://www.tiktok.com/@heshan_de_silva01/video/7620487660741659920',
          image: 'assets/works/heshan/7620487660741659920.webp',
        },
        {
          title: 'තමන්ව විශ්වාස කරන්න.',
          videoId: '7616272864802557200',
          url: 'https://www.tiktok.com/@heshan_de_silva01/video/7616272864802557200',
          image: 'assets/works/heshan/7616272864802557200.webp',
        },
        {
          title: 'අනුන්ගේ දියුණුවට සතුටු වෙන්න',
          videoId: '7614529327559871760',
          url: 'https://www.tiktok.com/@heshan_de_silva01/video/7614529327559871760',
          image: 'assets/works/heshan/7614529327559871760.webp',
        },
        {
          title: 'පරාද වෙන්න පුරුදු වෙන්න',
          videoId: '7610648006739660033',
          url: 'https://www.tiktok.com/@heshan_de_silva01/video/7610648006739660033',
          image: 'assets/works/heshan/7610648006739660033.webp',
        },
      ],
    },
    {
      client: 'Anura Advertising',
      items: [
        {
          title: 'NR Super Service & Luxury Edition',
          videoId: '7638225630567370001',
          url: 'https://www.tiktok.com/@anuraadvertising.pvt.ltd/video/7638225630567370001',
          image: 'assets/works/anura/7638225630567370001.webp',
        },
        {
          title: 'ඔයාගේ business එකේත් Brand Value එක වැඩි කරමු!',
          videoId: '7644789948570176784',
          url: 'https://www.tiktok.com/@anuraadvertising.pvt.ltd/video/7644789948570176784',
          image: 'assets/works/anura/7644789948570176784.webp',
        },
        {
          title: 'Jeyabal Travels',
          videoId: '7635280138158050561',
          url: 'https://www.tiktok.com/@anuraadvertising.pvt.ltd/video/7635280138158050561',
          image: 'assets/works/anura/7635280138158050561.webp',
        },
        {
          title: 'සුභ වෙසක් මංගල්‍යයක් වේවා 🪔',
          videoId: '7645390704717335809',
          url: 'https://www.tiktok.com/@anuraadvertising.pvt.ltd/video/7645390704717335809',
          image: 'assets/works/anura/7645390704717335809.webp',
        },
        {
          title: 'Janaka Express',
          videoId: '7639598783642275088',
          url: 'https://www.tiktok.com/@anuraadvertising.pvt.ltd/video/7639598783642275088',
          image: 'assets/works/anura/7639598783642275088.webp',
        },
        {
          title: 'Millennials ලගෙන් GenZ පරපුරට — 26 වසරක විශ්වාසය',
          videoId: '7638896408325557505',
          url: 'https://www.tiktok.com/@anuraadvertising.pvt.ltd/video/7638896408325557505',
          image: 'assets/works/anura/7638896408325557505.webp',
        },
        {
          title: 'Rathna Travels & Tours',
          videoId: '7636036511401577729',
          url: 'https://www.tiktok.com/@anuraadvertising.pvt.ltd/video/7636036511401577729',
          image: 'assets/works/anura/7636036511401577729.webp',
        },
      ],
    },
  ];

  scrollRail(event: Event, direction: number): void {
    const scroller = (event.currentTarget as HTMLElement).closest('.tcf-works-rail__scroller');
    const track = scroller?.querySelector<HTMLElement>('.tcf-works-track');
    if (!track) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollBy({
      left: direction * track.clientWidth * 0.8,
      behavior: reduce ? 'auto' : 'smooth',
    });
  }
}
