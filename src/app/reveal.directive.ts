import { Directive, ElementRef, Input, OnDestroy, OnInit, inject } from '@angular/core';

/**
 * Reveal-on-scroll. Adds `.tcf-reveal` immediately (hidden state) and toggles
 * `.is-visible` when the element scrolls into view — once, then stops observing.
 * Pass a stagger index: `[tcfReveal]="$index"`. Motion is CSS-only and disabled
 * under `prefers-reduced-motion` (the element just shows).
 */
@Directive({
  selector: '[tcfReveal]',
  standalone: true,
})
export class RevealDirective implements OnInit, OnDestroy {
  @Input('tcfReveal') order = 0;

  private readonly el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
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
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
