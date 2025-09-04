import { prefixes, Unit, units } from 'dimensional';
import { NamedUnit } from './types';

window.addEventListener('load', main);

const selectedUnit: { [key: string]: Unit } = {};
const allUnits: Array<NamedUnit> = [];

function main(): void {
    console.log('Loaded!');
    addUnits();
    setUnitOptions('input-unit-select');
    setUnitOptions('output-unit-select');
}

function addUnits(): void {
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
    const unitSelect: HTMLSelectElement = document.getElementById(elementId) as HTMLSelectElement;
    for (const namedUnit of allUnits) {
        const unitOption: HTMLOptionElement = document.createElement('option');
        unitOption.textContent = namedUnit.name;
        unitSelect.appendChild(unitOption);
    }
    unitSelect.selectedIndex = 0;
    unitSelect.addEventListener('input', () => {
        selectedUnit[elementId] = allUnits.find(v => v.name === unitSelect.value)!.unit;
    });
}