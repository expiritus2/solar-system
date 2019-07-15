import * as THREE from 'three';

import {Planet} from "../../..";

class Phobos extends Planet {
  constructor(scene, parentPlanet) {
    super(scene, parentPlanet);

    this.className = this.constructor.name;
  }

  init() {
    super.init();
    this.configureMaterial();
  }

  configureMaterial() {
    const {phobos: {phobosbump}} = this.textures;
    this.material.bumpMap = new THREE.TextureLoader().load(phobosbump);
    this.material.bumpScale = 0.03;
  }
}

export default Phobos;
