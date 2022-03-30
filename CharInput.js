'use strict';

class CharInput {
    #element;
    #status;
    constructor(id) {
        this.#element = document.getElementById(id);
        this.#element.oninput = () => {
            this.#element.value = this.#element.value.toUpperCase();
        };
        // Set the default status to incorrect.
        this.#status = CHAR_INPUT_STATUS.INCORRECT;
        this.#element.style.backgroundColor = '#333';
        this.#element.ondblclick = () => {
            switch (this.#status) {
                case (CHAR_INPUT_STATUS.CORRECT): {
                    this.#status = CHAR_INPUT_STATUS.INCORRECT_PLACEMENT;
                    break;
                }
                case (CHAR_INPUT_STATUS.INCORRECT_PLACEMENT): {
                    this.#status = CHAR_INPUT_STATUS.INCORRECT;
                    break;
                }
                case (CHAR_INPUT_STATUS.INCORRECT): {
                    this.#status = CHAR_INPUT_STATUS.CORRECT;
                    break;
                }
                default: {
                    throw 'Invalid char input status.';
                }
            }
            this.#setColor();
        };
    }

    #setColor() {
        switch (this.#status) {
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
                throw 'Invalid char input status.';
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
        return this.#status;
    }

    clear() {
        this.#element.value = '';
        this.#status = CHAR_INPUT_STATUS.INCORRECT;
        this.#setColor();
    }
}

const CHAR_INPUT_STATUS = {
    CORRECT: 0,
    INCORRECT_PLACEMENT: 1,
    INCORRECT: 2,
};