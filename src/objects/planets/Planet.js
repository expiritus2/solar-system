import * as THREE from 'three';

import { settings } from "../../settings";
import {importAllTextures} from "../../helpers";
import {Orbit, PlanetName} from "../index";

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
    this.textSize = 1;

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
    this.displayTextName();
  }

  createPlanet() {
    this.geometry = new THREE.SphereBufferGeometry(this.radius, 32, 32);
    this.material = new THREE.MeshPhongMaterial({...this.materialOptions});
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.mesh.name = this.name;
    this.material.shininess = 0;
  }

  createOrbit() {
    this.orbit = new Orbit(this.className, this.parentPlanet);
    this.mesh.position.x = this.orbit.radius;
    this.mesh.layers.set(1);

    this.mesh.geometry.centroid = new THREE.Vector3();
    this.orbit.mesh.add(this.mesh);
    this.scene.add(this.orbit.mesh);
  }


  displayTextName() {
    const fontLoader = new THREE.FontLoader();
    fontLoader.load('../../../src/font/helvetiker_regular.typeface.json', (font) => {
      this.planetName = new PlanetName({text: this.name, font, size: this.textSize});
      this.updateTextNamePosition();
      this.scene.add(this.planetName.mesh);
    })
  }

  updateTextNamePosition() {
    if(this.planetName) {
      this.planetName.mesh.position.setFromMatrixPosition(this.mesh.matrixWorld);
      this.planetName.mesh.position.y += this.radius + 1;
      this.planetName.align();
    }
  }

  move() {
    this.mesh.rotation.y += this.rotateSpeed;
    this.orbit.move();
    this.updateTextNamePosition();
  }
}

export default Planet;
