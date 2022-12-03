import { StateColors, TriSwitch } from './TriSwitch.js';

/**
 * Represents a control that allows a user to input a single character.
 */
export class CharInput {
    #element;
    #switch;
    /**
     * Create a new `CharInput` and append it to the parent element.
     */
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
    /**
     * Paint the color of this element.
     */
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
    /**
     * Determine whether this input has a value entered.
     */
    hasValue() {
        return !!this.#element.value;
    }
    /**
     * Return the value entered into this input.
     */
    getChar() {
        return this.#element.value;
    }
    /**
     * Return the status of this input.
     */
    getStatus() {
        return this.#switch.getState();
    }
    /**
     * Clear the data in this input.
     */
    clear() {
        this.#element.value = '';
        while (this.#switch.getState() !== CHAR_INPUT_STATUS.INCORRECT) {
            this.#switch.click();
        }
        this.#setColor();
    }
}

/**
 * Represents the statuses for character input.
 */
export const CHAR_INPUT_STATUS = {
    CORRECT: 1,
    INCORRECT_PLACEMENT: 2,
    INCORRECT: 0,
};