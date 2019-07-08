import * as THREE from 'three';

import {Planet, MercuryOrbit} from "..";
import MercuryTexture from '../../tex/mercury/mercurymap.jpg';
import MercuryBumpTexture from '../../tex/mercury/mercurybump.jpg';

const settings = {
  name: 'Saturn',
  radius: 1,
  rotateSpeed: -0.0003
};

class Mercury extends Planet {
  constructor(scene) {
    super(scene, settings);
  }

  init() {
    super.init();
    this.configureMaterial();

    this.mercuryOrbit = new MercuryOrbit();
    this.mercuryOrbit.mesh.add(this.mesh);

    this.mesh.position.x = this.mercuryOrbit.radius;

    this.scene.add(this.mercuryOrbit.mesh);
  }


  configureMaterial() {
    const texture = new THREE.TextureLoader().load(MercuryTexture);
    const bumpTexture = new THREE.TextureLoader().load(MercuryBumpTexture);

    this.material.map = texture ? texture : null;
    this.material.bumpMap = bumpTexture ? bumpTexture : null;
    this.material.specular = new THREE.Color('grey');
    this.material.bumpScale = 0.05;
    this.material.shininess = 0.1;
  }


  move(time) {
    super.move(time);
    this.mercuryOrbit.move(time);
  }
}

export default Mercury;
