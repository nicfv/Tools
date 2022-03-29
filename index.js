'use strict';

let CM, WL;

window.onload = () => {
    CM = new CharManager('abcde', [1, 2, 3, 4, 5]);
    WL = new WordGen(CM);

    const genButton = document.getElementById('gen'),
        words = document.getElementById('words');

    genButton.onclick = () => {
        const list = WL.getList();
        words.innerText = '';
        for (let i in list) {
            if (i > 1e3) {
                break;
            }
            words.innerText += list[i] + '\n';
        }
    };
};