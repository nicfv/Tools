/**
 * Represents a responsive hamburger style menu button.
 */
export class Hamburger {
    #size;
    #strokeWidth;
    #openColor;
    #closeColor;
    #el;
    #ham;
    #open;
    constructor(size = 0, openColor = '', closeColor = '', transition = 0, parent = document.body) {
        const NS = 'http://www.w3.org/2000/svg';
        this.#size = size;
        this.#strokeWidth = size / 4;
        this.#openColor = openColor;
        this.#closeColor = closeColor;
        this.#open = false;
        this.#el = document.createElementNS(NS, 'svg');
        this.#ham = document.createElementNS(NS, 'path');
        this.#el.appendChild(this.#ham);
        this.#el.setAttribute('width', this.#size);
        this.#el.setAttribute('height', this.#size);
        this.#ham.setAttribute('d', this.#dOpen());
        this.#ham.setAttribute('stroke-linecap', 'round');
        this.#el.style.cursor = 'pointer';
        this.#ham.style.stroke = this.#openColor;
        this.#ham.style.strokeWidth = this.#strokeWidth;
        this.#ham.style.transition = 'd ' + transition + 's, stroke ' + transition + 's';
        this.#el.addEventListener('click', () => this.click());
        this.onclick = () => { };
        parent.appendChild(this.#el);
    }
    /**
     * Display 3 horizontal lines
     */
    #dOpen() {
        return 'M ' + this.#top() + ',' + this.#top() + ' ' + this.#bot() + ',' + this.#top() +
            ' M ' + this.#top() + ',' + this.#mid() + ' ' + this.#bot() + ',' + this.#mid() +
            ' M ' + this.#top() + ',' + this.#bot() + ' ' + this.#bot() + ',' + this.#bot();
    }
    /**
     * Display an X
     */
    #dClose() {
        return 'M ' + this.#top() + ',' + this.#top() + ' ' + this.#bot() + ',' + this.#bot() +
            ' M ' + this.#mid() + ',' + this.#mid() + ' ' + this.#mid() + ',' + this.#mid() +
            ' M ' + this.#top() + ',' + this.#bot() + ' ' + this.#bot() + ',' + this.#top();
    }
    /**
     * Top reference point
     */
    #top() {
        return this.#strokeWidth / 2;
    }
    /**
     * Middle reference point
     */
    #mid() {
        return this.#size / 2;
    }
    /**
     * Bottom reference point
     */
    #bot() {
        return this.#size - this.#strokeWidth / 2;
    }
    /**
     * Assign an absolute position for this menu control. Negative coordinates are relative to the right and bottom sides of the page.
     */
    setPosition(x = 0, y = 0) {
        this.#el.style.position = 'fixed';
        if (x >= 0) {
            this.#el.style.left = x + 'px';
        } else {
            this.#el.style.right = -x + 'px';
        }
        if (y >= 0) {
            this.#el.style.top = y + 'px';
        } else {
            this.#el.style.bottom = -y + 'px';
        }
    }
    /**
     * Call this to simulate a click event on this object.
     */
    click() {
        this.#open = !this.#open;
        if (this.#open) {
            this.#ham.setAttribute('d', this.#dClose());
            this.#ham.style.stroke = this.#closeColor;
        } else {
            this.#ham.setAttribute('d', this.#dOpen());
            this.#ham.style.stroke = this.#openColor;
        }
        this.onclick();
    }
    /**
     * Determine if the menu is currently open.
     */
    isOpen() {
        return this.#open;
    }
}