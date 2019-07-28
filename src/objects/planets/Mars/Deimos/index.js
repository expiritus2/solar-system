import * as THREE from 'three';

import {Planet} from "../../..";

class Deimos extends Planet {
  constructor(scene, parentPlanet) {
    super(scene, parentPlanet);

    this.className = this.constructor.name;
    this.textSize = 0.5;
  }

  init() {
    super.init();
    this.configureMaterial();
  }

  configureMaterial() {
    const {deimos: {deimosbump}} = this.textures;
    this.material.bumpMap = new THREE.TextureLoader().load(deimosbump);
    this.material.bumpScale = 0.03;
  }
}

export default Deimos;
