import * as THREE from 'three';

import {Planet} from "../..";

class Mercury extends Planet {
  constructor(scene) {
    super(scene);

    this.className = this.constructor.name.toLowerCase();
  }

  init() {
    super.init();
    this.configureMaterial();
  }

  configureMaterial() {
    const { mercury: {mercurymap, mercurybump} } = this.textures;

    const texture = new THREE.TextureLoader().load(mercurymap);
    const bumpTexture = new THREE.TextureLoader().load(mercurybump);

    this.material.map = texture;
    this.material.bumpMap = bumpTexture;
    this.material.specular = new THREE.Color('grey');
    this.material.bumpScale = 0.01;
  }
}

export default Mercury;
