import { Application, initApplication } from "./application";
import { ReflectiveInjector } from 'injection-js';
import { WebGLRenderer } from 'three';

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
        const injector = ReflectiveInjector.resolveAndCreate([
            { provide: HTMLCanvasElement, useValue: this.canvas },
            {
                provide: WebGLRenderer,
                deps: [HTMLCanvasElement],
                useFactory(canvas: HTMLCanvasElement) {
                    return new WebGLRenderer({ antialias: true, alpha: true, canvas });
                }
            }, Application
        ]);
        initApplication(injector, this);
    }
}
