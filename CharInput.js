import { StateColors, TriSwitch } from './TriSwitch.js';

export class CharInput {
    #element;
    #switch;
    constructor(allowedChars = '', parent = document.body) {
        const container = document.createElement('div'),
            switchDiv = document.createElement('div');
        container.setAttribute('class', 'CharInput');
        this.#element = document.createElement('input');
        this.#element.oninput = () => this.#element.value = (allowedChars.includes(this.#element.value.toUpperCase()) ? this.#element.value.toUpperCase() : '');
        this.#element.setAttribute('maxLength', '1');
        container.appendChild(this.#element);
        container.appendChild(switchDiv);
        parent.appendChild(container);
        this.#switch = new TriSwitch(40, 25, [
            new StateColors('#999', '#333', '#999'),
            new StateColors('#999', '#030', '#999'),
            new StateColors('#999', '#330', '#999')
        ], 1.5, 3.5, 0.5, true, switchDiv);
        this.#switch.onclick = () => this.#setColor();
        this.#setColor();
    }

    #setColor() {
        switch (this.getStatus()) {
            case (CHAR_INPUT_STATUS.CORRECT): {
                this.#element.style.backgroundColor = '#393';
                break;
            }
            case (CHAR_INPUT_STATUS.INCORRECT_PLACEMENT): {
                this.#element.style.backgroundColor = '#993';
                break;
            }
            case (CHAR_INPUT_STATUS.INCORRECT): {
                this.#element.style.backgroundColor = '#333';
                break;
            }
            default: {
                throw 'Invalid char input status: ' + this.getStatus();
            }
        }
    }

    hasValue() {
        return !!this.#element.value;
    }

    getChar() {
        return this.#element.value;
    }

    getStatus() {
        return this.#switch.getState();
    }

    clear() {
        this.#element.value = '';
        while (this.#switch.getState() !== CHAR_INPUT_STATUS.INCORRECT) {
            this.#switch.click();
        }
        this.#setColor();
    }
}

export const CHAR_INPUT_STATUS = {
    CORRECT: 1,
    INCORRECT_PLACEMENT: 2,
    INCORRECT: 0,
};