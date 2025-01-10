/**
 * Structure for an HTML button.
 */
export class Button {
    #element;
    /**
     * Create a new button on the parent element.
     */
    constructor(parent = document.body, text = '') {
        this.#element = document.createElement('button');
        this.#element.textContent = text;
        this.#element.setAttribute('title', text);
        parent.appendChild(this.#element);
    }
    /**
     * Set the onClick event.
     */
    onClick(callback = () => { }) {
        this.#element.addEventListener('click', callback);
    }
    /**
     * Simulate a button click.
     */
    click() {
        this.#element.click();
    }
}