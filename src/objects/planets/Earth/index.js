import * as THREE from 'three';

import {Planet} from "../..";

class Earth extends Planet {
  constructor(scene) {
    super(scene);

    this.className = this.constructor.name.toLowerCase();
  }

  init() {
    super.init();
    this.configureMaterial();
    this.createClouds();
  }

  configureMaterial() {
    const { earth: { earth, earthbump, earthspec } } = this.textures;
    const texture = new THREE.TextureLoader().load(earth);
    const bumpMapTexture = new THREE.TextureLoader().load(earthbump);
    const specularMap = new THREE.TextureLoader().load(earthspec);

    this.material.map = texture;
    this.material.bumpMap = bumpMapTexture;
    this.material.specularMap = specularMap;
    this.material.specular = new THREE.Color('grey');
    this.material.bumpScale = 0.05;
  }

  createClouds() {
    const { earth: { earthcloudmap } } = this.textures;

    this.cloudsMaterial = new THREE.MeshLambertMaterial({
      map: new THREE.TextureLoader().load(earthcloudmap),
      opacity: 0.1,
      transparent: true,
      depthWrite: false,
    });

    this.cloudMesh = new THREE.Mesh(this.geometry, this.cloudsMaterial);
    this.mesh.add(this.cloudMesh);
  }
}

export default Earth;
