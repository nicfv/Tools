import { Input } from './input.js';
import { Button } from './button.js';

window.addEventListener('load', main);

function main() {
    console.log('loaded!');
    const b = new Input(document.body, 'test', -100, 100, 0.1);
    const c = new Button(document.body, 'Click!');
    c.onClick(() => console.log(b.getValue()));
}