import * as THREE from 'three';

export default class Jupiter {
    mesh: THREE.Mesh;
    textureLoader = new THREE.TextureLoader();
    material: THREE.MeshBasicMaterial;
    constructor() {
        this.textureLoader = new THREE.TextureLoader();
        this.material = this.Material();
        this.mesh = new THREE.Mesh(new THREE.SphereGeometry( 1.5, 128, 64 ), this.material);
    }
    private Material(): THREE.MeshBasicMaterial {
        const jupiter = this.textureLoader.load('/jupiter.png');
        const material = new THREE.MeshBasicMaterial({ map: jupiter });
        return material;
    }
    GetJupiter() {
        return this.mesh;
    }
    rotate() {
        this.mesh.rotation.y += 0.01;
    }
}