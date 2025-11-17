import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
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
      dialogImage: 'img/join-dialog.png',
      description: 'A Kanban project management tool inspired by Trello and Jira. Organize tasks, collaborate with your team, and track progress visually.',
      github: 'https://github.com/youruser/join',
      live: 'https://join.yourdomain.com',
    },
    {
      number: '02',
      title: 'El-Pollo-Loco',
      tags: 'HTML | CSS | JavaScript',
      techs: ['JavaScript', 'HTML', 'CSS'],
      preview: 'img/pollo-preview.png',
      dialogImage: 'img/pollo-dialog.png',
      description: 'Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco salsa to fight against the crazy hen.',
      github: 'https://github.com/youruser/el-pollo-loco',
      live: 'https://el-pollo-loco.yourdomain.com',
    },
    {
      number: '03',
      title: 'CareShare',
      tags: 'Angular | Firebase | TypeScript | Material Design',
      techs: ['Angular', 'Firebase', 'TypeScript'],
      preview: 'img/bubble-preview.png',
      dialogImage: 'img/bubble-dialog.png',
      description: 'A chat and collaboration platform for distributed agile teams. Real-time messaging, file sharing and more.',
      github: 'https://github.com/youruser/da-bubble',
      live: 'https://da-bubble.yourdomain.com',
    },
  ];

  previewIndex: number | null = null;
  dialogIndex: number | null = null;

  showPreview(i: number) {
    this.previewIndex = i;
  }

  hidePreview() {
    this.previewIndex = null;
  }

  openDialog(i: number) {
    this.dialogIndex = i;
  }

  closeDialog() {
    this.dialogIndex = null;
  }

  nextDialog(event: Event) {
    event.stopPropagation();
    if (this.dialogIndex !== null) {
      this.dialogIndex = (this.dialogIndex + 1) % this.projects.length;
    }
  }
}
