import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './legal-notice.html',
  styleUrls: ['./legal-notice.scss'],
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
