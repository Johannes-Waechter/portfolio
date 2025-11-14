import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feedback.html',
  styleUrls: ['./feedback.scss'],
})
export class Feedback {
  feedbacks = [
    { text: 'Our project benefited enormously from Lukas efficient way of working.', author: 'T.Schulz - Frontend Developer' },
    { text: 'Lukas has proven to be a reliable group partner. His technical skills and proactive approach were crucial to the success of our project.', author: 'H.Janisch - Team Partner' },
    { text: 'I had the good fortune of working with Simon...', author: 'A. Fischer - Team Partner' },
    { text: 'Working with Lukas in a group was a great experience. He is reliable, cool, and focused, and made our project a success. He\'s super easy to work with, and I\'d happily work with him again.', author: 'A. Fischer - Team Partner' },
  ];


  currentIndex = 0;
  direction: 'left' | 'right' = 'right';

  getCardClass(i: number): string {
    let base = '';
    if (i === this.currentIndex) base = 'feedback-card--center';
    else if (i === this.getLeftIndex()) base = 'feedback-card--left';
    else if (i === this.getRightIndex()) base = 'feedback-card--right';
    else base = '';
    if (base && this.direction === 'left') return base + ' slide-left';
    if (base && this.direction === 'right') return base + ' slide-right';
    return base;
  }

  isVisible(i: number): boolean {
    return (
      i === this.currentIndex ||
      i === this.getLeftIndex() ||
      i === this.getRightIndex()
    );
  }

  getLeftIndex(): number {
    return (this.currentIndex - 1 + this.feedbacks.length) % this.feedbacks.length;
  }

  getRightIndex(): number {
    return (this.currentIndex + 1) % this.feedbacks.length;
  }


  prev(): void {
    this.direction = 'left';
    this.currentIndex = (this.currentIndex - 1 + this.feedbacks.length) % this.feedbacks.length;
  }

  next(): void {
    this.direction = 'right';
    this.currentIndex = (this.currentIndex + 1) % this.feedbacks.length;
  }


  goTo(idx: number): void {
    if (idx === this.currentIndex) return;
    this.direction = idx > this.currentIndex ? 'right' : 'left';
    this.currentIndex = idx;
  }

  // Touch/Swipe Support
  private touchStartX = 0;
  private touchEndX = 0;

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe();
  }

  handleSwipe() {
    const delta = this.touchEndX - this.touchStartX;
    if (Math.abs(delta) > 50) {
      if (delta > 0) {
        this.prev();
      } else {
        this.next();
      }
    }
  }
}
