import * as THREE from 'three';

import {Planet} from "../../";
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
