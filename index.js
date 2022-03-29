'use strict';

window.onload = () => {
    const chars = [], wordIdx = 'abcde', charIdx = [1, 2, 3, 4, 5];
    for (let i in wordIdx) {
        chars[i] = [];
        for (let j in charIdx) {
            const id = wordIdx[i] + charIdx[j];
            chars[i][j] = document.getElementById(id);
        }
    }
    for (let i in chars) {
        for (let j in chars[i]) {
            chars[i][j].oninput = () => {
                chars[i][j].value = chars[i][j].value.toUpperCase();
            };
        }
    }
};