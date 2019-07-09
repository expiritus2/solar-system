import * as THREE from 'three';
import { settings } from "../../settings";

class Sun extends THREE.Object3D {
  constructor(scene) {
    super();

    this.scene = scene;
    this.className = this.constructor.name.toLowerCase();

    this.init();
  }

  init() {
    const { name, radius } = settings[this.className];

    this.geometry = new THREE.SphereBufferGeometry(radius, 32, 32);
    this.material = new THREE.MeshPhongMaterial({emissive: 0xFFFF00});
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.name = name;
    this.scene.add(this.mesh);

    const color = 0xFFFFFF;
    const intensity = 1.5;
    this.pointLight = new THREE.PointLight(color, intensity);
    this.scene.add(this.pointLight);
  }

  move(time) {
    time *= settings[this.className].rotateSpeed;

    this.mesh.rotation.y = time;
  }
}

export default Sun;
