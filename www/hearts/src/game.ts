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
    private instruction: HTMLHeadingElement;
    private playerData: HTMLDivElement;
    private table: HTMLDivElement;
    private hand: HTMLDivElement;
    private step: number = 0;
    private round: number = 0;
    private deck: Deck = new Deck();
    private onTable: Array<Card> = [];
    private players: Array<Player> = [];
    constructor(parent: HTMLElement) {
        this.instruction = document.createElement('h1');
        this.playerData = document.createElement('div');
        this.table = document.createElement('div');
        this.hand = document.createElement('div');
        parent.append(this.instruction, this.playerData, this.table, this.hand);
    }
    public play(): void {
        this.clearAll();
        if (this.step === 0) {
            this.newRound();
        } else if (this.step === 1) {
            this.pass();
        } else {
            this.setInstruction('Something else.');
        }
    }
    public newRound(): void {
        let cardsLeft: number = 13;
        this.step++;
        this.round++;
        this.deck = new Deck();
        this.players = [];
        // Pass left, right, then across
        [1, 3, 2].forEach(id => this.players.push(new Player(this.round === id)));
        this.setInstruction('You were dealt ' + cardsLeft + ' cards. Select them below.');
        this.hand.append(...this.deck.cards.map(card => card.getButton(me => {
            me.inHand = true;
            cardsLeft--;
            this.setInstruction('Select ' + cardsLeft + ' more card(s).');
            if (cardsLeft <= 0) {
                this.play();
            }
        })));
    }
    public pass(): void {
        let passLeft: number = 3;
        this.step++;
        this.setInstruction('Round ' + this.round + ': Pass ' + passLeft + ' cards.');
        this.hand.append(...this.deck.hand().map(card => card.getButton(me => {
            me.inHand = false;
            me.passed = true;
            passLeft--;
            this.setInstruction('Select ' + passLeft + ' more card(s).');
            if (passLeft <= 0) {
                this.play();
            }
        })));
    }
    private setInstruction(text: string): void {
        this.instruction.textContent = text;
    }
    private clearChildren(node: Node): void {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }
    private clearAll(): void {
        this.clearChildren(this.instruction);
        this.clearChildren(this.playerData);
        this.clearChildren(this.hand);
    }
}