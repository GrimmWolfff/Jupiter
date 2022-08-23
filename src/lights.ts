import * as THREE from 'three';

export default class Lights {
    ambientLight: THREE.AmbientLight;
    directionalLight: THREE.DirectionalLight;
    constructor() {
        this.ambientLight = new THREE.AmbientLight(0xffffff, 1);
        this.directionalLight = new THREE.DirectionalLight(0x00fffc, 3);
    }
    lightOn() {
        this.directionalLight.position.set(0, 5, 0);
        return [this.ambientLight, this.directionalLight];
    }
}