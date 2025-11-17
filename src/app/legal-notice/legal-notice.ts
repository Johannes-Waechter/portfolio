import { Component } from '@angular/core';

@Component({
  selector: 'app-legal-notice',
  imports: [],
  templateUrl: './legal-notice.html',
  styleUrl: './legal-notice.scss',
})
export class LegalNotice {

  p1 = 'mail';
  p2 = 'johannes-waechter';
  p3 = 'de';

  get email() {
    return `${this.p1}@${this.p2}.${this.p3}`;
  }

  get mailto() {
    return `mailto:${this.email}`;
  }
}
