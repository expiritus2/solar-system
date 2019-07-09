import * as THREE from 'three';

import {Orbit, Planet} from "../..";
import SaturnTexture from '../../../tex/saturn/saturnmap.jpg';
import RingColorTexture from '../../../tex/saturn/saturnringcolor.jpg';
import RingBumpTexture from '../../../tex/saturn/saturnringpattern.gif';

class Saturn extends Planet {
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
    this.material.map = new THREE.TextureLoader().load(SaturnTexture);
    this.material.specular = new THREE.Color('grey');
    this.material.shininess = 0.1;

    this.createRings(5);
  }

  createRings(countRings) {
    for(let i = 1, j = 0.2; i <= countRings; i++, j+=0.5) {
      const ring = this.createRing(j, j + 0.25, i / countRings);
      this.mesh.add(ring);
    }
  }


  createRing(increaseInnerRadius, increaseOuterRadius, opacity) {
    const ringTexture = new THREE.TextureLoader().load(RingColorTexture);
    const ringBumpTexture = new THREE.TextureLoader().load(RingBumpTexture);

    this.geometry = new THREE.RingBufferGeometry(this.radius + increaseInnerRadius, this.radius + increaseOuterRadius, 64);
    this.geometry.rotateX(THREE.Math.degToRad(-120));
    this.material = new THREE.MeshPhongMaterial();
    this.material.map = ringTexture ? ringTexture : null;

    this.material.specularMap = ringBumpTexture ? ringBumpTexture : null;
    this.material.specular = new THREE.Color('grey');
    this.material.shininess = 0.1;
    this.material.transparent = true;
    this.material.opacity = opacity;

    this.material.side = THREE.DoubleSide;
    return new THREE.Mesh(this.geometry, this.material);
  }

  move(time) {
    super.move(time);
    this.orbit.move(time);
  }
}

export default Saturn;
