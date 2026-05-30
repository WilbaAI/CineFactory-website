import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tcf-marquee',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="tcf-marquee">
      <div class="tcf-marquee__track">
        @for (item of loop; track $index) {
          <div class="tcf-marquee__item">
            <span>{{ item }}</span>
            <span class="dot"></span>
          </div>
        }
      </div>
    </div>
  `,
})
export class MarqueeComponent {
  private readonly items = [
    'Social Media',
    'Video Production',
    'Digital Marketing',
    'AI Content',
    'Storytelling',
    'Brand Strategy',
  ];
  readonly loop = [...this.items, ...this.items];
}
