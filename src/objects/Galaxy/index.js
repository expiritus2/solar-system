import * as THREE from 'three';
import GalaxyTexture from '../../tex/galaxy/galaxy.png';

import { settings } from "../../settings";

class Galaxy {
  constructor(scene, renderer) {
    this.className = this.constructor.name;

    this.scene = scene;
    this.renderer = renderer;
    this.canvasWidth = this.renderer.domElement.clientWidth;
    this.canvasHeight = this.renderer.domElement.clientHeight;

    this.settings = this.getSettings();

    this.init();
  }

  getSettings() {
    return settings[this.className]
  }

  init() {
    this.loader = new THREE.TextureLoader();

    this.loader.load(GalaxyTexture, (texture) => {
      this.texture = texture;
      this.texture.wrapS = THREE.RepeatWrapping;
      this.texture.wrapT = THREE.RepeatWrapping;

      this.textureWidth = this.texture.image.width;
      this.textureHeight = this.texture.image.height;
      this.repeatTexture();

      this.geometry = new THREE.SphereBufferGeometry(this.settings.radius, 32, 32);
      this.material = new THREE.MeshBasicMaterial();
      this.material.map = this.texture;
      this.material.side = THREE.BackSide;

      this.mesh = new THREE.Mesh(this.geometry, this.material);
      this.mesh.name = 'Galaxy';
      this.scene.add(this.mesh);
    });
  }

  repeatTexture() {
    this.texture.repeat.set((this.canvasWidth / this.textureWidth) + 1, (this.canvasHeight / this.textureHeight) + 10);
  }

  resize() {
    if(this.texture) {
      this.canvasWidth = this.renderer.domElement.clientWidth;
      this.canvasHeight = this.renderer.domElement.clientHeight;
      this.repeatTexture();
    }
  }
}

export default Galaxy;
