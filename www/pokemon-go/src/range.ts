import * as SMath from 'smath';

/**
 * Represents a structure for numeric bounds.
 */
export interface Bounds {
    /**
     * The initial value, defaults to zero.
     */
    readonly val: number;
    /**
     * The minimum bound, defaults to -Infinity.
     */
    readonly min: number;
    /**
     * The maximum bound, defaults to Infinity.
     */
    readonly max: number;
    /**
     * The interval between values, defaults to 1.
     */
    readonly step: number;
}

/**
 * Represents a numeric input element with a label.
 */
export class Range {
    private static readonly className = 'input';
    private static id: number = 0;
    private readonly element: HTMLInputElement;
    private readonly bounds: Bounds;
    /**
     * Create a new input element and append onto the parent element.
     */
    constructor(parent: Element, title: string, bounds?: Partial<Bounds>) {
        Range.id++;
        this.bounds = {
            val: bounds?.val ?? 0,
            min: bounds?.min ?? -Infinity,
            max: bounds?.max ?? Infinity,
            step: bounds?.step ?? 1,
        };
        this.element = document.createElement('input');
        const container = document.createElement('div'),
            label = document.createElement('label'),
            inputId = Range.className + '_' + Range.id;
        container.setAttribute('class', Range.className);
        this.element.setAttribute('id', inputId);
        this.element.setAttribute('type', 'range');
        this.element.setAttribute('title', title);
        this.element.setAttribute('min', this.bounds.min.toString());
        this.element.setAttribute('max', this.bounds.max.toString());
        this.element.setAttribute('step', this.bounds.step.toString());
        this.element.setAttribute('value', this.bounds.val.toString());
        label.setAttribute('for', inputId);
        label.textContent = title;
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
        return SMath.clamp(SMath.round2(+this.element.value, this.bounds.step), this.bounds.min, this.bounds.max);
    }
    /**
     * Set the current value of the input element.
     */
    public setValue(value: number): void {
        this.element.value = SMath.clamp(SMath.round2(value, this.bounds.step), this.bounds.min, this.bounds.max).toString();
    }
}