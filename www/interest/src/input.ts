import { SMath } from 'smath';

/**
 * Represents a numeric input element with a label.
 */
export class Input {
    private static input_id: number = 0;
    private readonly element: HTMLInputElement;
    /**
     * Create a new input element and append onto the parent element.
     */
    constructor(parent: Element, title: string, private readonly min: number, private readonly max: number, step: number) {
        Input.input_id++;
        this.element = document.createElement('input');
        const container = document.createElement('div'),
            label = document.createElement('label'),
            inputId = 'input_' + Input.input_id;
        container.setAttribute('class', 'input');
        this.element.setAttribute('id', 'input_' + inputId);
        this.element.setAttribute('type', 'number');
        this.element.setAttribute('title', title);
        this.element.setAttribute('placeholder', title);
        this.element.setAttribute('min', min.toString());
        this.element.setAttribute('max', max.toString());
        this.element.setAttribute('step', step.toString());
        label.setAttribute('for', 'input_' + inputId);
        label.innerText = title;
        container.appendChild(this.element);
        container.appendChild(label);
        parent.appendChild(container);
    }
    /**
     * Clear the input.
     */
    public clear(): void {
        this.element.value = '';
    }
    /**
     * Set the onChange event callback. Does not clear existing event listeners.
     */
    public onChange(callback: (value: number) => void): void {
        this.element.addEventListener('input', () => callback(this.getValue()));
    }
    /**
     * Get the current value of the input element.
     */
    public getValue(): number {
        return SMath.clamp(+this.element.value, this.min, this.max);
    }
}