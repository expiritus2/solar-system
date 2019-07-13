import * as THREE from 'three';

import {Planet} from "../../";

class Pluto extends Planet{
  constructor(scene) {
    super(scene);

    this.className = this.constructor.name.toLowerCase();
  }

  init() {
    super.init();
    this.createOrbit();
    this.configureMaterial();
  }

  configureMaterial() {
    const {pluto:{plutomap, plutobump}} = this.textures;
    const texture = new THREE.TextureLoader().load(plutomap);
    const bumpTexture = new THREE.TextureLoader().load(plutobump);

    this.material.map = texture;
    this.material.bumpMap = bumpTexture;
    this.material.bumpScale = 0.05;
  }

  move() {
    super.move();
    this.orbit.move();
  }
}

export default Pluto;
