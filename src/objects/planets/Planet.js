import * as THREE from 'three';

import { settings } from "../../settings";
import {importAllTextures} from "../../helpers";
import {Orbit} from "../index";

class Planet extends THREE.Object3D {
  constructor(scene, parentPlanet) {
    super();

    this.scene = scene;
    this.textures = importAllTextures();

    this.className = this.constructor.name;
    this.parentPlanet = parentPlanet;

    const {name, radius, rotateSpeed, materialOptions} = this.getSettings();
    this.name = name;
    this.radius = typeof radius === 'function' ? radius.call(settings) : radius;
    this.rotateSpeed = rotateSpeed;
    this.materialOptions = materialOptions;

    this.init();
  }

  getSettings() {
    if (this.parentPlanet) {
      return settings[this.parentPlanet.className].sputniks[this.className];
    }
    return settings[this.className] || {};
  }

  init() {
    this.createPlanet();
    this.createOrbit();
  }

  createPlanet() {
    this.geometry = new THREE.SphereBufferGeometry(this.radius, 32, 32);
    this.material = new THREE.MeshPhongMaterial({...this.materialOptions});
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.name = this.name;
    this.material.shininess = 0;
  }

  createOrbit() {
    this.orbit = new Orbit(this.className, this.parentPlanet);
    this.mesh.position.x = this.orbit.radius;
    this.orbit.mesh.add(this.mesh);
    this.scene.add(this.orbit.mesh);
  }

  move() {
    this.mesh.rotation.y += this.rotateSpeed;
    this.orbit.move();
  }
}

export default Planet;
