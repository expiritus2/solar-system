import * as THREE from 'three';

import { settings } from "../../settings";
import {importAllTextures} from "../../helpers";
import {Orbit} from "../index";

class Planet extends THREE.Object3D {
  constructor(scene, startAngleY) {
    super();

    this.scene = scene;
    this.startAngleY = startAngleY;
    this.textures = importAllTextures();

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
    this.orbit = new Orbit(this.className, this.startAngleY);
    this.orbit.mesh.add(this.mesh);

    this.mesh.position.x = this.orbit.radius;

    this.scene.add(this.orbit.mesh);
  }

  move() {
    this.mesh.rotation.y += this.rotateSpeed;
    this.orbit.move();
  }
}

export default Planet;
