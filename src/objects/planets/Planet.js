import * as THREE from 'three';

import { settings } from "../../settings";

class Planet extends THREE.Object3D {
  constructor(scene) {
    super();

    this.scene = scene;

    this.init();
  }

  init() {
    this.className = this.constructor.name.toLowerCase();

    const {name, radius, rotateSpeed, materialOptions} = settings[this.className];
    this.radius = radius;
    this.rotateSpeed = rotateSpeed;
    this.name = name;
    this.materialOptions = materialOptions;

    this.createPlanet();

  }

  createPlanet() {
    this.geometry = new THREE.SphereBufferGeometry(this.radius, 32, 32);
    this.material = new THREE.MeshPhongMaterial({...this.materialOptions});
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.name = this.name;
  }

  move(time) {
    time *= this.rotateSpeed;

    this.mesh.rotation.y = time;
  }
}

export default Planet;
