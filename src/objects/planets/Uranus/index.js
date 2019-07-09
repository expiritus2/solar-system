import {Orbit, Planet} from "../../index";
import * as THREE from "three";
import UranusTexture from "../../../tex/uranus/uranusmap.jpg";
import UranusColorTexture from "../../../tex/uranus/uranusringcolour.jpg";
import UranusBumpTexture from "../../../tex/uranus/uranusringtrans.gif";

class Uranus extends Planet {
  constructor(scene) {
    super(scene);

    this.className = this.constructor.name.toLowerCase();
  }

  init() {
    super.init();
    this.createOrbit();
    this.configureMaterial();
  }

  createOrbit() {
    this.orbit = new Orbit(this.className);
    this.orbit.mesh.add(this.mesh);

    this.mesh.position.x = this.orbit.radius;

    this.scene.add(this.orbit.mesh);
  }

  configureMaterial() {
    this.material.map = new THREE.TextureLoader().load(UranusTexture);
    this.material.specular = new THREE.Color('grey');
    this.material.shininess = 0.1;

    this.createRings(20);
  }

  createRings(countRings) {
    for(let i = 1, j = 0.2; i <= countRings; i++, j+=0.1) {
      const ring = this.createRing(j, j + 0.05, i / countRings);
      this.mesh.add(ring);
    }
  }

  createRing(increaseInnerRadius, increaseOuterRadius, opacity) {
    const ringTexture = new THREE.TextureLoader().load(UranusColorTexture);
    const ringBumpTexture = new THREE.TextureLoader().load(UranusBumpTexture);

    this.geometry = new THREE.RingBufferGeometry(this.radius + increaseInnerRadius, this.radius + increaseOuterRadius, 64);
    this.material = new THREE.MeshPhongMaterial();
    this.material.map = ringTexture;

    this.material.specularMap = ringBumpTexture ? ringBumpTexture : null;
    this.material.specular = new THREE.Color('grey');
    this.material.shininess = 0.1;
    this.material.transparent = true;
    this.material.opacity = opacity;

    this.material.side = THREE.DoubleSide;
    return new THREE.Mesh(this.geometry, this.material);
  }

  move(time) {
    super.move(time);
    this.orbit.move(time);
  }
}

export default Uranus;
