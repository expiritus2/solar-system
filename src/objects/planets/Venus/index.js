import * as THREE from 'three';

import {Planet} from "../..";

class Venus extends Planet {
  constructor(scene) {
    super(scene);

    this.className = this.constructor.name;
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
    this.material.bumpScale = 0.02;
  }
}

export default Venus;
