import * as THREE from "three";

import {Planet} from "../../index";

class Uranus extends Planet {
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
    const {uranus:{uranusmap}} = this.textures;

    this.material.map = new THREE.TextureLoader().load(uranusmap);
    this.material.specular = new THREE.Color('grey');

    this.createRings(20);
  }

  createRings(countRings) {
    for(let i = 1, j = 0.2; i <= countRings; i++, j+=0.1) {
      const ring = this.createRing(j, j + 0.05, i / countRings);
      this.mesh.add(ring);
    }
  }

  createRing(increaseInnerRadius, increaseOuterRadius, opacity) {
    const {uranus:{uranusringcolour, uranusringtrans}} = this.textures;

    const ringTexture = new THREE.TextureLoader().load(uranusringcolour);
    const ringBumpTexture = new THREE.TextureLoader().load(uranusringtrans);

    this.geometry = new THREE.RingBufferGeometry(this.radius + increaseInnerRadius, this.radius + increaseOuterRadius, 64);
    this.material = new THREE.MeshPhongMaterial();
    this.material.map = ringTexture;

    this.material.specularMap = ringBumpTexture;
    this.material.specular = new THREE.Color('grey');
    this.material.shininess = 0.1;
    this.material.transparent = true;
    this.material.opacity = opacity;

    this.material.side = THREE.DoubleSide;
    const ringMesh = new THREE.Mesh(this.geometry, this.material);
    ringMesh.layers.set(1);
    return ringMesh;
  }
}

export default Uranus;
