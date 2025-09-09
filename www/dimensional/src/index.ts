import { Quantity, Unit, units } from 'dimensional';
import * as SMath from 'smath';
import { Pair } from './types';
import * as Program from './program';

/**
 * https://www.mathjax.org/
 */
declare const MathJax: any;

window.addEventListener('load', main);

function main(): void {
    console.log('Loaded!');
    setUnitOptions('unit-select');
    setupListeners();
}

function setUnitOptions(elementId: string): void {
    console.log('Adding units to ' + elementId + '...');
    const unitSelect: HTMLSelectElement = document.getElementById(elementId) as HTMLSelectElement;
    for (const namedUnit of Program.getUnitNames()) {
        const unitOption: HTMLOptionElement = document.createElement('option');
        unitOption.textContent = namedUnit;
        unitSelect.appendChild(unitOption);
    }
    unitSelect.value = 'Unitless';
}

function setupListeners(): void {
    console.log('Setting up listeners...');
    document.getElementById('close')?.addEventListener('click', () => {
        const instructions: HTMLElement = document.getElementById('instructions')!;
        instructions.parentElement?.removeChild(instructions);
    });
    const clears: Pair<HTMLButtonElement> = {
        input: document.getElementById('input-clear') as HTMLButtonElement,
        output: document.getElementById('output-clear') as HTMLButtonElement,
    };
    const multipliers: Pair<HTMLButtonElement> = {
        input: document.getElementById('input-multiply') as HTMLButtonElement,
        output: document.getElementById('output-multiply') as HTMLButtonElement,
    };
    const unitSelects: Pair<HTMLSelectElement> = {
        input: document.getElementById('input-unit-select') as HTMLSelectElement,
        output: document.getElementById('output-unit-select') as HTMLSelectElement,
    };
    const unitExponents: Pair<HTMLInputElement> = {
        input: document.getElementById('input-exponent') as HTMLInputElement,
        output: document.getElementById('output-exponent') as HTMLInputElement,
    };
    const quantityValues: Pair<HTMLInputElement> = {
        input: document.getElementById('input-quantity-value') as HTMLInputElement,
        output: document.getElementById('output-quantity-value') as HTMLInputElement,
    };
    const quantities: Pair<HTMLParagraphElement> = {
        input: document.getElementById('input-quantity') as HTMLParagraphElement,
        output: document.getElementById('output-quantity') as HTMLParagraphElement,
    };
    const dimensions: Pair<HTMLParagraphElement> = {
        input: document.getElementById('input-dimensions') as HTMLParagraphElement,
        output: document.getElementById('output-dimensions') as HTMLParagraphElement,
    };
    const swap: HTMLButtonElement = document.getElementById('swap') as HTMLButtonElement;
    const conversion: HTMLParagraphElement = document.getElementById('conversion') as HTMLParagraphElement;
    function refresh(): void {
        Program.quantities.input = new Quantity(+quantityValues.input.value, Program.currentUnits.input);
        try {
            Program.quantities.output = Program.quantities.input.as(Program.currentUnits.output);
            quantityValues.output.value = Program.quantities.output.quantity.toString();
            const conversionFactor: number = Program.currentUnits.input.to(Program.currentUnits.output);
            if (conversionFactor >= 1) {
                conversion.textContent = '$$\\text{in} \\times ' + SMath.round2(conversionFactor, 0.01) + ' = \\text{out}$$';
            } else {
                conversion.textContent = '$$\\text{in} \\div ' + SMath.round2(1 / conversionFactor, 0.01) + ' = \\text{out}$$';
            }
        } catch {
            Program.quantities.output = new Quantity(0, Program.currentUnits.output);
            quantityValues.output.value = '';
            conversion.textContent = '$$\\dim(\\text{in}) \\ne \\dim(\\text{out})$$';
        }
        quantities.input.textContent = '$$\\text{in} = ' + Program.quantities.input.toString() + '$$';
        quantities.output.textContent = '$$\\text{out} = ' + Program.quantities.output.toString() + '$$';
        dimensions.input.textContent = '$$\\dim(\\text{in}) = ' + Program.quantities.input.units.dimensions.toString() + '$$';
        dimensions.output.textContent = '$$\\dim(\\text{out}) = ' + Program.quantities.output.units.dimensions.toString() + '$$';
        MathJax.typeset();
    }
    clears.input.addEventListener('click', () => {
        unitExponents.input.value = '';
        quantityValues.input.value = '';
        Program.currentUnits.input = units.Unitless;
        refresh();
    });
    clears.output.addEventListener('click', () => {
        unitExponents.output.value = '';
        quantityValues.output.value = '';
        Program.currentUnits.output = units.Unitless;
        refresh();
    });
    multipliers.input.addEventListener('click', () => {
        const selectedUnit: Unit = Program.getUnitByName(unitSelects.input.value);
        const exponent: number = +unitExponents.input.value;
        Program.currentUnits.input = Program.currentUnits.input.times(selectedUnit.pow(exponent));
        refresh();
    });
    multipliers.output.addEventListener('click', () => {
        const selectedUnit: Unit = Program.getUnitByName(unitSelects.output.value);
        const exponent: number = +unitExponents.output.value;
        Program.currentUnits.output = Program.currentUnits.output.times(selectedUnit.pow(exponent));
        refresh();
    });
    swap.addEventListener('click', () => {
        Program.swapPair(Program.currentUnits);
        refresh();
    });
    quantityValues.input.addEventListener('input', refresh);
    quantityValues.output.addEventListener('input', refresh);
    refresh();
}