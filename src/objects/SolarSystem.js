import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';
import {Earth, Sun, Galaxy, Saturn, Mercury, Venus, Mars, Jupiter, Uranus, Neptune, Pluto} from ".";
import { settings } from "../settings";

class SolarSystem extends THREE.Object3D {
  constructor() {
    super();

    this.planets = [];

    this.init();
  }

  init() {
    this.createRenderer();
    this.createScene();

    this.createGalaxy();
    this.createPlanets();

    this.createCamera();
    this.createControls();
    this.createLights();

    this.render(0);
  }

  createRenderer() {
    this.canvas = document.getElementById('canvas');
    this.renderer = new THREE.WebGLRenderer({canvas: this.canvas, antialias: true});
  }

  createScene() {
    this.scene = new THREE.Scene();
  }

  createCamera() {
    const horizontalFov = 90;
    const aspect = this.canvas.clientWidth / this.canvas.clientHeight;
    const fov = (Math.atan(Math.tan(((horizontalFov / 2) * Math.PI) / 180) / aspect) * 2 * 180) / Math.PI;
    const near = 0.1;
    const far = 1000;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.set(0, 20, 50);
    this.camera.lookAt(this.sun.position);
  }

  createGalaxy() {
    this.galaxy = new Galaxy(this.scene, this.renderer);
  }

  createPlanets() {
    this.sun = new Sun(this.scene);
    this.mercury = new Mercury(this.scene);
    this.venus = new Venus(this.scene);
    this.earth = new Earth(this.scene);
    this.mars = new Mars(this.scene);
    this.jupiter = new Jupiter(this.scene);
    this.saturn = new Saturn(this.scene);
    this.uranus = new Uranus(this.scene);
    this.neptune = new Neptune(this.scene);
    this.pluto = new Pluto(this.scene);

    this.planets.push(this.sun);
    this.planets.push(this.mercury);
    this.planets.push(this.venus);
    this.planets.push(this.earth);
    this.planets.push(this.mars);
    this.planets.push(this.jupiter);
    this.planets.push(this.saturn);
    this.planets.push(this.uranus);
    this.planets.push(this.neptune);
    this.planets.push(this.pluto);
  }

  createControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.controls.enablePan = false;
    this.controls.target.set(this.sun.position.x, this.sun.position.y, this.sun.position.z);
    this.controls.minDistance = settings.sun.radius + 2;
    this.controls.maxDistance = 90;
  }

  createLights() {
    this.ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    this.scene.add(this.ambientLight);

    this.ambientLightHelper = new THREE.PointLightHelper(this.ambientLight, 1);
    this.scene.add(this.ambientLightHelper);
  }

  resizeRendererToDisplaySize() {
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;

    const needResize = this.canvas.width !== width || this.canvas.height !== height;

    if (needResize) {
      this.renderer.setSize(width, height, false);
    }

    return needResize;
  }

  render(time) {
    if (this.resizeRendererToDisplaySize()) {
      this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
      this.camera.updateProjectionMatrix();
      this.galaxy.resize();
    }

    this.planets.forEach(planet => {
      planet.move();
    });

    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame(this.render.bind(this))
  }
}

export default SolarSystem;
