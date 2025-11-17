
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
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
