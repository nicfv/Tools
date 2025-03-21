import { Card } from './card';
import { Deck } from './deck';
import { Player } from './player';

// 1. Draw 13 cards
// 2. Pass 3 cards
// 3. Start with the 2 of clubs
// 4. Rotate until cards are exhausted
//  a. 4 players play a card each
//  b. 1 player takes the trick
//  c. That player leads the next trick
// Go to step 1.

// Pass left, right, across
// Play clockwise


export class Game {
    private step: number = 0;
    private round: number = 0;
    private deck: Deck = new Deck();
    private onTable: Array<Card> = [];
    private players: Array<Player> = [];
    constructor(private readonly parent: HTMLElement) { }
    public play(): void {
        if (this.step === 0) {
            this.newRound();
        }
    }
    public newRound(): void {
        this.step = 1;
        this.round++;
        this.deck = new Deck();
        this.players = [];
        // Pass left, right, then across
        [1, 3, 2].forEach(id => this.players.push(new Player(this.round === id)));
    }
}