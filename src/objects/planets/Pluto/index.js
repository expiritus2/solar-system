import * as THREE from 'three';

import {Orbit, Planet} from "../../";
import PlutoTexture from "../../../tex/pluto/plutomap.jpg";
import PlutoTextureBump from "../../../tex/pluto/plutobump.jpg";

class Pluto extends Planet{
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
    const texture = new THREE.TextureLoader().load(PlutoTexture);
    const bumpTexture = new THREE.TextureLoader().load(PlutoTextureBump);

    this.material.map = texture;
    this.material.bumpMap = bumpTexture;
    this.material.bumpScale = 0.05;
    this.material.shininess = 0.1;
  }

  move(time) {
    super.move(time);
    this.orbit.move(time);
  }
}

export default Pluto;
