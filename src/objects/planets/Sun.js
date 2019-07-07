import * as THREE from 'three';

const settings = {
  name: 'Sun',
  materialOptions: {
    emissive: 0xFFFF00,
  },
  radius: 3,
  rotateSpeed: 0.001
};

class Sun extends THREE.Object3D {
  constructor(scene) {
    super();

    this.scene = scene;

    this.init();
  }

  init() {
    this.geometry = new THREE.SphereBufferGeometry(settings.radius, 32, 32);
    this.material = new THREE.MeshPhongMaterial(settings.materialOptions);
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.name = settings.name;
    this.scene.add(this.mesh);

    const color = 0xFFFFFF;
    const intensity = 1.5;
    this.pointLight = new THREE.PointLight(color, intensity);
    this.scene.add(this.pointLight);
  }

  move(time) {
    time *= settings.rotateSpeed;

    this.mesh.rotation.y = time;
  }
}

export default Sun;
