/**
 * Represents a visual switch with any number of states.
 */
export class TriSwitch {
    /**
     * Width [px]
     */
    #w;
    /**
     * Height [px]
     */
    #h;
    /**
     * Radius [px]
     */
    #r;
    /**
     * Main SVG element
     */
    #el;
    /**
     * Slot
     */
    #sl;
    /**
     * Switch
     */
    #sw;
    /**
     * Current switch state
     */
    #state;
    /**
     * Total number of switch states
     */
    #states;
    /**
     * State colors
     */
    #colors;
    /**
     * Create a new instance of a `TriSwitch`
     */
    constructor(width = 0, height = 0, stateColorScheme = [new StateColors('#666', '#000', '#f00'), new StateColors('#666', '#000', '#0f0'), new StateColors('#666', '#000', '#00f')], borderWidth = 1, switchPadding = 0, transition = 1, canClickSlot = false, parent = document.body) {
        const NS = 'http://www.w3.org/2000/svg';
        this.#w = width;
        this.#h = height;
        this.#r = (width < height ? width : height) / 2;
        this.#colors = stateColorScheme;
        this.#el = document.createElementNS(NS, 'svg');
        this.#sl = document.createElementNS(NS, 'rect');
        this.#sw = document.createElementNS(NS, 'circle');
        this.#el.appendChild(this.#sl);
        this.#el.appendChild(this.#sw);
        this.#el.setAttribute('width', width);
        this.#el.setAttribute('height', height);
        this.#sl.setAttribute('x', borderWidth / 2);
        this.#sl.setAttribute('y', borderWidth / 2);
        this.#sl.setAttribute('width', width - borderWidth);
        this.#sl.setAttribute('height', height - borderWidth);
        this.#sl.setAttribute('rx', this.#r);
        this.#sl.setAttribute('fill', this.#colors[0].backgroundColor);
        this.#sl.setAttribute('stroke', this.#colors[0].borderColor);
        this.#sl.setAttribute('stroke-width', borderWidth);
        this.#sw.setAttribute('cx', this.#r);
        this.#sw.setAttribute('cy', this.#r);
        this.#sw.setAttribute('r', this.#r - borderWidth - switchPadding);
        this.#sw.setAttribute('fill', this.#colors[0].switchColor);
        this.#sl.style.transition = 'fill ' + transition + 's, stroke ' + transition + 's';
        this.#sw.style.transition = 'fill ' + transition + 's, cx ' + transition + 's, cy ' + transition + 's';
        if (canClickSlot) {
            this.#sl.onclick = () => this.click();
            this.#sl.style.cursor = 'pointer';
        }
        this.#sw.onclick = () => this.click();
        this.#sw.style.cursor = 'pointer';
        this.#state = 0;
        this.#states = stateColorScheme.length;
        parent.appendChild(this.#el);
        if (this.#states < 2) {
            throw 'Not enough states.';
        }
        this.onclick = () => { };
    }
    /**
     * This function is called when the switch is clicked.
     */
    click() {
        this.#state = (this.#state + 1) % this.#states;
        this.#sw.setAttribute('cx', (this.#w - 2 * this.#r) * (this.#state / (this.#states - 1)) + this.#r);
        this.#sw.setAttribute('cy', (this.#h - 2 * this.#r) * (this.#state / (this.#states - 1)) + this.#r);
        this.#sw.setAttribute('fill', this.#colors[this.#state].switchColor);
        this.#sl.setAttribute('fill', this.#colors[this.#state].backgroundColor);
        this.#sl.setAttribute('stroke', this.#colors[this.#state].borderColor);
        this.onclick();
    }
    /**
     * Return the current state of the `TriSwitch`
     */
    getState() {
        return this.#state;
    }
    /**
     * Return the current state description of the `TriSwitch`
     */
    getStateDescription() {
        return this.#colors[this.#state].optionalDescription;
    }
}

/**
 * Represents a group of colors that represent a state of a `TriSwitch`
 */
export class StateColors {
    constructor(borderColor = '#000', backgroundColor = '#000', switchColor = '#000', optionalDescription = '') {
        this.borderColor = borderColor;
        this.backgroundColor = backgroundColor;
        this.switchColor = switchColor;
        this.optionalDescription = optionalDescription;
    }
}