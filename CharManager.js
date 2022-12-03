import { CharInput, CHAR_INPUT_STATUS, InvalidCharInputStatus } from './CharInput.js';

/**
 * Represents a class that manages the character input elements.
 */
export class CharManager {
    #charInputs = [];
    #alph;
    #prefiltered;
    /**
     * Create a new `CharManager`
     */
    constructor(words = 5, chars = 5, allowLetters = true, allowNumbers = false, parent = document.body) {
        const ALPH = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', NUMS = '1234567890';
        this.#alph = (allowLetters ? ALPH : '') + (allowNumbers ? NUMS : '');
        this.#prefiltered = this.#alph;
        for (let w = 0; w < words; w++) {
            const WORD_DIV = document.createElement('div');
            WORD_DIV.setAttribute('class', 'word');
            this.#charInputs[w] = [];
            for (let c = 0; c < chars; c++) {
                this.#charInputs[w][c] = new CharInput(this.#alph, WORD_DIV);
            }
            parent.appendChild(WORD_DIV);
        }
    }
    /**
     * Generate an array of characters that are valid for a certain position in the word.
     */
    generateValidCharsForPosition(c) {
        let alph = this.#prefiltered;
        for (let w in this.#charInputs) {
            const input = this.#charInputs[w][c];
            if (input instanceof CharInput) {
                if (input.hasValue()) {
                    switch (input.getStatus()) {
                        case (CHAR_INPUT_STATUS.CORRECT): {
                            return [input.getChar()];
                        }
                        case (CHAR_INPUT_STATUS.INCORRECT):
                        case (CHAR_INPUT_STATUS.INCORRECT_PLACEMENT): {
                            alph = alph.replace(input.getChar(), '');
                            break;
                        }
                        default: {
                            throw new InvalidCharInputStatus(input.getStatus());
                        }
                    }
                }
            } else {
                return [];
            }
        }
        return [...alph];
    }
    /**
     * Apply a pre-filter to the alphabet to get rid of characters that do not appear in the word.
     */
    prefilter() {
        this.#prefiltered = this.#alph;
        for (let w in this.#charInputs) {
            for (let c in this.#charInputs[w]) {
                const input = this.#charInputs[w][c];
                if (input instanceof CharInput && input.hasValue() && input.getStatus() === CHAR_INPUT_STATUS.INCORRECT) {
                    this.#prefiltered = this.#prefiltered.replace(input.getChar(), '');
                }
            }
        }
    }
    /**
     * Generate an array of characters that are required in the word but are not in the correct position.
     */
    getRequiredCharacters() {
        const req = [];
        for (let w in this.#charInputs) {
            for (let c in this.#charInputs[w]) {
                const input = this.#charInputs[w][c];
                if (input instanceof CharInput && input.hasValue() && input.getStatus() === CHAR_INPUT_STATUS.INCORRECT_PLACEMENT) {
                    req.push(input.getChar());
                }
            }
        }
        return req;
    }
    /**
     * Clear all user input.
     */
    clearInput() {
        for (let w in this.#charInputs) {
            for (let c in this.#charInputs[w]) {
                this.#charInputs[w][c].clear();
            }
        }
    }
}