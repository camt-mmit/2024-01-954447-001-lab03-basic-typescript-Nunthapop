function createComponent(template: HTMLTemplateElement): HTMLElement {
    const node = template.content.cloneNode(true) as DocumentFragment;
    const element = node.firstElementChild as HTMLElement;
    if (!element) {
        throw new Error('Template must have a root element');
    }
    return element;
}

export function assignComponent(element: HTMLElement): void {
    const template = element.querySelector<HTMLTemplateElement>('template.app-tmpl-input');
    if (!template) {
        throw new Error('template.app-tmpl-input not found');
    }

    const container = template.parentElement;
    if (!container) {
        throw new Error('cannot find template element');
    }

    const updateInputComponents = (): void => {
        const inputComponents = container.querySelectorAll<HTMLElement>('.app-cmp-input');
        inputComponents.forEach((component, index) => {
            component.querySelectorAll<HTMLElement>('.app-elem-title-no')
                .forEach(titleNo => titleNo.textContent = `${index + 1}`);

            component.querySelectorAll<HTMLButtonElement>('.app-cmd-remove-input')
                .forEach(cmdRemoveInput => cmdRemoveInput.disabled = inputComponents.length === 1);
        });
    };

    const calculateResult = (): void => {
        const result = Array.from(container.querySelectorAll<HTMLElement>('.app-cmp-input'))
            .map(component => component.querySelector<HTMLInputElement>('input[type="number"].app-elem-input'))
            .filter((input): input is HTMLInputElement => input !== null)
            .reduce((sum, input) => sum + input.valueAsNumber, 0);

        element.querySelectorAll<HTMLOutputElement>('output.app-elem-result')
            .forEach(output => output.value = result.toLocaleString());
    };

    const appendInputComponent = (): void => {
        const inputComponent = createComponent(template);
        
        inputComponent.addEventListener('click', (ev: MouseEvent) => {
            const target = ev.target as HTMLElement;
            if (target?.matches('.app-cmd-remove-input')) {
                inputComponent.remove();
                updateInputComponents();
                calculateResult();
            }
        });

        container.append(inputComponent);
        updateInputComponents();
        calculateResult();
    };

    element.addEventListener('click', (ev: MouseEvent) => {
        const target = ev.target as HTMLElement;
        if (target?.matches('.app-cmd-add-input')) {
            appendInputComponent();
        }
    });

    container.addEventListener('change', (ev: Event) => {
        const target = ev.target as HTMLElement;
        if (target?.matches('input[type="number"].app-elem-input')) {
            calculateResult();
        }
    });
}