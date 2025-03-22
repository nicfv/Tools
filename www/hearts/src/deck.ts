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
     * Get the cards currently in your hand, optionally filtering by suit.
     */
    public hand(suit: number = 0): Array<Card> {
        const filteredBySuit: Array<Card> = this.cards.filter(card => card.inHand && !card.played && suit === card.suit);
        if (filteredBySuit.length) {
            return filteredBySuit;
        } else {
            return this.cards.filter(card => card.inHand && !card.played);
        }
    }
    /**
     * Get the cards that you could be passed.
     */
    public couldReceive(): Array<Card> {
        return this.cards.filter(card => !card.inHand && !card.passed && !card.played);
    }
}