import * as THREE from "three";

import {Planet} from "../../index";

class Neptune extends Planet {
  constructor(scene) {
    super(scene);

    this.className = this.constructor.name.toLowerCase();
  }

  init() {
    super.init();
    this.configureMaterial();
  }

  configureMaterial() {
    const {neptune: {neptunemap}} = this.textures;

    this.material.map = new THREE.TextureLoader().load(neptunemap);
    this.material.shininess = 0.1;
  }

  move(time) {
    super.move(time);
    this.orbit.move(time);
  }
}

export default Neptune;
