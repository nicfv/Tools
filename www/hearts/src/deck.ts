import { Card } from './card';

/**
 * Represents a standard deck of 52 cards.
 */
export class Deck {
    public readonly cards: Array<Card>;
    /**
     * Re-deal the deck.
     */
    constructor() {
        this.cards = [];
        for (let suit = 1; suit <= 4; suit++) {
            for (let value = 2; value <= 14; value++) {
                this.cards.push(new Card(suit, value));
            }
        }
        this.cards.sort((a, b) => a.getOrdinal() - b.getOrdinal());
    }
}