import * as THREE from 'three';

import {Planet, Orbit} from "../..";
import MercuryTexture from '../../../tex/mercury/mercurymap.jpg';
import MercuryBumpTexture from '../../../tex/mercury/mercurybump.jpg';

class Mercury extends Planet {
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
    const texture = new THREE.TextureLoader().load(MercuryTexture);
    const bumpTexture = new THREE.TextureLoader().load(MercuryBumpTexture);

    this.material.map = texture;
    this.material.bumpMap = bumpTexture;
    this.material.specular = new THREE.Color('grey');
    this.material.bumpScale = 0.05;
    this.material.shininess = 0.1;
  }

  move(time) {
    super.move(time);
    this.orbit.move(time);
  }
}

export default Mercury;
