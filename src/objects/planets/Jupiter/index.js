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
  }

  configureMaterial() {
    const { jupiter: { jupitermap } } = this.textures;

    this.material.map = new THREE.TextureLoader().load(jupitermap);
    this.material.shininess = 0.1;
  }

  move(time) {
    super.move(time);
    this.orbit.move(time);
  }
}

export default Jupiter;
