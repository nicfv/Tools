import { prefixes, Quantity, Unit, units } from 'dimensional';
import { NamedUnit, Pair } from './types';

window.addEventListener('load', main);

const allUnits: Array<NamedUnit> = [];
const selectedUnit: Pair<Unit> = {
    input: units.Unitless,
    output: units.Unitless,
};
const vals: Pair<number> = {
    input: 0,
    output: 0,
};
const currentUnits: Pair<Unit> = {
    input: units.Unitless,
    output: units.Unitless,
};

function main(): void {
    console.log('Loaded!');
    addUnits();
    setUnitOptions('input-unit-select');
    setUnitOptions('output-unit-select');
    setupListeners();
}

function addUnits(): void {
    console.log('Generating units...');
    const entryToNamedUnit = (entry: [string, Unit]): NamedUnit => {
        return {
            name: entry[0],
            unit: entry[1],
        }
    };
    allUnits.push(...Object.entries(units).map(entryToNamedUnit));
    allUnits.push({ name: 'ton', unit: new Unit('ton', units.poundMass, 2000) });
    allUnits.push({ name: 'micron', unit: units.meter.prefix(prefixes.micro) });
    allUnits.push({ name: 'nanometer', unit: units.meter.prefix(prefixes.nano) });
    allUnits.push({ name: 'milligram', unit: units.gram.prefix(prefixes.milli) });
    allUnits.push({ name: 'kiloNewton', unit: units.Newton.prefix(prefixes.kilo) });
    allUnits.push({ name: 'kilowatt', unit: units.watt.prefix(prefixes.kilo) });
    allUnits.sort((a, b) => a.name.localeCompare(b.name));
}

function setUnitOptions(elementId: string): void {
    console.log('Adding units to ' + elementId + '...');
    const unitSelect: HTMLSelectElement = document.getElementById(elementId) as HTMLSelectElement;
    for (const namedUnit of allUnits) {
        const unitOption: HTMLOptionElement = document.createElement('option');
        unitOption.textContent = namedUnit.name;
        unitSelect.appendChild(unitOption);
    }
    unitSelect.value = 'Unitless';
    unitSelect.addEventListener('input', () => {
        const selected: Unit = allUnits.find(v => v.name === unitSelect.value)!.unit;
        if (elementId.startsWith('input')) {
            selectedUnit.input = selected;
        } else if (elementId.startsWith('output')) {
            selectedUnit.output = selected;
        }
    });
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
    const conversion: HTMLParagraphElement = document.getElementById('conversion') as HTMLParagraphElement;
    function refresh(): void {
        quantities.input.textContent = '$$' + new Quantity(vals.input, currentUnits.input).toString() + '$$';
    }
    clears.input.addEventListener('click', () => {
        // unitSelects.input.selectedIndex = 0;
        unitExponents.input.value = '';
        quantityValues.input.value = '';
        refresh();
    });
}