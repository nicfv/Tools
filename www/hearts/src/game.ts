import { Card } from './card';
import { Deck } from './deck';
import { Player } from './player';

export class Game {
    private readonly numPlayers: number = 3;
    private readonly passCount: number = 3;
    private readonly cardsPerHand: number = 13;
    private instruction: HTMLHeadingElement;
    private playerData: HTMLDivElement;
    private table: HTMLDivElement;
    private hand: HTMLDivElement;
    private step: number = 0;
    private passTo: number = 0;
    private deck: Deck = new Deck();
    private trickNum: number = 1;
    private playerId: number = 0;
    private suitLead: number = 0;
    private onTable: Array<Card> = [];
    private you: Player = new Player(0, false);
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
            case (7): { this.play(); break; }
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
            this.players.push(new Player(i, this.passTo === i));
        }
        this.next();
    }
    private deal(): void {
        let cardsLeft: number = this.cardsPerHand;
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
                this.playACard(me);
                this.next();
            }));
        } else if (twoClubs.passed) {
            this.setInstruction('You passed the 2 of clubs to player ' + this.passTo);
            this.playerId = this.passTo;
            this.hand.append(twoClubs.getButton(me => {
                this.playACard(me);
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
                    this.playACard(twoClubs);
                    this.next();
                });
                this.table.append(newButton);
            }
        }
    }
    private play(): void {
        this.clearChildren(this.hand);
        if (this.trickNum >= this.cardsPerHand) {
            this.next();
        }
        if (this.playerId === 0) {
            this.setInstruction('Trick #' + this.trickNum + ': Play a card.');
            this.hand.append(...this.deck.hand(this.suitLead).map(card => card.getButton(me => {
                this.playACard(me);
                this.play();
            })));
        } else {
            this.setInstruction('Trick #' + this.trickNum + ': Which card did player ' + this.playerId + ' play?');
            const player: Player = this.players.find(p => p.id === this.playerId)!;
            this.hand.append(...player.possibleCards(this.deck).map(card => card.getButton(me => {
                this.playACard(me);
                this.play();
            })));
        }
    }
    private playACard(card: Card): void {
        if (this.suitLead === 0) {
            this.suitLead = card.suit;
        }
        if (this.playerId === 0) {
            this.you.play(card, this.suitLead);
        } else {
            this.players.find(player => player.id === this.playerId)!.play(card, this.suitLead);
        }
        this.onTable[this.playerId] = card;
        this.table.append(card.toString());
        // Count the number of cards that have been played
        let cardsPlayed: number = 0;
        for (const card of this.onTable) {
            if (card) { cardsPlayed++; }
        }
        if (cardsPlayed >= 4) {
            this.trickNum++;
            this.suitLead = 0;
            this.onTable = [];
            this.clearChildren(this.table);
        } else {
            // Increment playerId by 1, wrapping around if necessary.
            this.playerId = (this.playerId + 1) % (this.numPlayers + 1);
        }
        this.play();
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