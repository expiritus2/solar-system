import * as THREE from 'three';
import { settings } from "../../settings";
import {importAllTextures} from "../../helpers";

class Sun extends THREE.Object3D {
  constructor(scene) {
    super();

    this.scene = scene;
    this.textures = importAllTextures();
    this.className = this.constructor.name;

    const { rotateSpeed } = settings[this.className];
    this.rotateSpeed = rotateSpeed;

    this.init();
  }

  init() {
    const { name, radius } = settings[this.className];
    const { sun: {sunmap}} = this.textures;
    this.texture = new THREE.TextureLoader().load(sunmap);

    this.geometry = new THREE.SphereBufferGeometry(radius, 32, 32);
    this.material = new THREE.MeshPhongMaterial({
      emissive: 0xFEF3A9,
      emissiveMap: this.texture
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.name = name;
    // this.scene.add(this.mesh);

    const color = 0xFFFFFF;
    const intensity = 1.5;
    this.pointLight = new THREE.PointLight(color, intensity);
    this.pointLight.castShadow = true;

    this.mesh.add(this.pointLight);
    this.scene.add(this.mesh);
  }

  move() {
    this.mesh.rotation.y += this.rotateSpeed;
  }
}

export default Sun;
