import * as THREE from 'three';

class Orbit extends THREE.Object3D {
  constructor(settings) {
    super();

    const {name, radius, rotateSpeed, materialOptions} = settings;

    this.radius = radius;
    this.rotateSpeed = rotateSpeed;
    this.name = name;

    this.segments = 32;
    this.materialOptions = materialOptions;

    this.init();
  }

  init() {
    this.geometry = new THREE.SphereBufferGeometry(this.radius, this.segments, this.segments);
    this.material = new THREE.MeshPhongMaterial({
      transparent: true,
      opacity: 0,
      depthWrite: false,
      ...this.materialOptions,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.name = this.name;
  }

  move(time) {
    time *= this.rotateSpeed;

    this.mesh.rotation.y = time;
  }
}

export default Orbit;
