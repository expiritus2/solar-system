import * as THREE from 'three';

import {Planet} from "../..";

class Saturn extends Planet {
  constructor(scene) {
    super(scene);

    this.className = this.constructor.name;
  }

  init() {
    super.init();
    this.createOrbit();
    this.configureMaterial();
  }

  configureMaterial() {
    const {saturn:{saturnmap}} = this.textures;
    this.material.map = new THREE.TextureLoader().load(saturnmap);
    this.material.specular = new THREE.Color('grey');

    this.createRings(5);
  }

  createRings(countRings) {
    for(let i = 1, j = 0.2; i <= countRings; i++, j+=0.5) {
      const ring = this.createRing(j, j + 0.25, i / countRings);
      ring.name = `Ring-${i}`;
      this.mesh.add(ring);
    }
  }


  createRing(increaseInnerRadius, increaseOuterRadius, opacity) {
    const {saturn:{saturnringcolor, saturnringpattern}} = this.textures;

    const ringTexture = new THREE.TextureLoader().load(saturnringcolor);
    const ringBumpTexture = new THREE.TextureLoader().load(saturnringpattern);

    this.geometry = new THREE.RingBufferGeometry(this.radius + increaseInnerRadius, this.radius + increaseOuterRadius, 64);
    this.geometry.rotateX(THREE.Math.degToRad(-120));
    this.material = new THREE.MeshPhongMaterial();
    this.material.map = ringTexture;

    this.material.specularMap = ringBumpTexture;
    this.material.specular = new THREE.Color('grey');
    this.material.shininess = 0.1;
    this.material.transparent = true;
    this.material.opacity = opacity;

    this.material.side = THREE.DoubleSide;
    const mesh = new THREE.Mesh(this.geometry, this.material);
    mesh.layers.set(1);
    return mesh;
  }
}

export default Saturn;
