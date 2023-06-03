import {
    BoxGeometry,
    Color,
    Mesh,
    MeshNormalMaterial,
    PerspectiveCamera,
    Scene,
    WebGLRenderer
} from "three";
import { SnackMan } from "./snackman";

const fov = 75, aspect = 2, near = 0.1, far = 5;

export function init(element: SnackMan) {
    const renderer = new WebGLRenderer({ antialias: true, alpha: true, canvas: element.canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new Scene();
    scene.background = new Color('#ebebeb');
    const camera = new PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshNormalMaterial();
    const cube = new Mesh(geometry, material);

    scene.add(cube);

    const render = function () {
        cube.rotation.x += 0.05;
        cube.rotation.y += 0.05;

        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();

        renderer.render(scene, camera);
        requestAnimationFrame(render);
    };

    requestAnimationFrame(render);
}
