import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './portfolio.html',
  styleUrls: ['./portfolio.scss'],
})
export class Portfolio {
  projects = [
    {
      number: '01',
      title: 'Join',
      tags: 'Angular | TypeScript | HTML | CSS | Firebase',
      techs: ['Angular', 'TypeScript', 'HTML', 'CSS', 'Firebase'],
      preview: 'img/join-preview.png',
      dialogImage: 'portfolio/join.png',
      descriptionKey: 'PORTFOLIO.PROJECTS.JOIN.DESC',
      github: 'https://github.com/youruser/join',
      live: 'https://join.yourdomain.com',
    },
    {
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
      number: '03',
      title: 'CareShare',
      tags: 'Angular | Firebase | TypeScript | Material Design',
      techs: ['Angular', 'Firebase', 'TypeScript' , 'Material Design' ],
      preview: 'img/bubble-preview.png',
      dialogImage: 'portfolio/join.png',
      descriptionKey: 'PORTFOLIO.PROJECTS.CARESHARE.DESC',
      github: 'https://github.com/Johannes-Waechter/care-share-app',
      live: 'https://github.com/Johannes-Waechter/care-share-app',
    },
  ];


  previewIndex: number | null = null;
  dialogIndex: number | null = null;

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
    document.body.classList.add('dialog-open');
    document.body.style.overflow = 'hidden';
  }

  closeDialog() {
    this.dialogIndex = null;
    document.body.classList.remove('dialog-open');
    document.body.style.overflow = 'auto';
  }

  nextDialog(event: Event) {
    event.stopPropagation();
    if (this.dialogIndex !== null) {
      this.dialogIndex = (this.dialogIndex + 1) % this.projects.length;
    }
  }
}
