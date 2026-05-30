import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tcf-marquee',
  standalone: true,
  imports: [CommonModule],
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
