import * as THREE from 'three';

import {PlanetName} from '../../objects';
import {settings} from "../../settings";
import {importAllTextures} from "../../helpers";

class Sun extends THREE.Object3D {
  constructor(scene) {
    super();

    this.scene = scene;
    this.textures = importAllTextures();
    this.className = this.constructor.name;

    const {name, radius, rotateSpeed} = settings[this.className];
    this.name = name;
    this.radius = radius;
    this.rotateSpeed = rotateSpeed;

    this.init();
  }

  init() {
    const {sun: {sunmap}} = this.textures;
    this.texture = new THREE.TextureLoader().load(sunmap);

    this.geometry = new THREE.SphereBufferGeometry(this.radius, 32, 32);
    this.material = new THREE.MeshPhongMaterial({
      emissive: 0xFEF3A9,
      emissiveMap: this.texture
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.name = this.name;

    const color = 0xFFFFFF;
    const intensity = 1.5;
    this.pointLight = new THREE.PointLight(color, intensity);
    this.pointLight.layers.set(1);
    this.pointLight.castShadow = true;
    this.pointLight.layers.set(1);
    this.mesh.layers.set(1);

    this.mesh.add(this.pointLight);
    this.mesh.layers.set(1);
    this.scene.add(this.mesh);

    this.displayTextName();
  }

  displayTextName() {
    const fontLoader = new THREE.FontLoader();
    fontLoader.load('../../../src/font/helvetiker_regular.typeface.json', (font) => {
      this.planetName = new PlanetName({text: this.name, font});
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
  }
}

export default Sun;
