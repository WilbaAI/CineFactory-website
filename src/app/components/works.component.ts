import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../reveal.directive';

export interface Work {
  client: string;
  title: string;
  image?: string;
}

interface WorkGroup {
  client: string;
  items: { title: string; image?: string }[];
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
                    (click)="selectWork.emit({ client: group.client, title: item.title })"
                    [attr.aria-label]="'View ' + item.title + ' for ' + group.client"
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
                      <span class="tcf-reel__client">{{ group.client }}</span>
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
export class WorksComponent implements AfterViewInit, OnDestroy {
  @Output() selectWork = new EventEmitter<Work>();

  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);

  ngAfterViewInit(): void {
    this.updateOverflow();
    window.addEventListener('resize', this.updateOverflow, { passive: true });
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
      client: 'Avatar Band SL — Bus',
      items: [
        { title: 'Avatar movie theme bus' },
        { title: 'The transformation' },
        { title: 'Music band bus' },
      ],
    },
    {
      client: 'Edirisinghe Cushion Works',
      items: [
        { title: 'Interior modification' },
        { title: 'Next-level seats' },
        { title: 'Best-in-class finish' },
      ],
    },
    {
      client: 'Heshan de Silva — Personal Content',
      items: [
        { title: 'Trust your work' },
        { title: 'Heshan de Silva' },
        { title: 'Hear this out' },
      ],
    },
    {
      client: 'Anura Advertising',
      items: [
        { title: 'Sakeed — Reflect' },
        { title: 'Tiger bus wrap' },
        { title: 'NR Super Service' },
      ],
    },
    {
      client: 'Imperial College',
      items: [
        { title: 'Imperial College' },
        { title: 'Sustainable businesses' },
        { title: 'International Business & Finance' },
        { title: 'Build my future' },
        { title: 'One of the best decisions' },
        { title: 'Morning & night practices' },
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
