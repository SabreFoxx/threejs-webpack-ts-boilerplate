import 'reflect-metadata';
import glsl from 'shaders/mascot.frag.glsl';
import { SnackMan } from 'app/snackman';
import 'styles/style.scss';

customElements.define('reloadly-snackman', SnackMan);
console.log(glsl);

