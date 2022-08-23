import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Particles from './particles';
import Jupiter from './jupiter';
import Lights from './lights';

interface sizes { width: number, height: number }

export default class Main {
  sizes: sizes;
  canvas: any;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  listener: THREE.AudioListener;
  sound: THREE.PositionalAudio;
  audioLoader: THREE.AudioLoader;
  jupiter: Jupiter;
  lights: any[];
  renderer: THREE.WebGLRenderer;
  controls: any;
  particles: THREE.Points;
  constructor() {
    this.sizes     = { width: window.innerWidth, height: window.innerHeight };
    this.canvas    = document.querySelector('#canvas');
    this.scene     = new THREE.Scene();
    this.camera    = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 100);
    
    this.listener  = new THREE.AudioListener();
    this.audioLoader = new THREE.AudioLoader();
    this.sound     = new THREE.PositionalAudio(this.listener);
    
    this.jupiter   = new Jupiter();
    this.lights    = new Lights().lightOn();
    this.renderer  = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.controls  = new OrbitControls(this.camera, this.canvas);
    this.particles = new Particles(1000).draw();
  }


  draw(): void {
    this.camera.position.z = 5;
    this.scene.add(this.camera, this.particles, this.jupiter.GetJupiter(), this.lights[0], this.lights[1]);
    
    this.camera.add(this.listener);
    this.audioLoader.load( '/Jupiter2001.wav', buffer => {
      this.sound.setBuffer(buffer);
      this.sound.setRefDistance( 10 );
      this.sound.play();
    });

    this.jupiter.mesh.add(this.sound);

    
    this.controls.enableDamping = true;
    this.renderer.setSize(this.sizes.width, this.sizes.height);
  }

  update(): void {
    this.jupiter.rotate();
    this.renderer.render(this.scene, this.camera);
    this.controls.update()
  }

  handleResize():void {
    // Update sizes
    this.sizes.width = window.innerWidth;
    this.sizes.height = window.innerHeight;

    // Update camera
    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();

    // Update renderer
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
}

const main = new Main();
window.addEventListener('resize', () => main.handleResize());

window.addEventListener('load', () => {
  main.draw();
  function animate() {
    main.update();
    window.requestAnimationFrame(animate);
  }
  animate();
});
