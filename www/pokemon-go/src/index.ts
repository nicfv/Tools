import { Range } from './range';

console.log('Loaded!');
const form = document.getElementById('form')!;
const color = new Range(form, 'Ring Color', { min: 0, max: 100, step: 1, val: 50 });
const size = new Range(form, 'Ring Size', { min: 0, max: 100, step: 1, val: 50 });
const curve = new Range(form, 'Throw was a curveball?', { min: 0, max: 1, step: 1, val: 0 });
color.onChange(calculate);
size.onChange(calculate);
curve.onChange(calculate);
function calculate(): void {
    console.log('Calculating...');
}
calculate();
