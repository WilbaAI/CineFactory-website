import { Directive, ElementRef, Input, OnDestroy, afterNextRender, inject } from '@angular/core';

/**
 * Reveal-on-scroll. Browser-only (afterNextRender) so prerender/SSR emit the
 * content plain + visible. On the client it adds `.tcf-reveal` (hidden state)
 * then toggles `.is-visible` when scrolled into view — once. Pass a stagger
 * index: `[tcfReveal]="$index"`. Disabled under `prefers-reduced-motion` via CSS.
 */
@Directive({
  selector: '[tcfReveal]',
  standalone: true,
})
export class RevealDirective implements OnDestroy {
  @Input('tcfReveal') order = 0;

  private readonly el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  constructor() {
    afterNextRender(() => {
      const node = this.el.nativeElement;
      node.classList.add('tcf-reveal');
      if (this.order) {
        node.style.setProperty('--reveal-delay', `${this.order * 90}ms`);
      }
      this.observer = new IntersectionObserver(
        (entries, obs) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              obs.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
      );
      this.observer.observe(node);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
