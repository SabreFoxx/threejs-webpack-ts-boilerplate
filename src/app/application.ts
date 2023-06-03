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

const fov = 75, aspect = 2, near = 0.1, far = 5;

@Injectable()
export class Application {
    private htmlElement!: HTMLElement;
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

    setHtmlElement(el: HTMLElement): void {
        this.htmlElement = el;
    }

    startRendering(): void {
        requestAnimationFrame(this.render);
    }

    render = () => {
        this.cube.rotation.x += 0.05;
        this.cube.rotation.y += 0.05;

        const canvas = this.renderer.domElement;
        this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render);
    }
}

export function initApplication(injector: ReflectiveInjector, htmlElement: HTMLElement) {
    const application = injector.get(Application) as Application;
    application.setHtmlElement(htmlElement);
    application.setup();
    application.startRendering();
}
