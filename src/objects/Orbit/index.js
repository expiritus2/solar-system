import * as THREE from 'three';

import { settings } from "../../settings";

class Orbit extends THREE.Object3D {
  constructor(planetName, parentPlanet) {
    super();

    this.planetName = planetName;
    this.parentPlanet = parentPlanet;
    const {name, radius, rotateSpeed: orbitRotateSpeed, materialOptions, startAngleY = 0} = this.getOrbitSettings();

    this.startAngleY = startAngleY;
    this.radius = radius.call(settings);
    this.orbitRotateSpeed = orbitRotateSpeed;
    this.name = name;
    this.stop = false;

    this.segments = 64;
    this.materialOptions = materialOptions;

    this.init();
  }

  getOrbitSettings() {
    if (this.parentPlanet) {
      return settings[this.parentPlanet.className].sputniks[this.planetName].orbit || {};
    }
    return settings[this.planetName].orbit || {};
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
    this.mesh.layers.set(1);
  }

  move() {
    if(!this.stop) {
      this.mesh.rotation.y += this.orbitRotateSpeed;
    }
  }
}

export default Orbit;
