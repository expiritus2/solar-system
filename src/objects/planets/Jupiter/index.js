import * as THREE from 'three';
import {Planet} from "../..";

class Jupiter extends Planet{
  constructor(scene) {
    super(scene);

    this.className = this.constructor.name.toLowerCase();
  }

  init() {
    super.init();
    this.configureMaterial();

    this.startAngleY = 0;
  }

  configureMaterial() {
    const { jupiter: { jupitermap } } = this.textures;

    this.material.map = new THREE.TextureLoader().load(jupitermap);
  }
}

export default Jupiter;
