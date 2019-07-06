import * as THREE from 'three';

class Planet extends THREE.Object3D {
  constructor(scene, settings) {
    super();

    const {name, radius, rotateSpeed, materialOptions} = settings;

    this.scene = scene;
    this.radius = radius;
    this.rotateSpeed = rotateSpeed;
    this.name = name;

    this.segments = 32;
    this.materialOptions = materialOptions;

    this.init();
  }

  init() {
    this.geometry = new THREE.SphereBufferGeometry(this.radius, this.segments, this.segments);
    this.material = new THREE.MeshPhongMaterial({...this.materialOptions});
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.name = this.name;
    this.scene.add(this.mesh);
  }

  move(time) {
    time *= this.rotateSpeed;

    this.mesh.rotation.y = time;
  }
}

export default Planet;
