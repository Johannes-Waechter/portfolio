import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {

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
