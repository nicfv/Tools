import { Input } from './input';
import { Button } from './button';
import { Dropdown } from './dropdown';

window.addEventListener('load', main);

function main(): void {
    console.log('loaded!');
    const b = new Input(document.body, 'test', -100, 100, 0.1);
    const c = new Button(document.body, 'Click!');
    c.onClick(() => b.clear());
    const d = new Dropdown(document.body, 'test1', [{ key: 'hello', value: 'one' }, { key: 'world', value: 'two' }]);
    d.onChange(v => console.log(v));
}