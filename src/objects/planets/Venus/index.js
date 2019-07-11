import * as THREE from 'three';

import {Planet} from "../..";

class Venus extends Planet {
  constructor(scene) {
    super(scene);

    this.className = this.constructor.name.toLowerCase();
  }

  init() {
    super.init();
    this.configureMaterial();
  }

  configureMaterial() {
    const {venus:{venusmap, venusbump}} = this.textures;
    const texture = new THREE.TextureLoader().load(venusmap);
    const bumpTexture = new THREE.TextureLoader().load(venusbump);

    this.material.map = texture;
    this.material.bumpMap = bumpTexture;
    this.material.bumpScale = 0.05;
    this.material.shininess = 0.1;
  }

  move(time) {
    super.move(time);
    this.orbit.move(time);
  }
}

export default Venus;
