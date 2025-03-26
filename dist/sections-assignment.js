import { assignComponent as assignInputsComponent } from './input-components.js';
function createComponent(template) {
    const node = template.content.cloneNode(true);
    const element = node.firstElementChild;
    if (!element) {
        throw new Error('Template must have a root element');
    }
    return element;
}
export function assignComponent(element) {
    const template = element.querySelector('template.app-tmpl-section');
    if (!template) {
        throw new Error('Template not found');
    }
    const container = template.parentElement;
    if (!container) {
        throw new Error('Container not found');
    }
    const updateSections = () => {
        const sections = Array.from(container.querySelectorAll('.app-cmp-section'));
        sections.forEach((section, index) => {
            const sectionNumberElement = section.parentElement?.querySelector('.app-section-title-no');
            if (sectionNumberElement) {
                sectionNumberElement.textContent = `Section ${index + 1}`;
            }
            const cmdRemoveSection = section.querySelector('.app-cmd-remove-section');
            if (cmdRemoveSection) {
                cmdRemoveSection.disabled = sections.length === 1;
            }
        });
    };
    const removeSection = (sectionComponent) => {
        sectionComponent.remove();
    };
    const addComponent = () => {
        const sectionComponent = createComponent(template);
        container.append(sectionComponent);
        assignInputsComponent(sectionComponent);
        const removeButton = sectionComponent.querySelector('.app-cmd-remove-section');
        if (removeButton) {
            removeButton.addEventListener('click', () => {
                removeSection(sectionComponent);
                updateSections();
            });
        }
        updateSections();
    };
    element.addEventListener('click', (ev) => {
        const target = ev.target;
        if (target?.matches('.app-cmd-add-section')) {
            addComponent();
        }
    });
    addComponent();
}
