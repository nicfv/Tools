'use strict';

class WordGen {
    #charManager;
    constructor(charManager) {
        this.#charManager = charManager;
    }

    getList() {
        let i = 0,
            c1 = this.#charManager.generateValidCharsForPosition(0),
            c2 = this.#charManager.generateValidCharsForPosition(1),
            c3 = this.#charManager.generateValidCharsForPosition(2),
            c4 = this.#charManager.generateValidCharsForPosition(3),
            c5 = this.#charManager.generateValidCharsForPosition(4),
            wordList = [];
        for (let i1 in c1) {
            for (let i2 in c2) {
                for (let i3 in c3) {
                    for (let i4 in c4) {
                        for (let i5 in c5) {
                            wordList[i++] = c1[i1] + c2[i2] + c3[i3] + c4[i4] + c5[i5];
                        }
                    }
                }
            }
        }
        const requiredChars = this.#charManager.getRequiredCharacters();
        for (let i in requiredChars) {
            wordList = wordList.filter(x => x.includes(requiredChars[i]));
        }
        return wordList;
    }
}