import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnDestroy,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HeaderComponent } from './components/header.component';
import { HeroComponent } from './components/hero.component';
import { MarqueeComponent } from './components/marquee.component';
import { MissionVisionComponent } from './components/mission-vision.component';
import { ServicesComponent } from './components/services.component';
import { WorksComponent, Work } from './components/works.component';
import { FaqComponent } from './components/faq.component';
import { CtaComponent } from './components/cta.component';
import { FooterComponent } from './components/footer.component';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeaderComponent,
    HeroComponent,
    MarqueeComponent,
    MissionVisionComponent,
    ServicesComponent,
    WorksComponent,
    FaqComponent,
    CtaComponent,
    FooterComponent,
  ],
  template: `
    <tcf-header [active]="active()" (navigate)="scrollTo($event)"></tcf-header>
    <tcf-hero
      (primary)="scrollTo('work')"
      (secondary)="scrollTo('services')"
      (scrollDown)="scrollTo('about')"
    ></tcf-hero>
    <tcf-marquee></tcf-marquee>
    <tcf-mission-vision></tcf-mission-vision>
    <tcf-services></tcf-services>
    <tcf-works (selectWork)="openModal($event)"></tcf-works>
    <tcf-faq></tcf-faq>
    <tcf-cta (clicked)="scrollTo('contact')"></tcf-cta>
    <tcf-footer></tcf-footer>

    @if (modalWork(); as work) {
      <!-- Backdrop click is a mouse convenience; keyboard users dismiss via Escape or the Close button. -->
      <!-- eslint-disable-next-line @angular-eslint/template/click-events-have-key-events, @angular-eslint/template/interactive-supports-focus -->
      <div class="tcf-modal-scrim" (click)="closeModal()">
        <div
          class="tcf-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="tcf-modal-title"
          (click)="$event.stopPropagation()"
          (keydown)="trapFocus($event)"
        >
          <div class="tcf-eyebrow-tag">{{ work.client }}</div>
          <h3 class="tcf-modal__title" id="tcf-modal-title">{{ work.title }}</h3>

          @if (embedUrl(); as src) {
            <div class="tcf-modal__player">
              <iframe
                [src]="src"
                title="TikTok video"
                allow="autoplay; encrypted-media; fullscreen"
                allowfullscreen
                loading="lazy"
              ></iframe>
            </div>
          } @else {
            <p class="tcf-modal__body">Reel coming soon — added shortly.</p>
          }

          <div class="tcf-modal__foot">
            @if (work.url) {
              <a
                class="tcf-btn tcf-btn--ghost"
                [href]="work.url"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open on TikTok ↗
              </a>
            }
            <button class="tcf-btn tcf-btn--primary tcf-modal__close" (click)="closeModal()">
              Close
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .tcf-modal-scrim {
        position: fixed;
        inset: 0;
        z-index: 100;
        background: rgba(0, 0, 0, 0.78);
        display: grid;
        place-items: center;
        padding: 24px;
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
      }
      .tcf-modal {
        background: var(--bg-surface);
        border: 1px solid var(--tint-ember-30);
        border-radius: var(--radius-xl);
        padding: 24px;
        max-width: 380px;
        width: 100%;
        text-align: center;
        box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
      }
      .tcf-modal__title {
        font-family: var(--font-display);
        font-weight: 700;
        font-size: 20px;
        letter-spacing: -0.01em;
        margin: 4px 0 16px;
        color: var(--white);
      }
      .tcf-modal__player {
        position: relative;
        width: 100%;
        aspect-ratio: 9 / 16;
        max-height: 70vh;
        border-radius: var(--radius-md);
        overflow: hidden;
        background: #000;
      }
      .tcf-modal__player iframe {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        border: 0;
      }
      .tcf-modal__body {
        color: var(--smoke-300);
        font-size: 15px;
        line-height: 1.6;
      }
      .tcf-modal__foot {
        display: flex;
        gap: 10px;
        justify-content: center;
        margin-top: 18px;
      }
    `,
  ],
})
export class AppComponent implements OnDestroy {
  active = signal<string>('home');
  modalWork = signal<Work | null>(null);
  embedUrl = signal<SafeResourceUrl | null>(null);

  private readonly sanitizer = inject(DomSanitizer);
  private readonly sections = ['home', 'about', 'services', 'work', 'contact'];
  private observer?: IntersectionObserver;
  private lastFocused: HTMLElement | null = null;

  constructor() {
    // Browser-only: skipped during prerender (no DOM on the server).
    afterNextRender(() => {
      // Active-section tracking via IntersectionObserver (no per-frame scroll work).
      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              this.active.set(entry.target.id);
            }
          }
        },
        { rootMargin: '-45% 0px -55% 0px', threshold: 0 },
      );
      for (const id of this.sections) {
        const el = document.getElementById(id);
        if (el) this.observer.observe(el);
      }
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  scrollTo(id: string): void {
    this.active.set(id);
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const y = el.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
  }

  openModal(work: Work): void {
    this.lastFocused = document.activeElement as HTMLElement | null;
    this.embedUrl.set(
      work.videoId
        ? this.sanitizer.bypassSecurityTrustResourceUrl(
            `https://www.tiktok.com/embed/v2/${work.videoId}`,
          )
        : null,
    );
    this.modalWork.set(work);
    // Defer focus until the dialog is in the DOM.
    setTimeout(() => {
      document.querySelector<HTMLElement>('.tcf-modal__close')?.focus();
    });
  }

  closeModal(): void {
    this.modalWork.set(null);
    this.embedUrl.set(null);
    this.lastFocused?.focus();
    this.lastFocused = null;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.modalWork()) this.closeModal();
  }

  /** Keep Tab focus inside the open dialog. */
  trapFocus(event: KeyboardEvent): void {
    if (event.key !== 'Tab') return;
    const modal = document.querySelector('.tcf-modal');
    if (!modal) return;
    const focusable = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
}
