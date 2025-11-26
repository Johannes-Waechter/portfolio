import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../shared/header/header';
import { Footer } from '../shared/footer/footer';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [Header, Footer, CommonModule],
  template: `
    <ng-container *ngIf="currentLang === 'de'; else enPolicy">
      <ng-container *ngTemplateOutlet="dePolicy"></ng-container>
    </ng-container>
    <ng-template #enPolicy>
      <ng-container *ngTemplateOutlet="enPolicyTemplate"></ng-container>
    </ng-template>
    <ng-template #dePolicy>
      <div [innerHTML]="deHtml"></div>
    </ng-template>
    <ng-template #enPolicyTemplate>
      <div [innerHTML]="enHtml"></div>
    </ng-template>
  `,
  styleUrls: ['./privacy-policy.scss'],
})
export class PrivacyPolicy {
  currentLang = 'de';
  deHtml = '';
  enHtml = '';
  constructor(private translate: TranslateService) {
    this.currentLang = this.translate.currentLang;
    this.loadHtml();
    this.translate.onLangChange.subscribe(lang => {
      this.currentLang = lang.lang;
      this.loadHtml();
    });
  }

  async loadHtml() {
    if (this.currentLang === 'de') {
      this.deHtml = await fetch('/privacy-policy/privacy-policy.de.html').then(r => r.text());
    } else {
      this.enHtml = await fetch('/privacy-policy/privacy-policy.en.html').then(r => r.text());
    }
  }
}