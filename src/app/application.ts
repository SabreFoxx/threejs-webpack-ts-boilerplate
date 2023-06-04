import {
    BoxGeometry,
    Color,
    Mesh,
    MeshNormalMaterial,
    PerspectiveCamera,
    Scene,
    WebGLRenderer
} from "three";
import { Injectable, ReflectiveInjector } from "injection-js";
import { SnackMan } from "./snackman";

const fov = 75, aspect = 2, near = 0.1, far = 5;

@Injectable()
export class Application {
    private htmlElement!: SnackMan;
    private canvas!: HTMLCanvasElement;
    private camera: PerspectiveCamera;
    private scene: Scene;
    private cube: Mesh;

    constructor(private renderer: WebGLRenderer) {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.scene = new Scene();
        this.camera = new PerspectiveCamera(fov, aspect, near, far);

        const geometry = new BoxGeometry(1, 1, 1);
        const material = new MeshNormalMaterial();
        this.cube = new Mesh(geometry, material);
    }

    setup(): void {
        this.scene.background = new Color('#ebebeb');
        this.camera.position.z = 2;

        this.scene.add(this.cube);
    }

    setHtmlElement(el: SnackMan): void {
        this.htmlElement = el;
        this.canvas = this.htmlElement.canvas;
        this.renderer.setSize(this.htmlElement.clientWidth, this.htmlElement.clientHeight);
    }

    startRendering(): void {
        this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
        this.camera.updateProjectionMatrix();
        requestAnimationFrame(this.render);
    }

    resizeRendererToCanvasSize = (): boolean => {
        const clientWidth = this.htmlElement.clientWidth;
        const clientHeight = this.htmlElement.clientHeight;
        const needsResize = this.canvas.width !== clientWidth || this.canvas.height !== clientHeight;
        if (needsResize) this.renderer.setSize(clientWidth, clientHeight);
        return needsResize;
    }

    render = () => {
        if (this.resizeRendererToCanvasSize()) {
            const canvas = this.renderer.domElement;
            this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
            this.camera.updateProjectionMatrix();
        }

        this.cube.rotation.x += 0.005;
        this.cube.rotation.y += 0.005;

        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render);
    }
}

export function initApplication(injector: ReflectiveInjector, htmlElement: SnackMan) {
    const application = injector.get(Application) as Application;
    application.setHtmlElement(htmlElement);
    application.setup();

    application.startRendering();
}

export function registerProviders(deps: { canvas: HTMLElement }): ReflectiveInjector {
    const injector = ReflectiveInjector.resolveAndCreate([
        { provide: HTMLCanvasElement, useValue: deps.canvas },
        {
            provide: WebGLRenderer,
            deps: [HTMLCanvasElement],
            useFactory(canvas: HTMLCanvasElement) {
                return new WebGLRenderer({ antialias: true, alpha: true, canvas });
            }
        }, Application
    ]);
    return injector;
}
