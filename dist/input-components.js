function createComponent(template) {
    const node = template.content.cloneNode(true);
    const element = node.firstElementChild;
    if (!element) {
        throw new Error('Template must have a root element');
    }
    return element;
}
export function assignComponent(element) {
    const template = element.querySelector('template.app-tmpl-input');
    if (!template) {
        throw new Error('template.app-tmpl-input not found');
    }
    const container = template.parentElement;
    if (!container) {
        throw new Error('cannot find template element');
    }
    const updateInputComponents = () => {
        const inputComponents = container.querySelectorAll('.app-cmp-input');
        inputComponents.forEach((component, index) => {
            component.querySelectorAll('.app-elem-title-no')
                .forEach(titleNo => titleNo.textContent = `${index + 1}`);
            component.querySelectorAll('.app-cmd-remove-input')
                .forEach(cmdRemoveInput => cmdRemoveInput.disabled = inputComponents.length === 1);
        });
    };
    const calculateResult = () => {
        const result = Array.from(container.querySelectorAll('.app-cmp-input'))
            .map(component => component.querySelector('input[type="number"].app-elem-input'))
            .filter((input) => input !== null)
            .reduce((sum, input) => sum + input.valueAsNumber, 0);
        element.querySelectorAll('output.app-elem-result')
            .forEach(output => output.value = result.toLocaleString());
    };
    const appendInputComponent = () => {
        const inputComponent = createComponent(template);
        inputComponent.addEventListener('click', (ev) => {
            const target = ev.target;
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
    element.addEventListener('click', (ev) => {
        const target = ev.target;
        if (target?.matches('.app-cmd-add-input')) {
            appendInputComponent();
        }
    });
    container.addEventListener('change', (ev) => {
        const target = ev.target;
        if (target?.matches('input[type="number"].app-elem-input')) {
            calculateResult();
        }
    });
}
