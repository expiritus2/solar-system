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

    this.orbit.mesh.rotateX(THREE.Math.degToRad(17));
  }

  configureMaterial() {
    const {pluto:{plutomap, plutobump}} = this.textures;
    const texture = new THREE.TextureLoader().load(plutomap);
    const bumpTexture = new THREE.TextureLoader().load(plutobump);

    this.material.map = texture;
    this.material.bumpMap = bumpTexture;
    this.material.bumpScale = 0.05;
  }
}

export default Pluto;
