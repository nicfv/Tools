/**
 * Structure for an HTML button.
 */
export class Button {
    private readonly element: HTMLButtonElement;
    /**
     * Create a new button on the parent element.
     */
    constructor(parent: Element, text: string) {
        this.element = document.createElement('button');
        this.element.textContent = text;
        this.element.setAttribute('title', text);
        parent.appendChild(this.element);
    }
    /**
     * Set the onClick event.
     */
    public onClick(callback: () => void) {
        this.element.addEventListener('click', callback);
    }
    /**
     * Simulate a button click.
     */
    public click(): void {
        this.element.click();
    }
}