import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
  flicker: number;
  hue: number;
}

/**
 * Interactive ember field for the hero. Glowing sparks drift upward, a soft
 * glow trails the cursor, and embers scatter away from the pointer. Canvas +
 * requestAnimationFrame, run outside Angular (no change detection per frame),
 * paused when off-screen or the tab is hidden, and static under
 * prefers-reduced-motion.
 */
@Component({
  selector: 'tcf-ember-field',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<canvas #canvas class="tcf-ember-canvas" aria-hidden="true"></canvas>`,
  styles: [
    `
      :host {
        position: absolute;
        inset: 0;
        z-index: -1;
        pointer-events: none;
      }
      .tcf-ember-canvas {
        display: block;
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class EmberFieldComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true })
  private readonly canvasRef!: ElementRef<HTMLCanvasElement>;

  private readonly zone = inject(NgZone);
  private readonly host = inject(ElementRef<HTMLElement>);

  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private raf = 0;
  private w = 0;
  private h = 0;
  private dpr = 1;
  private readonly mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false };
  private observer?: IntersectionObserver;
  private onScreen = true;
  private reduced = false;

  ngAfterViewInit(): void {
    this.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    this.ctx = ctx;
    this.resize();
    this.seed();

    this.zone.runOutsideAngular(() => {
      window.addEventListener('resize', this.onResize, { passive: true });
      window.addEventListener('pointermove', this.onPointerMove, { passive: true });
      window.addEventListener('pointerout', this.onPointerOut, { passive: true });
      document.addEventListener('visibilitychange', this.onVisibility);

      if (this.reduced) {
        this.draw(); // one static frame
      } else {
        this.observer = new IntersectionObserver(
          (entries) => {
            this.onScreen = entries[0].isIntersecting;
            this.toggleLoop();
          },
          { threshold: 0 },
        );
        this.observer.observe(this.host.nativeElement);
        this.start();
      }
    });
  }

  ngOnDestroy(): void {
    this.stop();
    this.observer?.disconnect();
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('pointerout', this.onPointerOut);
    document.removeEventListener('visibilitychange', this.onVisibility);
  }

  // --- lifecycle helpers -----------------------------------------------------

  private toggleLoop(): void {
    if (this.reduced) return;
    if (this.onScreen && !document.hidden) this.start();
    else this.stop();
  }

  private start(): void {
    if (this.raf) return;
    const tick = () => {
      this.update();
      this.draw();
      this.raf = requestAnimationFrame(tick);
    };
    this.raf = requestAnimationFrame(tick);
  }

  private stop(): void {
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  // --- event handlers --------------------------------------------------------

  private readonly onResize = (): void => {
    this.resize();
    this.seed();
    if (this.reduced) this.draw();
  };

  private readonly onVisibility = (): void => this.toggleLoop();

  private readonly onPointerMove = (e: PointerEvent): void => {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    this.mouse.tx = x;
    this.mouse.ty = y;
    this.mouse.active = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
  };

  private readonly onPointerOut = (): void => {
    this.mouse.active = false;
  };

  // --- canvas ----------------------------------------------------------------

  private resize(): void {
    const canvas = this.canvasRef.nativeElement;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = canvas.clientWidth;
    this.h = canvas.clientHeight;
    canvas.width = Math.round(this.w * this.dpr);
    canvas.height = Math.round(this.h * this.dpr);
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  private seed(): void {
    const count = Math.max(24, Math.min(90, Math.round((this.w * this.h) / 14000)));
    this.particles = Array.from({ length: count }, (_, i) => this.spawn(i, true));
  }

  private spawn(seed: number, scatter: boolean): Particle {
    // Deterministic-ish jitter (no Math.random reliance for variety across i).
    const rnd = (n: number) => (((Math.sin(seed * 12.9898 + n * 78.233) * 43758.5453) % 1) + 1) % 1;
    return {
      x: rnd(1) * this.w,
      y: scatter ? rnd(2) * this.h : this.h + 12,
      vx: (rnd(3) - 0.5) * 0.3,
      vy: -(0.15 + rnd(4) * 0.5),
      r: 0.6 + rnd(5) * 2.2,
      a: 0.25 + rnd(6) * 0.6,
      flicker: rnd(7) * Math.PI * 2,
      hue: 8 + rnd(8) * 18, // red→orange ember hues
    };
  }

  private update(): void {
    // Ease the cursor glow toward the pointer.
    this.mouse.x += (this.mouse.tx - this.mouse.x) * 0.12;
    this.mouse.y += (this.mouse.ty - this.mouse.y) * 0.12;

    const R = 130;
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.flicker += 0.05;

      if (this.mouse.active) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < R * R && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const f = (1 - d / R) * 1.6;
          p.x += (dx / d) * f;
          p.y += (dy / d) * f;
        }
      }

      if (p.y < -12 || p.x < -20 || p.x > this.w + 20) {
        this.particles[i] = this.spawn(i + p.flicker, false);
      }
    }
  }

  private draw(): void {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.w, this.h);
    ctx.globalCompositeOperation = 'lighter';

    // Cursor glow.
    if (this.mouse.active) {
      const g = ctx.createRadialGradient(
        this.mouse.x,
        this.mouse.y,
        0,
        this.mouse.x,
        this.mouse.y,
        180,
      );
      g.addColorStop(0, 'rgba(229, 52, 42, 0.22)');
      g.addColorStop(0.5, 'rgba(229, 52, 42, 0.08)');
      g.addColorStop(1, 'rgba(229, 52, 42, 0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, this.w, this.h);
    }

    // Embers.
    for (const p of this.particles) {
      const a = p.a * (0.6 + 0.4 * Math.sin(p.flicker));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 2.6, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 95%, 58%, ${a * 0.18})`;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue + 6}, 100%, 70%, ${a})`;
      ctx.fill();
    }

    ctx.globalCompositeOperation = 'source-over';
  }
}
