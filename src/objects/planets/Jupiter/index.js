import * as THREE from 'three';
import {Planet} from "../..";

import JupiterTexture from "../../../tex/jupiter/jupitermap.jpg";

class Jupiter extends Planet{
  constructor(scene) {
    super(scene);

    this.className = this.constructor.name.toLowerCase();
  }

  init() {
    super.init();
    this.configureMaterial();
  }

  configureMaterial() {
    this.material.map = new THREE.TextureLoader().load(JupiterTexture);
    this.material.shininess = 0.1;
  }

  move(time) {
    super.move(time);
    this.orbit.move(time);
  }
}

export default Jupiter;
