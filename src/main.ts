import { SnackMan } from 'app/snackman';
import glsl from 'shaders/mascot.frag.glsl';
import 'styles/style.scss';

customElements.define('reloadly-snackman', SnackMan);
console.log(glsl);

