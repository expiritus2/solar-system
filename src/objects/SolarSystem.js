import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';
import {Earth, Sun, Galaxy, Saturn, Mercury, Venus, Mars, Jupiter, Uranus, Neptune, Pluto} from ".";
import {settings} from "../settings";

const ENTIRE_SCENE = 0, BLOOM_SCENE = 1;

class SolarSystem extends THREE.Object3D {
  constructor() {
    super();

    this.planets = [];

    this.init();

    this.mouse = new THREE.Vector3();
  }

  init() {
    this.createRenderer();
    this.createScene();

    this.createGalaxy();
    this.createPlanets();

    this.createCamera();
    this.createControls();
    this.createLights();
    this.createEventListeners();
    this.createRayCaster();

    this.render(0);
  }

  createRenderer() {
    this.canvas = document.getElementById('canvas');
    this.renderer = new THREE.WebGLRenderer({canvas: this.canvas, antialias: true});
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.shadowMap.enabled = true;
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
    this.controls.target.copy(this.sun.position);
    this.controls.minDistance = settings.Sun.radius + 2;
    this.controls.maxDistance = 100;
  }

  createLights() {
    this.ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    this.ambientLight.layers.set(1);
    this.scene.add(this.ambientLight);

    this.ambientLight2 = new THREE.AmbientLight(0x404040, 5);
    this.ambientLight2.layers.set(2);
    this.scene.add(this.ambientLight2);

    this.pointLight2 = new THREE.PointLight(0xFFFFFF, 1.5);
    this.pointLight2.layers.set(2);
    this.scene.add(this.pointLight2);
  }

  createRayCaster() {
    this.raycaster = new THREE.Raycaster();
  }

  createEventListeners() {
    this.renderer.domElement.addEventListener('click', this.onMouseClick.bind(this), false);
    this.renderer.domElement.addEventListener('mousemove', this.onMouseMove.bind(this), false);
  }

  onMouseClick(event) {
    this.processRayCaster(event, 'click');

    if(!this.selectedObject.name.match(/Galaxy/)) {
      // this.controls.target.set(-this.selectedObject.position.x, this.selectedObject.position.y, this.selectedObject.position.z);
      // this.controls.target.set(this.selectedObject.position.x, this.selectedObject.position.y, 0);
    }
  }

  onMouseMove(event) {
    this.processRayCaster(event);
    if (this.selectedObject && !this.selectedObject.name.match(/(Orbit|Galaxy|Ring|Moon|Phobos|Deimos)/i)) {
      this.selectedObject.layers.set(2);
    }
  }

  processRayCaster(event, type) {
    this.convertMousePosTo3dWorldPos(event);
    this.raycaster.setFromCamera(this.mouse, this.camera);

    this.intersects = this.raycaster.intersectObjects(this.scene.children, true);
    this.getObject(type);
  }

  getObject(type) {
    if (this.intersects.length > 0) {
      const object = this.intersects.filter(function (res) {
        return res && res.object;
      })[0];

      this.selectedObject = (object && object.object) || null;
    }

    if(type === 'click') {
      this.clickedObject = this.selectedObject;
    }
  }

  convertMousePosTo3dWorldPos(event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    this.mouse.z = 0.5;
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
      if (this.selectedObject && this.selectedObject.name !== planet.mesh.name) {
        planet.traverse(node => {
          node.mesh.layers.set(1);
        });
      }

      planet.move();
    });

    if(this.selectedObject && this.selectedObject.name === settings.Sun.name) {
      this.ambientLight2.intensity = 1;
    } else {
      this.ambientLight2.intensity = 5;
    }

    this.renderer.autoClear = true;

    this.camera.layers.set(1);
    this.renderer.render(this.scene, this.camera);

    this.renderer.autoClear = false;

    this.camera.layers.set(2);
    this.renderer.render(this.scene, this.camera);

    this.controls.update();

    requestAnimationFrame(this.render.bind(this))
  }
}

export default SolarSystem;
