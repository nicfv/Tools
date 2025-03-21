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
    }
    /**
     * Get the cards currently in your hand.
     */
    public hand(): Array<Card> {
        return this.cards.filter(card => card.inHand && !card.played);
    }
}