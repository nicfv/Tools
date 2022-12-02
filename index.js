import { CharInput } from './CharInput.js';
import { CharManager } from './CharManager.js';
import { WordGen } from './WordGen.js';

let CM, WL;

window.onload = () => {
    CM = new CharManager(5, 5, true, false, document.getElementById('input'));
    WL = new WordGen(CM);

    const
        floater = document.getElementById('floater'),
        help = document.getElementById('help'),
        clearButton = document.getElementById('clear'),
        genButton = document.getElementById('gen'),
        words = document.getElementById('words'),
        numwords = document.getElementById('numwords');

    floater.onmouseover = () => {
        help.style.display = 'inline';
    };

    floater.onmouseleave = () => {
        help.style.display = 'none';
    };

    clearButton.onclick = () => {
        CM.clearInput();
        words.innerText = '';
        numwords.innerText = '';
    };

    genButton.onclick = () => {
        const list = WL.getList();
        let wordString = '';
        for (let i in list) {
            if (i % 5) {
                wordString += ' ';
            } else if (i > 0) {
                wordString += '\n';
            }
            wordString += list[i];
        }
        words.innerText = wordString;
        numwords.innerText = list.length + ' possible letter combinations';
    };
};