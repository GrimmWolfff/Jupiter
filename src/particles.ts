import * as THREE from 'three';

export default class Particles {
    particles: THREE.Points;
    count: number;
    positions = new Float32Array;
    
    constructor(count: number) {
        this.count = count;
        this.positions = new Float32Array(this.count * 3);
        this.particles = new THREE.Points(this.Geometry(),  new THREE.PointsMaterial({ size: 0.02, sizeAttenuation: true }) );
    }

    private Geometry(): THREE.BufferGeometry {
        const particlesGeometry = new THREE.BufferGeometry();
        for(let i = 0; i < this.count * 3; i++) {
            this.positions[i] = (Math.random() - 0.5) * 100;
        }
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
        return particlesGeometry;
    }
    draw() {
        return this.particles;
    }
}