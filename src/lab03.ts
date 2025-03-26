import { assignComponent } from './sections-assignment.js';

const element = document.querySelector<HTMLElement>('.app-cmp-main');
if (element) {
  console.debug(element);
  assignComponent(element);
}

