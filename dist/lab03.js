import { assignComponent } from './sections-assignment.js';
const element = document.querySelector('.app-cmp-main');
if (element) {
    console.debug(element);
    assignComponent(element);
}
