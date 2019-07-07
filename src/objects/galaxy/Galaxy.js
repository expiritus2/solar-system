import * as THREE from 'three';
import GalaxyTexture from '../../tex/galaxy/galaxy.png';

const settings = {
  radius: 200
};

class Galaxy {
  constructor(scene, renderer) {
    this.scene = scene;
    this.renderer = renderer;

    this.init();
  }

  init() {
    this.texture = new THREE.TextureLoader().load(GalaxyTexture);
    this.texture.wrapS = THREE.RepeatWrapping;
    this.texture.wrapT = THREE.RepeatWrapping;

    this.geometry = new THREE.SphereBufferGeometry(settings.radius, 32, 32);
    this.material = new THREE.MeshBasicMaterial();
    this.material.map = this.texture;
    this.material.side = THREE.BackSide;

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.name = 'Galaxy';
    this.scene.add(this.mesh);
  }

  resize() {
    console.log('resize');
    const width = this.renderer.domElement.clientWidth;
    const height = this.renderer.domElement.clientHeight;
    this.texture.repeat.set((width / 184), (height / 123));
    // 184 x 123
  }
}

export default Galaxy;
