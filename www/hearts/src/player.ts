import { Card } from './card';
import { Deck } from './deck';

/**
 * Represents a player in the game.
 */
export class Player {
    /**
     * The player's score for the current round.
     */
    public score: number = 0;
    /**
     * Suits that this player doesn't have.
     */
    public readonly missingSuits: Array<number> = [];
    /**
     * Create a new player.
     * @param id Numeric serial number of the player.
     * @param passTarget Whether or not this player is the target of card passing.
     */
    constructor(public readonly id: number, private readonly passTarget: boolean) { }
    /**
     * This player plays a card.
     */
    public play(card: Card, leadSuit: number): void {
        card.played = true;
        if (card.suit !== leadSuit) {
            this.missingSuits.push(leadSuit);
        }
    }
    /**
     * This player takes the trick.
     */
    public take(trick: Array<Card>): void {
        trick.forEach(card => this.score += card.pointValue);
    }
    /**
     * Get a list of all possible cards in this player's hand.
     */
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