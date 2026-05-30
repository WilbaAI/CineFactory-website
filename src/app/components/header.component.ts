import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface NavLink {
  id: string;
  label: string;
}

@Component({
  selector: 'tcf-header',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="tcf-nav">
      <a class="tcf-nav__logo" href="#" (click)="onClick($event, 'home')">
        <img src="assets/logo-full.png" alt="The Cine Factory" width="454" height="176" />
      </a>
      <nav class="tcf-nav__links">
        @for (link of links; track link.id) {
          <a
            class="tcf-nav__link"
            [class.is-active]="active === link.id"
            [href]="'#' + link.id"
            (click)="onClick($event, link.id)"
            >{{ link.label }}</a
          >
        }
      </nav>
      <a href="#contact" class="tcf-btn tcf-btn--primary" (click)="onClick($event, 'contact')">
        Start a project
      </a>
    </header>
  `,
})
export class HeaderComponent {
  @Input() active = 'home';
  @Output() navigate = new EventEmitter<string>();

  readonly links: NavLink[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'work', label: 'Our Work' },
    { id: 'contact', label: 'Contact' },
  ];

  onClick(event: Event, id: string): void {
    event.preventDefault();
    this.navigate.emit(id);
  }
}
