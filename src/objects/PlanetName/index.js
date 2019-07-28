import * as THREE from 'three';

class PlanetName {
  constructor(props) {
    const {text, font, color = 0xffffff, size = 2} = props;
    this.text = text;
    this.font = font;
    this.color = color;
    this.size = size;

    this.create();
  }

  create() {
    this.shapes = this.font.generateShapes(this.text, this.size);
    this.material = new THREE.MeshBasicMaterial({color: this.color, side: THREE.DoubleSide});
    this.geometry = new THREE.ShapeBufferGeometry(this.shapes);
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.layers.set(1);

    this.align();
  }

  align() {
    this.geometry.computeBoundingBox();

    const xMid = -0.5
      * (this.geometry.boundingBox.max.x - this.geometry.boundingBox.min.x);
    this.mesh.position.setX(this.mesh.position.x + xMid);
  }
}

export default PlanetName;
