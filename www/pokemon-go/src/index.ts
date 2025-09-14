import { Dropdown, DropdownItem } from './dropdown';
import { Input } from './range';

window.addEventListener('load', main);

function main(): void {
    console.log('Loaded!');
    const form = document.getElementById('form')!,
        output = document.getElementById('output')!,
        BCR = new Input(form, 'Base Capture Rate [0-100%]', true, { min: 0, max: 100, step: 0.5 }),
        CPM = new Input(form, 'CP Multiplier [0.094-0.8653]', true, { min: 0.094, max: 0.8653, step: 0.0001 }),
        ball = new Dropdown(form, 'Ball Type', BallType),
        berry = new Dropdown(form, 'Berry Type', BerryType),
        throwtype = new Dropdown(form, 'Throw Modifier', ThrowType),
        curve = new Dropdown(form, 'Throw Style', CurveType),
        medal = new Dropdown(form, 'Type-Specific Medal', MedalType),
        encounter = new Dropdown(form, 'Encounter Type', EncounterType),
        rate = new Input(output, 'Catch Rate [0-100%]', false, { min: 0, max: 100, step: 0.125 });
    BCR.setValue(20);
    CPM.setValue(0.64);
    BCR.onChange(calculate);
    CPM.onChange(calculate);
    ball.onChange(calculate);
    berry.onChange(calculate);
    throwtype.onChange(calculate);
    curve.onChange(calculate);
    medal.onChange(calculate);
    encounter.onChange(calculate);
    function calculate(): void {
        console.log('Calculating...');
        const modifier: number = ball.getValue() * berry.getValue() * throwtype.getValue() * curve.getValue() * medal.getValue() * encounter.getValue();
        rate.setValue(100 - 100 * (1 - BCR.getValue() / 100 / 2 / CPM.getValue()) ** modifier);
    }
    calculate();
}

const BallType: Array<DropdownItem> = [
    { key: 'Poke Ball', value: 1 },
    { key: 'Great Ball', value: 1.5 },
    { key: 'Ultra Ball', value: 2 },
    { key: 'Premier Ball', value: 1.05 },
];

const BerryType: Array<DropdownItem> = [
    { key: 'Other/None', value: 1 },
    { key: 'Razz Berry', value: 1.5 },
    { key: 'Silver Pinap Berry', value: 1.8 },
    { key: 'Golden Razz Berry', value: 2.5 },
];

const ThrowType: Array<DropdownItem> = [
    { key: 'None', value: 1 },
    { key: 'Nice', value: 1.15 },
    { key: 'Great', value: 1.5 },
    { key: 'Excellent', value: 1.85 },
];

const CurveType: Array<DropdownItem> = [
    { key: 'Straight Throw', value: 1 },
    { key: 'Curveball', value: 1.7 },
];

const MedalType: Array<DropdownItem> = [
    { key: 'None', value: 1 },
    { key: 'Bronze', value: 1.1 },
    { key: 'Silver', value: 1.2 },
    { key: 'Gold', value: 1.3 },
    { key: 'Platinum', value: 1.4 },
];

const EncounterType: Array<DropdownItem> = [
    { key: 'Wild Encounter', value: 1 },
    { key: 'Research Reward', value: 2 },
];
