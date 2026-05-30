import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnDestroy,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header.component';
import { HeroComponent } from './components/hero.component';
import { MarqueeComponent } from './components/marquee.component';
import { MissionVisionComponent } from './components/mission-vision.component';
import { ServicesComponent } from './components/services.component';
import { WorksComponent, Work } from './components/works.component';
import { CtaComponent } from './components/cta.component';
import { FooterComponent } from './components/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    HeaderComponent,
    HeroComponent,
    MarqueeComponent,
    MissionVisionComponent,
    ServicesComponent,
    WorksComponent,
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
          <p class="tcf-modal__body">
            Full case study preview — film would open here in production.
          </p>
          <button class="tcf-btn tcf-btn--primary tcf-modal__close" (click)="closeModal()">
            Close
          </button>
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
        padding: 40px;
        max-width: 520px;
        width: 100%;
        text-align: center;
        box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
      }
      .tcf-modal__title {
        font-family: var(--font-display);
        font-weight: 700;
        font-size: 34px;
        letter-spacing: -0.02em;
        margin: 8px 0 20px;
        color: var(--white);
      }
      .tcf-modal__body {
        color: var(--smoke-300);
        font-size: 15px;
        line-height: 1.6;
        margin-bottom: 28px;
      }
    `,
  ],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  active = signal<string>('home');
  modalWork = signal<Work | null>(null);

  private readonly sections = ['home', 'about', 'services', 'work', 'contact'];
  private observer?: IntersectionObserver;
  private lastFocused: HTMLElement | null = null;

  ngAfterViewInit(): void {
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
    this.modalWork.set(work);
    // Defer focus until the dialog is in the DOM.
    setTimeout(() => {
      document.querySelector<HTMLElement>('.tcf-modal__close')?.focus();
    });
  }

  closeModal(): void {
    this.modalWork.set(null);
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
