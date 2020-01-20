/* typescript & three.js weback & babel starter - Carter Adams 2020 */

let testMsg: string;
testMsg = "Hello Typescript";
console.log(testMsg);

import * as T from "three";
import Stats from "stats.js";
import settings from "./static/settings.json";

console.log("Loaded")

function main() {
  /* executed in ./static/index.js */
  let renderer = new T.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  let stats;
  if (settings.stats) {
    stats = new Stats();
    document.body.appendChild(stats.dom);
  }

  const scene = new T.Scene();

  let geometry = new T.BoxGeometry(1, 1, 1);
  let material = new T.MeshPhongMaterial({
    color: 0x0055bb,
    flatShading: true,
    shininess: 0
  });
  let actor = new T.Mesh(geometry, material);
  scene.add(actor);

  // Lights
  scene.add(new T.AmbientLight(0x555555));
  let spotlight = new T.SpotLight(0xffffff, 1.5);
  spotlight.position.set(0, 5, 5);
  scene.add(spotlight);

  // Camera
  let fov = 75
  let aspect = window.innerWidth / window.innerHeight;
  let near = 0.1
  let far = 1000
  let camera = new T.PerspectiveCamera(fov, aspect, near, far);
  let cZ = 5;
  camera.position.z = cZ;

  // Action
  (function action() {
    requestAnimationFrame(action);
    actor.rotation.x += 0.01;
    actor.rotation.y += 0.02;
    actor.rotation.z += 0.005;
    renderer.render(scene, camera);
    if (settings.stats) {
      stats.update();
    }
  })();

  window.addEventListener("resize", e => {
    let aspect = window.innerWidth / window.innerHeight;
    camera = new T.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = cZ;
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

export default main;
