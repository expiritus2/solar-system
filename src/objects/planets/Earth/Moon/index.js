import * as THREE from 'three';

import {Planet} from "../../..";

class Moon extends Planet {
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
    const {moon: {moonmap, moonbump}} = this.textures;
    const texture = new THREE.TextureLoader().load(moonmap);
    const bumpMapTexture = new THREE.TextureLoader().load(moonbump);

    this.material.map = texture;
    this.material.bumpMap = bumpMapTexture;
    this.material.bumpScale = 0.03;
  }
}

export default Moon;
