import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

const cursorShadow = document.querySelector(".cursor-shadow") as HTMLElement | null;

document.addEventListener("mousemove", (e: MouseEvent) => {
  if (!cursorShadow) return; 

  const x = e.clientX;
  const y = e.clientY;

  cursorShadow.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
});
