import { Card } from './card';

export class Player {
    public score: number = 0;
    public readonly missingSuits: Array<number> = [];
    public play(card: Card, leadSuit: number): void {
        if (card.suit !== leadSuit) {
            this.missingSuits.push(leadSuit);
        }
    }
    public take(trick: Array<Card>): void {
        trick.forEach(card => this.score += card.pointValue);
    }
}