import { CharManager } from './CharManager.js';

export class WordGen {
    #charManager;
    #words;
    constructor(charManager) {
        charManager instanceof CharManager && (this.#charManager = charManager);
        this.#words = [];
    }

    getList() {
        this.#words = [];
        this.#buildWords();
        const requiredChars = this.#charManager.getRequiredCharacters();
        requiredChars.forEach(char => {
            this.#words = this.#words.filter(x => x.includes(char));
        });
        return this.#words;
    }

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