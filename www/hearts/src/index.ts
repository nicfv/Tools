import { Deck } from './deck';

const deck = new Deck();

function main(): void {
    const div = document.getElementById('main')!;
    console.log('loaded!');
    deck.cards.forEach(card => {
        div.textContent += card.toString() + '\n';
    });
    return;
}

window.addEventListener('load', main);