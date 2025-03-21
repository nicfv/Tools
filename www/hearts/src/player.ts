import { Card } from './card';
import { Deck } from './deck';

export class Player {
    public score: number = 0;
    public readonly missingSuits: Array<number> = [];
    constructor(private readonly passTarget: boolean) { }
    public play(card: Card, leadSuit: number): void {
        card.played = true;
        if (card.suit !== leadSuit) {
            this.missingSuits.push(leadSuit);
        }
    }
    public take(trick: Array<Card>): void {
        trick.forEach(card => this.score += card.pointValue);
    }
    public possibleCards(deck: Deck): Array<Card> {
        return deck.cards.filter(card => {
            // Card was already played.
            if (card.played) {
                return false;
            }
            // Card is in your hand.
            if (card.inHand) {
                return false;
            }
            // Card was passed to someone else.
            if (card.passed && !this.passTarget) {
                return false;
            }
            // Out of this suit.
            if (this.missingSuits.includes(card.suit)) {
                return false;
            }
            // Might have this card.
            return true;
        });
    }
}