import * as THREE from 'three';

import {SaturnOrbit, Planet} from "..";
import SaturnTexture from '../../tex/saturn/saturnmap.jpg';
import RingColorTexture from '../../tex/saturn/saturnringcolor.jpg';
import RingBumpTexture from '../../tex/saturn/saturnringpattern.gif';

const settings = {
  name: 'Saturn',
  radius: 2,
  rotateSpeed: -0.0003
};

class Saturn extends Planet {
  constructor(scene) {
    super(scene, settings);
  }

  init() {
    super.init();
    this.configureMaterial();

    this.saturnOrbit = new SaturnOrbit();
    this.saturnOrbit.mesh.add(this.mesh);

    this.mesh.position.x = this.saturnOrbit.radius;

    this.scene.add(this.saturnOrbit.mesh);
  }


  configureMaterial() {
    const texture = new THREE.TextureLoader().load(SaturnTexture);

    this.material.map = texture ? texture : null;
    this.material.specular = new THREE.Color('grey');
    this.material.shininess = 0.1;

    this.firstRing = this.createRing(2.5, 3);
    this.secondRing = this.createRing(3.5, 4);
    this.thirdRing = this.createRing(4.5, 5);

    this.mesh.add(this.firstRing);
    this.mesh.add(this.secondRing);
    this.mesh.add(this.thirdRing);
  }

  createRing(innerRadius, outerRadius) {
    const ringTexture = new THREE.TextureLoader().load(RingColorTexture);
    const ringBumpTexture = new THREE.TextureLoader().load(RingBumpTexture);

    this.geometry = new THREE.RingBufferGeometry(innerRadius, outerRadius, 64);
    this.geometry.rotateX(THREE.Math.degToRad(-120));
    this.material = new THREE.MeshPhongMaterial();
    this.material.map = ringTexture ? ringTexture : null;

    this.material.specularMap = ringBumpTexture ? ringBumpTexture : null;
    this.material.specular = new THREE.Color('grey');
    this.material.shininess = 0.1;

    this.material.side = THREE.DoubleSide;
    return new THREE.Mesh(this.geometry, this.material);
  }

  move(time) {
    super.move(time);
    this.saturnOrbit.move(time);
  }
}

export default Saturn;
