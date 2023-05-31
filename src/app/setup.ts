import {
    BoxGeometry,
    Mesh,
    MeshNormalMaterial,
    PerspectiveCamera,
    Scene,
    WebGLRenderer
} from "three";

export function start() {
    const canvas = document.querySelector('#app') as Element;
    const renderer = new WebGLRenderer({ antialias: true, alpha: true, canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new Scene();
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshNormalMaterial();
    const cube = new Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const render = function () {
        requestAnimationFrame(render);
        renderer.render(scene, camera);

        cube.rotation.x += 0.05;
        cube.rotation.y += 0.05;
    };

    render();
}
