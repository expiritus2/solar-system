import * as THREE from 'three';

import { settings } from "../../settings";

class Orbit extends THREE.Object3D {
  constructor(planetName) {
    super();

    this.planetName = planetName;
    const {name, radius, rotateSpeed, materialOptions, startAngleY = 0} = settings[this.planetName].orbit;

    this.startAngleY = startAngleY;
    this.radius = radius;
    this.rotateSpeed = rotateSpeed;
    this.name = name;

    this.segments = 64;
    this.materialOptions = materialOptions;

    this.init();
  }

  init() {
    this.geometry = new THREE.RingGeometry(this.radius, this.radius + 0.05, this.segments);
    this.geometry.rotateX(THREE.Math.degToRad(90));
    this.material = new THREE.MeshPhongMaterial({
      transparent: true,
      opacity: 1,
      depthWrite: false,
      side: THREE.DoubleSide,
      ...this.materialOptions,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.name = this.name;

    this.mesh.rotation.y = THREE.Math.degToRad(this.startAngleY);
  }

  move() {
    this.mesh.rotation.y += this.rotateSpeed;
  }
}

export default Orbit;
