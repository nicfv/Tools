import { Game } from './game';

function main(): void {
    new Game(document.body).go();
}

window.addEventListener('load', main);