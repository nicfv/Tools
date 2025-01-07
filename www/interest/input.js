export class Input {
    static #input_id = 0;
    #value = 0;
    constructor(parent = document.body, title = '') {
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
        label.setAttribute('for', 'input_' + inputId);
        label.innerText = title;
        container.appendChild(input);
        container.appendChild(label);
        parent.appendChild(container);
        input.addEventListener('input', () => this.#value = input.value);
    }
    getValue() {
        return this.#value;
    }
}