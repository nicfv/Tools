import { Game } from './game';

function main(): void {
    new Game(document.body).play();
}

window.addEventListener('load', main);