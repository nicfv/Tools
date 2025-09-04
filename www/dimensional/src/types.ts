import { Unit } from 'dimensional';

export interface NamedUnit {
    readonly name: string;
    readonly unit: Unit;
}

export interface Pair<T> {
    input: T;
    output: T;
}