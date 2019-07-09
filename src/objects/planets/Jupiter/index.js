import * as THREE from 'three';
import {Orbit, Planet} from "../..";

import JupiterTexture from "../../../tex/jupiter/jupitermap.jpg";

class Jupiter extends Planet{
  constructor(scene) {
    super(scene);

    this.className = this.constructor.name.toLowerCase();
  }

  init() {
    super.init();
    this.createOrbit();
    this.configureMaterial();
  }

  createOrbit() {
    this.orbit = new Orbit(this.className);
    this.orbit.mesh.add(this.mesh);

    this.mesh.position.x = this.orbit.radius;

    this.scene.add(this.orbit.mesh);
  }

  configureMaterial() {
    this.material.map = new THREE.TextureLoader().load(JupiterTexture);
    this.material.shininess = 0.1;
  }

  move(time) {
    super.move(time);
    this.orbit.move(time);
  }
}

export default Jupiter;
