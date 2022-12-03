import { CharManager } from './CharManager.js';

/**
 * Represents a class that can generate words from a `CharManager`
 */
export class WordGen {
    #charManager;
    #words;
    /**
     * Create a new instance of `WordGen`
     */
    constructor(charManager) {
        charManager instanceof CharManager && (this.#charManager = charManager);
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
}