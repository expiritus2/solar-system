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
    this.camera.position.set(0, 20, 60);
    this.camera.lookAt(this.sun.position);
  }

  createGalaxy() {
    this.galaxy = new Galaxy(this.scene, this.renderer);
  }

  createPlanets() {
    this.sun = new Sun(this.scene);

    this.planets = [
      this.sun,
      new Mercury(this.scene),
      new Venus(this.scene),
      new Earth(this.scene),
      new Mars(this.scene),
      new Jupiter(this.scene),
      new Saturn(this.scene),
      new Uranus(this.scene),
      new Neptune(this.scene),
      new Pluto(this.scene)
    ];
  }

  createControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.controls.enablePan = false;
    this.controls.target.set(this.sun.position.x, this.sun.position.y, this.sun.position.z);
    this.controls.minDistance = settings.Sun.radius + 2;
    this.controls.maxDistance = 100;
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

  render() {
    if (this.resizeRendererToDisplaySize()) {
      this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
      this.camera.updateProjectionMatrix();
      this.galaxy.resize();
    }

    this.planets.forEach(planet => {
      planet.move();
    });

    this.renderer.render(this.scene, this.camera);
    this.controls.update();

    requestAnimationFrame(this.render.bind(this))
  }
}

export default SolarSystem;
