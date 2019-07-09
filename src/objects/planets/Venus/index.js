import * as THREE from 'three';

import VenusTexture from '../../../tex/venus/venusmap.jpg';
import VenusTextureBump from '../../../tex/venus/venusbump.jpg';

import {Orbit, Planet} from "../..";

class Venus extends Planet {
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
    const texture = new THREE.TextureLoader().load(VenusTexture);
    const bumpTexture = new THREE.TextureLoader().load(VenusTextureBump);

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
