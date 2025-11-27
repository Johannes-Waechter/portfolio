
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from "@angular/router";
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit, OnDestroy {
  currentLanguage: 'en' | 'de' = 'en';
  showMenu = false;
  private translate = inject(TranslateService);
  private langSub: any;

  ngOnInit() {
    const lang = this.translate.currentLang || this.translate.getDefaultLang() || this.translate.getBrowserLang() || 'en';
    this.currentLanguage = lang.startsWith('de') ? 'de' : 'en';
    this.langSub = this.translate.onLangChange.subscribe((event: any) => {
      const l = event.lang;
      this.currentLanguage = l.startsWith('de') ? 'de' : 'en';
    });
  }

  ngOnDestroy() {
    if (this.langSub) this.langSub.unsubscribe();
  }

  useLanguage(lang: 'en' | 'de') {
    this.currentLanguage = lang;
    this.translate.use(lang);
    document.documentElement.classList.remove('language-en', 'language-de');
    document.documentElement.classList.add('language-' + lang);
  }
}
