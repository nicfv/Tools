/**
 * A playing card.
 */
export class Card {
    /**
     * Whether or not this card has been played.
     */
    public played: boolean = false;
    /**
     * Whether or not this card was passed to another player.
     */
    public passed: boolean = false;
    /**
     * Whether or not this card is in your hand.
     */
    public inHand: boolean = false;
    /**
     * The point value of this card.
     */
    public readonly pointValue: number = 0;
    /**
     * Create a new instance of a playing card.
     * @param suit [1-4]
     * @param value [2-14]
     */
    constructor(public readonly suit: number, public readonly value: number) {
        if (suit < 1 || suit > 4) { throw new Error('Suit (' + suit.toString() + ') is out of bounds [1-4].'); }
        if (value < 2 || value > 14) { throw new Error('Value (' + value.toString() + ') is out of bounds [2-14].'); }
        if (suit === 4) {
            this.pointValue = 1;
        }
        if (suit === 3 && value === 12) {
            this.pointValue = 13;
        }
        if (suit === 2 && value === 11) {
            this.pointValue = -10;
        }
    }
    /**
     * Get the color of this card.
     */
    public getColor(): string {
        if (this.suit === 1 || this.suit === 3) { return '#000000'; }
        if (this.suit === 2 || this.suit === 4) { return '#EE0000'; }
        throw new Error('Invalid suit (' + this.suit.toString() + ').');
    }
    /**
     * Get a string representation of this card.
     */
    public toString(): string {
        let suitStr: string,
            valueStr: string;
        switch (this.suit) {
            case (1): { suitStr = '\u2663'; break; }
            case (2): { suitStr = '\u2666'; break; }
            case (3): { suitStr = '\u2660'; break; }
            case (4): { suitStr = '\u2665'; break; }
            default: { throw new Error('Invalid suit.'); }
        }
        switch (this.value) {
            case (11): { valueStr = 'J'; break; }
            case (12): { valueStr = 'Q'; break; }
            case (13): { valueStr = 'K'; break; }
            case (14): { valueStr = 'A'; break; }
            default: { valueStr = this.value.toString(); }
        }
        return suitStr + valueStr;
    }
    /**
     * Create a button with an event listener.
     */
    public getButton(onClick: (card: Card) => void): HTMLButtonElement {
        const button: HTMLButtonElement = document.createElement('button');
        button.textContent = this.toString();
        button.style.color = this.getColor();
        button.addEventListener('click', () => {
            console.log('Click: ' + this.toString());
            button.disabled = true;
            onClick(this);
        });
        return button;
    }
}