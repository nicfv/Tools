import { Input } from './input.js';

window.addEventListener('load', main);

function main() {
    console.log('loaded!');
    const b = new Input(document.body, 'test');
}