import * as THREE from "three";
//import { Flow } from "https://cdn.skypack.dev/three/examples/jsm/modifiers/CurveModifier.js";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
//import { OrbitControls } from "https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js";
//import transformSVGPath from "https://000680810.codepen.website/scripts/transformSVGPath.js";

// base fish animation code inspired by https://frontend.horse/episode/making-a-fish-swim-with-three-js

// Variables 
let manta;


// SCENE
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222299);


// Renderer Settings
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Camera settings
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.01,
	2000
);
camera.position.set(0, 1, 2);
camera.lookAt(0, 0, 0);
scene.add(camera);


// Light settings
let ambLight = new THREE.AmbientLight(0xffffff, 1.25, 100);
scene.add(ambLight);



const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}


// Load settings
const loader = new GLTFLoader();

// Manta from https://poly.pizza/m/yzD8b7ZHZm

loader.load("Manta-ray.glb", 
(gltf) => {
    manta = gltf.scene;
    gltf.scene.scale.set(100, 100, 100); 
    const root = gltf.scene;
    scene.add(root);
    // scene.add(manta);
});

animate()