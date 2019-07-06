import * as THREE from 'three';

import EarthTexture from '../tex/earth/earth.jpg';
import EarthBumpTexture from '../tex/earth/earthbump.jpg';
import EarthSpecTexture from '../tex/earth/earthspec.jpg';
import EarthColorCloud from '../tex/earth/earthcloudmap.jpg';

import {Planet} from ".";

const settings = {
  name: 'Earth',
  radius: 1,
  rotateSpeed: 0.0001
};

class Earth extends Planet {
  constructor(scene) {
    super(scene, settings);

    this.init();
  }

  init() {
    super.init();
    this.configureMaterial();

    this.mesh.position.x = 10;
  }

  configureMaterial() {
    const texture = new THREE.TextureLoader().load(EarthTexture);
    const bumpMapTexture = new THREE.TextureLoader().load(EarthBumpTexture);
    const specularMap = new THREE.TextureLoader().load(EarthSpecTexture);

    this.material.map = texture ? texture : null;
    this.material.bumpMap = bumpMapTexture ? bumpMapTexture : null;
    this.material.specularMap = specularMap ? specularMap : null;
    this.material.specular = new THREE.Color('grey');
    this.material.depthWrite = false;
    this.material.bumpScale = 0.05;
    this.material.shininess = 0.1;

    this.cloudsMaterial = new THREE.MeshLambertMaterial({
      map: new THREE.TextureLoader().load(EarthColorCloud),
      opacity: 0.1,
      transparent: true,
      depthWrite: false,
    });

    this.cloudMesh = new THREE.Mesh(this.geometry, this.cloudsMaterial);
    this.mesh.add(this.cloudMesh);
  }
}

export default Earth;
