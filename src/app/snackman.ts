import { initApplication, registerProviders } from "./application";

export class SnackMan extends HTMLElement {
    canvas: HTMLCanvasElement;

    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('class', 'drawing');
        const style = document.createElement('style');
        style.textContent = `.drawing{width:100%;height:100%;display:block;}`;
        if (this.shadowRoot) {
            this.shadowRoot.appendChild(style);
            this.shadowRoot.appendChild(this.canvas);
        } else {
            console.error('Could not init <reloadly-snackman>');
        }
    }

    connectedCallback() {
        const injector = registerProviders({ canvas: this.canvas });
        initApplication(injector, this);
    }
}
