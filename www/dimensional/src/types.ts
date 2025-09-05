import { Unit } from 'dimensional';

/**
 * Represents a unit with a name
 */
export type NamedUnit = [string, Unit];

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