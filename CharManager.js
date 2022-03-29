'use strict';

class CharManager {
    #charInputs = [];
    constructor(wordIdx, charIdx) {
        for (let i in wordIdx) {
            this.#charInputs[i] = [];
            for (let j in charIdx) {
                const id = wordIdx[i] + charIdx[j];
                this.#charInputs[i][j] = new CharInput(id);
            }
        }
    }

    generateValidCharsForPosition(k) {
        for (let i in this.#charInputs) {
            if (this.#charInputs[i][k].hasValue() && this.#charInputs[i][k].getStatus() === CHAR_INPUT_STATUS.CORRECT) {
                return [this.#charInputs[i][k].getChar()];
            }
        }
        const alph = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        for (let i in this.#charInputs) {
            if (this.#charInputs[i][k].hasValue() && this.#charInputs[i][k].getStatus() === CHAR_INPUT_STATUS.INCORRECT_PLACEMENT) {
                const findIdx = alph.indexOf(this.#charInputs[i][k].getChar());
                if (findIdx >= 0) {
                    alph.splice(findIdx, 1);
                }
            }
            for (let j in this.#charInputs[i]) {
                if (this.#charInputs[i][j].hasValue() && this.#charInputs[i][j].getStatus() === CHAR_INPUT_STATUS.INCORRECT) {
                    const findIdx = alph.indexOf(this.#charInputs[i][j].getChar());
                    if (findIdx >= 0) {
                        alph.splice(findIdx, 1);
                    }
                }
            }
        }
        return alph;
    }
}