import { SMath } from 'smath';

export class Input {
    private static input_id: number = 0;
    private value: number = 0;
    constructor(parent: Element, title: string, min: number, max: number, step: number) {
        Input.input_id++;
        const container = document.createElement('div'),
            input = document.createElement('input'),
            label = document.createElement('label'),
            inputId = 'input_' + Input.input_id;
        container.setAttribute('class', 'input');
        input.setAttribute('id', 'input_' + inputId);
        input.setAttribute('type', 'number');
        input.setAttribute('title', title);
        input.setAttribute('placeholder', title);
        input.setAttribute('min', min.toString());
        input.setAttribute('max', max.toString());
        input.setAttribute('step', step.toString());
        label.setAttribute('for', 'input_' + inputId);
        label.innerText = title;
        container.appendChild(input);
        container.appendChild(label);
        parent.appendChild(container);
        input.addEventListener('input', () => this.value = SMath.clamp(+input.value, min, max));
    }
    public getValue(): number {
        return this.value;
    }
}