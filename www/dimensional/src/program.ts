import { prefixes, Quantity, Unit, units } from 'dimensional';
import { NamedUnit, Pair } from './types';

/**
 * Available units to select from
 */
export const allUnits: Array<NamedUnit> = [];
/**
 * Currently selected unit
 */
export const selectedUnit: Pair<Unit> = {
    input: units.Unitless,
    output: units.Unitless,
};
/**
 * Active unit
 */
export const currentUnits: Pair<Unit> = {
    input: units.Unitless,
    output: units.Unitless,
};
/**
 * Active quantities
 */
export const quantities: Pair<Quantity> = {
    input: new Quantity(0, units.Unitless),
    output: new Quantity(0, units.Unitless),
};

/**
 * Convert an object entry into a `NamedUnit`
 */
function entryToNamedUnit(entry: [string, Unit]): NamedUnit {
    return {
        name: entry[0],
        unit: entry[1],
    };
}

// Add custom units and convert to NamedUnit
allUnits.push(...Object.entries(units).map(entryToNamedUnit));
allUnits.push({ name: 'ton', unit: new Unit('ton', units.poundMass, 2000) });
allUnits.push({ name: 'micron', unit: units.meter.prefix(prefixes.micro) });
allUnits.push({ name: 'nanometer', unit: units.meter.prefix(prefixes.nano) });
allUnits.push({ name: 'milligram', unit: units.gram.prefix(prefixes.milli) });
allUnits.push({ name: 'kiloNewton', unit: units.Newton.prefix(prefixes.kilo) });
allUnits.push({ name: 'kilowatt', unit: units.watt.prefix(prefixes.kilo) });
allUnits.sort((a, b) => a.name.localeCompare(b.name));
