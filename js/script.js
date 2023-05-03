// with help from: https://www.youtube.com/watch?v=eTA3VLEekAo&list=PLjcjAqAnHd1EIxV4FSZIiJZvsdrBc1Xho&index=18

import * as THREE from "../node_modules/three/build/three.module.js";
import * as YUKA from '../node_modules/yuka/build/yuka.module.js';
import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';

// scene
const scene = new THREE.Scene();
const loader = new THREE.TextureLoader();
scene.background = loader.load( 'images/ocean-floor.png' );

// renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// camera
const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 200 );
camera.position.set(10, 1, 2);
camera.lookAt(1, 0, 0);
scene.add(camera);

// light
const light = new THREE.AmbientLight(0xFFFFFF, 1.25, 100);
scene.add(light);
const ambientLight = new THREE.AmbientLight(0xFFFFFFF);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
directionalLight.position.set(0, 10, 10);
scene.add(directionalLight);

const vehicle = new YUKA.Vehicle();


function sync(entity, renderComponent) {
    renderComponent.matrix.copy(entity.worldMatrix);
}

const path = new YUKA.Path();
path.add(new YUKA.Vector3(-4, 0, 4));
path.add(new YUKA.Vector3(-6, 0, 0));
path.add(new YUKA.Vector3(-4, 0, -4));
path.add(new YUKA.Vector3(0, 0, 0));
path.add(new YUKA.Vector3(4, 0, -4));
path.add(new YUKA.Vector3(6, 0, 0));
path.add(new YUKA.Vector3(4, 0, 4));
path.add(new YUKA.Vector3(0, 0, 6));

vehicle.position.copy(path.current());
vehicle.maxSpeed = 3;

const followPathBehavior = new YUKA.FollowPathBehavior(path, 3);
vehicle.steering.add(followPathBehavior);

path.loop = true;

path.color = 0x000046;

const onPathBehavior = new YUKA.OnPathBehavior(path);
vehicle.steering.add(onPathBehavior);

const entityManager = new YUKA.EntityManager();
entityManager.add(vehicle);

// manta
const manta = new GLTFLoader();
manta.load('images/Manta-ray.glb', function(glb) {
    const model = glb.scene;
    scene.add(model);
    model.matrixAutoUpdate = false;
    vehicle.scale = new YUKA.Vector3(0.5, 0.5, 0.5);
    vehicle.setRenderComponent(model, sync);
});




const position = [];
for(let i=0; i < path._waypoints.length; i++) {
    const waypoint = path._waypoints[i];
    position.push(waypoint.x, waypoint.y, waypoint.z);
}

const lineGeometry = new THREE.BufferGeometry();
lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(position, 3));

const lineMaterial = new THREE.LineBasicMaterial({color: 0xFFFFFF});
const lines = new THREE.LineLoop(lineGeometry, lineMaterial);

const time = new YUKA.Time();



function animate() {
	requestAnimationFrame( animate );

    const delta = time.update().getDelta();
    entityManager.update(delta);

	renderer.render( scene, camera );
}

animate();