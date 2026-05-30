import { ChangeDetectionStrategy, Component, HostListener, signal } from '@angular/core';
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
    ></tcf-hero>
    <tcf-marquee></tcf-marquee>
    <tcf-mission-vision></tcf-mission-vision>
    <tcf-services></tcf-services>
    <tcf-works (selectWork)="modalWork.set($event)"></tcf-works>
    <tcf-cta (clicked)="scrollTo('contact')"></tcf-cta>
    <tcf-footer></tcf-footer>

    @if (modalWork(); as work) {
      <div class="tcf-modal-scrim" (click)="modalWork.set(null)">
        <div class="tcf-modal" (click)="$event.stopPropagation()">
          <div class="tcf-eyebrow-tag">{{ work.client }}</div>
          <h3 class="tcf-modal__title">{{ work.title }}</h3>
          <p class="tcf-modal__body">
            Full case study preview — film would open here in production.
          </p>
          <button class="tcf-btn tcf-btn--primary" (click)="modalWork.set(null)">Close</button>
        </div>
      </div>
    }
  `,
  styles: [`
    :host { display: block; }
    .tcf-modal-scrim {
      position: fixed; inset: 0; z-index: 100;
      background: rgba(0, 0, 0, 0.85);
      display: grid; place-items: center;
      backdrop-filter: blur(20px);
    }
    .tcf-modal {
      background: var(--ink-800);
      border: 1px solid var(--border-hairline);
      border-radius: 20px;
      padding: 40px;
      max-width: 560px;
      text-align: center;
    }
    .tcf-modal__title {
      font-family: var(--font-serif);
      font-style: italic;
      font-size: 40px;
      margin: 8px 0 24px;
      color: white;
    }
    .tcf-modal__body {
      color: var(--smoke-300);
      font-size: 15px;
      line-height: 1.6;
      margin-bottom: 32px;
    }
  `],
})
export class AppComponent {
  active = signal<string>('home');
  modalWork = signal<Work | null>(null);

  private readonly sections = ['home', 'work', 'services', 'about', 'contact'];

  scrollTo(id: string): void {
    this.active.set(id);
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const y = window.scrollY + 140;
    for (let i = this.sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(this.sections[i]);
      if (el && el.offsetTop <= y) {
        this.active.set(this.sections[i]);
        return;
      }
    }
  }
}
