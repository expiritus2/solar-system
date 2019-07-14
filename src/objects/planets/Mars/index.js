import * as THREE from 'three';

import {Planet} from "../../";

class Mars extends Planet{
  constructor(scene) {
    super(scene);

    this.className = this.constructor.name;
  }

  init() {
    super.init();
    this.configureMaterial();
  }

  configureMaterial() {
    const { mars: { marsmap, marsbump } } = this.textures;

    const texture = new THREE.TextureLoader().load(marsmap);
    const bumpTexture = new THREE.TextureLoader().load(marsbump);

    this.material.map = texture;
    this.material.bumpMap = bumpTexture;
    this.material.bumpScale = 0.05;
  }
}

export default Mars;
