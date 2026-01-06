import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './portfolio.html',
  styleUrls: ['./portfolio.scss'],
})
export class Portfolio implements OnInit {
  projects = [
    {
      projectKey: 'join',
      number: '01',
      title: 'Join',
      tags: 'Angular | TypeScript | HTML | CSS | Firebase',
      techs: ['Angular', 'TypeScript', 'HTML', 'CSS', 'Firebase'],
      preview: 'portfolio/join.png',
      dialogImage: 'portfolio/join.png',
      descriptionKey: 'PORTFOLIO.PROJECTS.JOIN.DESC',
      github: 'https://github.com/Paulito12209/Join',
      live: 'https://johannes-waechter.de/Join/',
    },
    {
      projectKey: 'el-pollo-loco',
      number: '02',
      title: 'El-Pollo-Loco',
      tags: 'HTML | CSS | JavaScript',
      techs: ['JavaScript', 'HTML', 'CSS'],
      preview: 'img/pollo-preview.png',
      dialogImage: 'portfolio/el-pollo-loco.png',
      descriptionKey: 'PORTFOLIO.PROJECTS.EL_POLLO_LOCO.DESC',
      github: 'https://github.com/Johannes-Waechter/El_Pollo_Loco',
      live: 'https://johannes-waechter.de/El_Pollo_Loco/',
    },
    {
      projectKey: 'careshare',
      number: '03',
      title: 'CareShare',
      tags: 'Angular | Firebase | TypeScript | Material Design',
      techs: ['Angular', 'Firebase', 'TypeScript', 'Material Design'],
      preview: 'img/bubble-preview.png',
      dialogImage: 'portfolio/care-share.png',
      descriptionKey: 'PORTFOLIO.PROJECTS.CARESHARE.DESC',
      github: 'https://github.com/Johannes-Waechter/care-share-app',
      live: 'https://www.care-share.eu',
    },
  ];


  previewIndex: number | null = null;
  dialogIndex: number | null = null;
  private scrollLockY: number = 0;
  private preloadedImages: HTMLImageElement[] = [];

  getSkillIcon(tag: string): string {

    return 'portfolio/icons-skills/' + tag.toLowerCase().replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-') + '.svg';
  }

  showPreview(i: number) {
    this.previewIndex = i;
  }

  hidePreview() {
    this.previewIndex = null;
  }

  openDialog(i: number) {
    this.dialogIndex = i;
    this.scrollLockY = window.scrollY || window.pageYOffset || 0;
    document.body.classList.add('dialog-open');
    document.body.style.position = 'fixed';
    document.body.style.top = `-${this.scrollLockY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
  }

  closeDialog() {
    this.dialogIndex = null;
    document.body.classList.remove('dialog-open');
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    window.scrollTo({ top: this.scrollLockY, behavior: 'instant' as ScrollBehavior });
  }

  nextDialog(event: Event) {
    event.stopPropagation();
    if (this.dialogIndex !== null) {
      this.dialogIndex = (this.dialogIndex + 1) % this.projects.length;
    }
  }

  ngOnInit(): void {
    const hoverImages = [
      'portfolio/join.png',
      'portfolio/el-pollo-loco.png',
      'portfolio/care-share.png',
      'portfolio/Capa_1.svg',
    ];
    hoverImages.forEach(src => {
      const img = new Image();
      img.src = src;
      this.preloadedImages.push(img);
    });
  }
}
