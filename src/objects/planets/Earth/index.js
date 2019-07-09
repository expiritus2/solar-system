import * as THREE from 'three';

import EarthTexture from '../../../tex/earth/earth.jpg';
import EarthBumpTexture from '../../../tex/earth/earthbump.jpg';
import EarthSpecTexture from '../../../tex/earth/earthspec.jpg';
import EarthColorCloud from '../../../tex/earth/earthcloudmap.jpg';

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
    const texture = new THREE.TextureLoader().load(EarthTexture);
    const bumpMapTexture = new THREE.TextureLoader().load(EarthBumpTexture);
    const specularMap = new THREE.TextureLoader().load(EarthSpecTexture);

    this.material.map = texture;
    this.material.bumpMap = bumpMapTexture;
    this.material.specularMap = specularMap;
    this.material.specular = new THREE.Color('grey');
    this.material.bumpScale = 0.05;
    this.material.shininess = 0.1;
  }

  createClouds() {
    this.cloudsMaterial = new THREE.MeshLambertMaterial({
      map: new THREE.TextureLoader().load(EarthColorCloud),
      opacity: 0.1,
      transparent: true,
      depthWrite: false,
    });

    this.cloudMesh = new THREE.Mesh(this.geometry, this.cloudsMaterial);
    this.mesh.add(this.cloudMesh);
  }

  move(time) {
    super.move(time);
    this.orbit.move(time);
  }
}

export default Earth;
