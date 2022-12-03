import { CharManager } from './CharManager.js';
import { StateColors, TriSwitch } from './TriSwitch.js';

/**
 * Global
 */
let CM;

// Define default values
const DEFAULT_GUESSES = 5,
    DEFAULT_CHARS = 5;

/**
 * Return an HTML element given an `id`
 */
const el = id => document.getElementById(id);

// Entry point into the program
window.onload = () => {
    // Hide the user control panel
    el('control').hidden = true;

    // Build the setup menu
    const ALPH_SWITCH = new TriSwitch(55, 25, [
        new StateColors('#999', '#333', '#999', 'Alphabet (A-Z) Only'),
        new StateColors('#999', '#333', '#999', 'Numbers (0-9) Only'),
        new StateColors('#999', '#333', '#999', 'Numbers & Math'),
        new StateColors('#999', '#333', '#999', 'Alphabet & Numbers'),
    ], 1.5, 3.5, 0.5, true, el('alphtype'));

    ALPH_SWITCH.onclick = () => el('p_alphtype').textContent = ALPH_SWITCH.getStateDescription();
    el('p_alphtype').textContent = ALPH_SWITCH.getStateDescription();

    el('go').addEventListener('click', () => {
        CM = new CharManager(el('num_guesses').value || DEFAULT_GUESSES, el('num_chars').value || DEFAULT_CHARS, ALPH_SWITCH.getState(), el('input'));
        document.body.removeChild(el('setup'));
        el('control').hidden = false;
    });

    // Add event listeners to show help menu
    el('floater').addEventListener('mouseover', () => el('help').style.display = 'inline');
    el('floater').addEventListener('mouseleave', () => el('help').style.display = 'none');

    // Add control panel user input actions
    el('clear').addEventListener('click', () => {
        CM instanceof CharManager && CM.clearInput();
        el('words').textContent = '';
        el('numwords').textContent = '';
    });

    el('gen').addEventListener('click', () => {
        const list = CM instanceof CharManager && CM.generate();
        let wordString = '';
        for (let i in list) {
            if (i % 5) {
                wordString += ' ';
            } else if (i > 0) {
                wordString += '\n';
            }
            wordString += list[i];
        }
        el('words').textContent = wordString;
        el('numwords').textContent = list.length + ' possible letter combinations';
    });
};

/**
 * Represents the types of allowable characters in an alphabet.
 */
export const ALPH_TYPES = {
    ALPH_ONLY: 0,
    NUMS_ONLY: 1,
    NUMS_MATH: 2,
    ALPH_NUMS: 3,
};