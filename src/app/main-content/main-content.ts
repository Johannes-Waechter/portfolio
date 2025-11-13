import { Component } from '@angular/core';
import { AboutMe } from './about-me/about-me';
import { Hero } from './hero/hero';
import { Skills } from './skills/skills';
import { Portfolio } from './portfolio/portfolio';
import { Contact } from './contact/contact';
import { Feedback } from './feedback/feedback';

@Component({
  selector: 'app-main-content',
  imports: [AboutMe,
    Hero,
    Skills,
    Portfolio,
    Feedback,
    Contact
  ],
  templateUrl: './main-content.html',
  styleUrl: './main-content.scss',
})
export class MainContent {

}
