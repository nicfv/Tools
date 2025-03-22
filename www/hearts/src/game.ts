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
    private readonly numPlayers: number = 3;
    private readonly passCount: number = 3;
    private instruction: HTMLHeadingElement;
    private playerData: HTMLDivElement;
    private table: HTMLDivElement;
    private hand: HTMLDivElement;
    private step: number = 0;
    private passTo: number = 0;
    private deck: Deck = new Deck();
    private playerId: number = 0;
    private suitLead: number = 0;
    private onTable: Array<Card> = [];
    private players: Array<Player> = [];
    constructor(parent: HTMLElement) {
        this.instruction = document.createElement('h1');
        this.playerData = document.createElement('div');
        this.table = document.createElement('div');
        this.hand = document.createElement('div');
        parent.append(this.instruction, this.playerData, this.table, this.hand);
        this.next();
    }
    private next(): void {
        this.clearAll();
        this.step++;
        switch (this.step) {
            case (1): { this.choose(); break; }
            case (2): { this.join(); break; }
            case (3): { this.deal(); break; }
            case (4): { this.pass(); break; }
            case (5): { this.receive(); break; }
            case (6): { this.start(); break; }
            default: { }
        }
    }
    private choose(): void {
        this.setInstruction('Which player will you pass to?');
        for (let i = 1; i <= this.numPlayers; i++) {
            const newButton = document.createElement('button');
            newButton.textContent = 'P' + i;
            newButton.addEventListener('click', () => {
                console.log('Passing to P' + i);
                this.passTo = i;
                this.next();
            });
            this.table.append(newButton);
        }
    }
    private join(): void {
        this.setInstruction('Setting up players...');
        this.players = [];
        for (let i = 1; i <= this.numPlayers; i++) {
            this.players.push(new Player(this.passTo === i));
        }
        this.next();
    }
    private deal(): void {
        let cardsLeft: number = 13;
        this.deck = new Deck();
        this.setInstruction('You were dealt ' + cardsLeft + ' cards. Select them below.');
        this.hand.append(...this.deck.cards.map(card => card.getButton(me => {
            me.inHand = true;
            cardsLeft--;
            this.setInstruction('Select ' + cardsLeft + ' more card(s).');
            if (cardsLeft <= 0) {
                this.next();
            }
        })));
    }
    private pass(): void {
        let passLeft: number = this.passCount;
        this.setInstruction('Pass ' + passLeft + ' cards to player ' + this.passTo + '.');
        this.hand.append(...this.deck.hand().map(card => card.getButton(me => {
            me.inHand = false;
            me.passed = true;
            passLeft--;
            this.setInstruction('Select ' + passLeft + ' more card(s).');
            if (passLeft <= 0) {
                this.next();
            }
        })));
    }
    private receive(): void {
        let receiveLeft: number = this.passCount;
        this.setInstruction('You received ' + receiveLeft + ' cards. Select them below.');
        this.hand.append(...this.deck.couldReceive().map(card => card.getButton(me => {
            me.inHand = true;
            receiveLeft--;
            this.setInstruction('Select ' + receiveLeft + ' more cards.');
            if (receiveLeft <= 0) {
                this.next();
            }
        })));
    }
    private start(): void {
        const twoClubs: Card = this.deck.cards.find(card => card.twoClubs)!;
        if (twoClubs.inHand) {
            this.setInstruction('Play the 2 of clubs.');
            this.playerId = 0;
            this.hand.append(twoClubs.getButton(me => {
                this.table.append(twoClubs.toString());
                me.played = true;
                this.next();
            }));
        } else if (twoClubs.passed) {
            this.setInstruction('You passed the 2 of clubs to player ' + this.passTo);
            this.playerId = this.passTo;
            this.hand.append(twoClubs.getButton(me => {
                this.table.append(twoClubs.toString());
                me.played = true;
                this.next();
            }));
        } else {
            this.setInstruction('Select which player has the 2 of clubs.');
            for (let i = 1; i <= this.numPlayers; i++) {
                const newButton = document.createElement('button');
                newButton.textContent = 'P' + i;
                newButton.addEventListener('click', () => {
                    console.log('Started with P' + i);
                    this.playerId = i;
                    twoClubs.played = true;
                    this.next();
                });
                this.table.append(newButton);
            }
        }
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
        this.clearChildren(this.table);
        this.clearChildren(this.hand);
    }
}