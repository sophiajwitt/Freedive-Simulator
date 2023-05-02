import * as THREE from "../node_modules/three/build/three.module.js";
import * as YUKA from '../node_modules/yuka/build/yuka.module.js';
// import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
// import * as SkeletonUtils from '../node_modules/three/examples/jsm/utils/SkeletonUtils.js';

// scene
const scene = new THREE.Scene();
const loader = new THREE.TextureLoader();
scene.background = loader.load( 'images/ocean-floor.png' );

// renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 200 );
camera.position.set(0, 1, 2);
camera.lookAt(0, 0, 0);
scene.add(camera);

// light
const light = new THREE.AmbientLight(0xFFFFFF, 1.25, 100);
scene.add(light);

const vehicleGeometry = new THREE.ConeBufferGeometry(0.1, 0.5, 8);
vehicleGeometry.rotateX(Math.PI * 0.5);
const vehicleMaterial = new THREE.MeshNormalMaterial();
const vehicleMesh = new THREE.Mesh(vehicleGeometry, vehicleMaterial);
vehicleMesh.matrixAutoUpdate = false;
scene.add(vehicleMesh);

const vehicle = new YUKA.Vehicle();
vehicle.setRenderComponent(vehicleMesh, sync);

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

const followPathBehavior = new YUKA.FollowPathBehavior(path, 0.5);
vehicle.steering.add(followPathBehavior);

path.loop = true;

const onPathBehavior = new YUKA.OnPathBehavior(path);
onPathBehavior.radius = 0.8;
vehicle.steering.add(onPathBehavior);

const entityManager = new YUKA.EntityManager();
entityManager.add(vehicle);

const position = [];
for(let i=0; i < path._waypoints.length; i++) {
    const waypoint = path._waypoints[i];
    position.push(waypoint.x, waypoint.y, waypoint.z);
}

const lineGeometry = new THREE.BufferGeometry();
lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(position, 3));

const lineMaterial = new THREE.LineBasicMaterial({color: 0xFFFFFF});
const lines = new THREE.LineLoop(lineGeometry, lineMaterial);
scene.add(lines);

const time = new YUKA.Time();



function animate() {
	requestAnimationFrame( animate );

    const delta = time.update().getDelta();
    entityManager.update(delta);

	renderer.render( scene, camera );
}

animate();