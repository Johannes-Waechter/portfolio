import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {

  p1 = 'info';
  p2 = 'example';
  p3 = 'com';

  get email() {
    return `${this.p1}@${this.p2}.${this.p3}`;
  }

  get mailto() {
    return `mailto:${this.email}`;
  }

}
