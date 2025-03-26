import { assignComponent as assignInputsComponent } from './input-components.js';

function createComponent(template: HTMLTemplateElement): HTMLElement {
    const node = template.content.cloneNode(true) as DocumentFragment;
    const element = node.firstElementChild as HTMLElement;
    if (!element) {
        throw new Error('Template must have a root element');
    }
    return element;
}

export function assignComponent(element: HTMLElement): void {
    const template = element.querySelector<HTMLTemplateElement>('template.app-tmpl-section');
    if (!template) {
        throw new Error('Template not found');
    }

    const container = template.parentElement;
    if (!container) {
        throw new Error('Container not found');
    }

    const updateSections = (): void => {
        const sections = Array.from(container.querySelectorAll<HTMLElement>('.app-cmp-section'));
        sections.forEach((section, index) => {
            const sectionNumberElement = section.parentElement?.querySelector('.app-section-title-no');
            if (sectionNumberElement) {
                sectionNumberElement.textContent = `Section ${index + 1}`;
            }

            const cmdRemoveSection = section.querySelector<HTMLButtonElement>('.app-cmd-remove-section');
            if (cmdRemoveSection) {
                cmdRemoveSection.disabled = sections.length === 1;
            }
        });
    };

    const removeSection = (sectionComponent: HTMLElement): void => {
        sectionComponent.remove();
    };

    const addComponent = (): void => {
        const sectionComponent = createComponent(template);
        container.append(sectionComponent);
        assignInputsComponent(sectionComponent);

        const removeButton = sectionComponent.querySelector<HTMLButtonElement>('.app-cmd-remove-section');
        if (removeButton) {
            removeButton.addEventListener('click', () => {
                removeSection(sectionComponent);
                updateSections();
            });
        }
        updateSections();
    };

    element.addEventListener('click', (ev: MouseEvent) => {
        const target = ev.target as HTMLElement;
        if (target?.matches('.app-cmd-add-section')) {
            addComponent();
        }
    });

    addComponent();
}