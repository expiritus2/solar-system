import {Orbit, Planet} from "../../index";
import * as THREE from "three";
import NeptuneTexture from "../../../tex/neptune/neptunemap.jpg";

class Neptune extends Planet {
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
    this.material.map = new THREE.TextureLoader().load(NeptuneTexture);
    this.material.shininess = 0.1;
  }

  move(time) {
    super.move(time);
    this.orbit.move(time);
  }
}

export default Neptune;
