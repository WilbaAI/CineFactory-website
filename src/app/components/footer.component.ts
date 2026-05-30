import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tcf-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="tcf-footer">
      <div class="tcf-footer__grid">
        <div class="tcf-footer__brand">
          <img src="assets/logo-lockup-dark.png" alt="The Cine Factory" />
          <p>
            A creative marketing and media production company. We help brands stand out,
            grow faster, and connect deeply through cinematic storytelling.
          </p>
        </div>
        <div>
          <h5>Studio</h5>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#work">Our Work</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#">Process</a></li>
          </ul>
        </div>
        <div>
          <h5>Services</h5>
          <ul>
            <li><a href="#">AI Video Content</a></li>
            <li><a href="#">Video Production</a></li>
            <li><a href="#">Social Media</a></li>
            <li><a href="#">Digital Marketing</a></li>
          </ul>
        </div>
        <div>
          <h5>Get in touch</h5>
          <ul>
            <li><a href="mailto:hello@thecinefactory.com">hello&#64;thecinefactory.com</a></li>
            <li><a href="https://tiktok.com" target="_blank" rel="noreferrer">TikTok</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href="#">Colombo, Sri Lanka</a></li>
          </ul>
        </div>
      </div>
      <div class="tcf-footer__bottom">
        <div>© {{ year }} The Cine Factory. All rights reserved.</div>
        <div class="tcf-tagline-strip">
          Social Media <span class="pipe">|</span>
          Video Production <span class="pipe">|</span>
          Digital Marketing
        </div>
      </div>
    </footer>
  `,
  styles: [`.pipe { opacity: 0.35; margin: 0 8px; }`],
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
}
