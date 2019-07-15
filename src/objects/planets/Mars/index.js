import * as THREE from 'three';

import {Planet, Fobos, Phobos, Deimos} from "../../";

class Mars extends Planet{
  constructor(scene) {
    super(scene);

    this.className = this.constructor.name;
  }

  init() {
    super.init();
    this.configureMaterial();
    this.createSputniks();
  }

  createSputniks() {
    this.phobos = new Phobos(this.scene, this);
    this.deimos = new Deimos(this.scene, this);
    this.mesh.add(this.phobos.orbit.mesh);
    this.mesh.add(this.deimos.orbit.mesh);
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
