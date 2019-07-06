import * as THREE from 'three';
import { Planet } from ".";
import SunTexture from '../tex/sun/sun.png';

const settings = {
  name: 'Sun',
  materialOptions: {
    emissive: 0xFFFF00,
  },
  radius: 3,
  rotateSpeed: 0.001
};

class Sun extends Planet {
  constructor(scene) {
    super(scene, settings);

    this.scene = scene;

    this.init();
  }

  init() {
    super.init();

    this.configureMaterial();

    const color = 0xFFFFFF;
    const intensity = 1;
    this.pointLight = new THREE.PointLight(color, intensity);
    this.scene.add(this.pointLight);

    // this.pointLightHelper = new THREE.PointLightHelper(this.pointLight, 4);
    // this.scene.add(this.pointLightHelper);
  }

  configureMaterial() {
    const texture = new THREE.TextureLoader().load(SunTexture);

    this.material.map = texture ? texture : null;
    // this.material.specular = new THREE.Color('grey');
    // this.material.depthWrite = false;
    // this.material.bumpScale = 0.05;
    // this.material.shininess = 0.1;
  }
}

export default Sun;
