import { Unit } from 'dimensional';

/**
 * Represents a unit with a name
 */
export interface NamedUnit {
    /**
     * The name of this unit
     */
    readonly name: string;
    /**
     * The unit represented by the name
     */
    readonly unit: Unit;
}

/**
 * Represents an input/output pair of objects
 */
export interface Pair<T> {
    /**
     * The input object
     */
    input: T;
    /**
     * The output object
     */
    output: T;
}