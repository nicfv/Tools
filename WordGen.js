import { CharManager } from './CharManager.js';
import { ALPH_TYPES } from './index.js';

/**
 * Represents a class that can generate words from a `CharManager`
 */
export class WordGen {
    #charManager;
    #words;
    /**
     * Create a new instance of `WordGen`
     */
    constructor(words = 0, chars = 0, alphType = 0, parent = document.body) {
        this.#charManager = new CharManager(words, chars,
            alphType === ALPH_TYPES.ALPH_ONLY || alphType === ALPH_TYPES.BOTH,
            alphType === ALPH_TYPES.NUMS_ONLY || alphType === ALPH_TYPES.BOTH,
            parent);
        this.#words = [];
    }
    /**
     * Return a list of all possible character combinations for the input specified.
     */
    getList() {
        this.#words = [];
        this.#charManager.prefilter();
        this.#buildWords();
        const requiredChars = this.#charManager.getRequiredCharacters();
        requiredChars.forEach(char => {
            this.#words = this.#words.filter(x => x.includes(char));
        });
        return this.#words;
    }
    /**
     * Generate the complete list of possible character combinations.
     */
    #buildWords(word = '', char = 0) {
        const chars = this.#charManager.generateValidCharsForPosition(char);
        if (!chars.length) {
            this.#words.push(word);
            return;
        }
        for (let c in chars) {
            this.#buildWords(word + chars[c], char + 1);
        }
    }
    /**
     * Clear all user input.
     */
    clearInput() {
        this.#charManager.clearInput();
    }
}