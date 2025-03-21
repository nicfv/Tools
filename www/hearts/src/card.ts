import { Suit, Value } from './types';

/**
 * A playing card.
 */
export class Card {
    /**
     * Whether or not this card has been played.
     */
    public played: boolean = false;
    /**
     * Create a new instance of a playing card.
     */
    constructor(public readonly suit: Suit, public readonly value: Value) { }
    /**
     * Get the sorting order of this card.
     */
    public getOrdinal(): number {
        return this.suit * 15 + this.value
    }
    /**
     * Get a string representation of this card.
     */
    public toString(): string {
        let suitStr: string,
            valueStr: string;
        switch (this.suit) {
            case (1): { suitStr = '\u2663'; break; }
            case (2): { suitStr = '\u2666'; break; }
            case (3): { suitStr = '\u2660'; break; }
            case (4): { suitStr = '\u2665'; break; }
            default: { throw new Error('Invalid suit.'); }
        }
        switch (this.value) {
            case (11): {
                valueStr = 'J'; break;
            }
            case (12): { valueStr = 'Q'; break; }
            case (13): { valueStr = 'K'; break; }
            case (14): { valueStr = 'A'; break; }
            default: { valueStr = this.value.toString(); }
        }
        return suitStr + valueStr;
    }
}