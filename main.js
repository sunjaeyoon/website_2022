import './style.css';
import * as THREE from 'three';
import { GUI } from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
//import Stats from 'three/examples/jsm/libs/stats.module';

//Global Animation Object
var gridHelper;
var plane;

//Global Variables

//----------- Object Function
function createImage() {
  const geometry = new THREE.PlaneGeometry(10,10,10,10);
  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    //side: THREE.DoubleSide,
    size: 0.01
  })
  /*
  const material = new THREE.ShaderMaterial(
    {
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        value: new THREE.TextureLoader().load('./image/')
      }
    }
  )*/

  plane = new THREE.Points(geometry, material);
  console.log(plane)
  scene.add(plane)
}

function createGrid() {
  gridHelper = new THREE.GridHelper(200, 50);
  scene.add(gridHelper)
}

//-----------Object Animations
function moveCube() {
    const d = new Date();
    let time = d.getTime();
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.y += 0.01;
    cube.position.x = world.cube.radius*Math.sin(time*0.0005);
    cube.position.z = world.cube.radius*Math.cos(time*0.0005);
}

//------------DAT gui
function datGUI() {
  const gui = new GUI();
  //gui.add(world.cube,'radius', 0, 200)
}


//------------Event Listeners
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

//------------Initialize function
function init() {
  //createCube();
  createImage();
  createGrid();
  addEventListener('resize', onWindowResize, false);
}

//------------Animation function
function animate() {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
  //moveCube();
  
};

// MAIN CODE
// Scene, Camera, Renderer (SCR)

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0,1,20);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setSize( window.innerWidth, window.innerHeight );
new OrbitControls(camera, renderer.domElement);

init();
animate();
datGUI();
