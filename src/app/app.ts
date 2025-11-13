import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { MainContent } from './main-content/main-content';
import { LegalNotice } from './legal-notice/legal-notice';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    Header, Footer, 
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('portfolio');
}
