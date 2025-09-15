import { Range } from './range';
import { Ring } from './ring';

console.log('Loaded!');
const form = document.getElementById('form')!;
const output = document.getElementById('output')!;
const color = new Range(form, 'Ring Color', { min: 0, max: 100, step: 1, val: 50 });
const size = new Range(form, 'Ring Size', { min: 0, max: 100, step: 1, val: 50 });
const curve = new Range(form, 'Throw was a curveball?', { min: 1, max: 2, step: 1, val: 1 });
const ring = new Ring(100, 5, document.body);
color.onChange(calculate);
size.onChange(calculate);
curve.onChange(calculate);
function calculate(): void {
    console.log(`Calculating with parameters: color=${color.getValue()}, size=${size.getValue()}, curve=${curve.getValue()}...`);
    ring.setColor(color.getValue() / 100);
    ring.setSize(size.getValue() / 100);
}
calculate();
