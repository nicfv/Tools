import { SMath } from 'smath';

export class Input {
    static #input_id = 0;
    #value = 0;
    constructor(parent = document.body, title = '', min = 0, max = 100, step = 1) {
        Input.#input_id++;
        const container = document.createElement('div'),
            input = document.createElement('input'),
            label = document.createElement('label'),
            inputId = 'input_' + Input.#input_id;
        container.setAttribute('class', 'input');
        input.setAttribute('id', 'input_' + inputId);
        input.setAttribute('type', 'number');
        input.setAttribute('title', title);
        input.setAttribute('placeholder', title);
        input.setAttribute('min', min);
        input.setAttribute('max', max);
        input.setAttribute('step', step);
        label.setAttribute('for', 'input_' + inputId);
        label.innerText = title;
        container.appendChild(input);
        container.appendChild(label);
        parent.appendChild(container);
        input.addEventListener('input', () => this.#value = SMath.clamp(+input.value, min, max));
    }
    getValue() {
        return this.#value;
    }
}