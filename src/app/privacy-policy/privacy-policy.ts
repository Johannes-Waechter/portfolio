import { Component, Inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="privacy-policy-section">
      <h1>Datenschutzerklärung / Privacy Policy</h1>
      <ng-container *ngIf="currentLang === 'de' && deHtml; else enBlock">
        <div class="privacy-policy-content" [innerHTML]="deHtml"></div>
      </ng-container>
      <ng-template #enBlock>
        <div class="privacy-policy-content" [innerHTML]="enHtml"></div>
      </ng-template>
    </section>
  `,
  styleUrls: ['./privacy-policy.scss'],
})
export class PrivacyPolicy {
  currentLang = 'de';
  deHtml = '';
  enHtml = '';
  private readonly baseHref: string;
  constructor(private translate: TranslateService, @Inject(DOCUMENT) private document: Document, private cdr: ChangeDetectorRef) {
    this.currentLang = this.translate.currentLang || this.translate.getDefaultLang() || 'de';
    const baseTag = this.document.getElementsByTagName('base')[0];
    this.baseHref = baseTag?.getAttribute('href') || '/';
    this.preloadHtml();
    this.translate.onLangChange.subscribe(lang => {
      this.currentLang = lang.lang;
      
    });
  }

  async preloadHtml() {
    try {
      const base = this.baseHref || './';

      const deUrl = `${base}static/privacy/privacy-policy.de.html`;
      const enUrl = `${base}static/privacy/privacy-policy.en.html`;

      const [deRes, enRes] = await Promise.all([
        fetch(deUrl, { cache: 'no-store' }),
        fetch(enUrl, { cache: 'no-store' })
      ]);

      if (deRes.ok) {
        this.deHtml = await deRes.text();
      } else {
        console.error('Failed to load DE policy:', deRes.status);
        this.deHtml = '<p>Die Datenschutzerklärung konnte nicht geladen werden.</p>';
      }

      if (enRes.ok) {
        this.enHtml = await enRes.text();
      } else {
        console.error('Failed to load EN policy:', enRes.status);
        this.enHtml = '<p>Privacy policy could not be loaded.</p>';
      }
      this.cdr.markForCheck();
    } catch (e) {
      console.error('Failed to load privacy policy HTML:', e);
      this.deHtml = this.deHtml || '<p>Die Datenschutzerklärung konnte nicht geladen werden.</p>';
      this.enHtml = this.enHtml || '<p>Privacy policy could not be loaded.</p>';
    }
  }
}