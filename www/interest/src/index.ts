import { Input } from './input';
import { Button } from './button';

window.addEventListener('load', main);

function main(): void {
    console.log('loaded!');
    const b = new Input(document.body, 'test', -100, 100, 0.1);
    const c = new Button(document.body, 'Click!');
    c.onClick(() => b.clear());
}