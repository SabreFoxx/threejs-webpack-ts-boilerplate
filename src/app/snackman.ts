import { init } from "./app";

export class SnackMan extends HTMLElement {
    shadow;
    canvas;

    constructor() {
        super();

        this.shadow = this.attachShadow({ mode: 'open' });
        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('class', 'drawing');
        const style = document.createElement('style');
        style.textContent = `.drawing{width:100%;height:100%;display:block;}`;
        this.shadow.appendChild(style);
        this.shadow.appendChild(this.canvas);
    }

    connectedCallback() {
        init(this);
    }
}
