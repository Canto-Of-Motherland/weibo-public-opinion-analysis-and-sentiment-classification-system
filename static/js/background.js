const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const particleCount = 300;
const particleRadius = 0.15;
const particles = new THREE.CircleGeometry(particleRadius, 128);
const particleMaterial = new THREE.PointsMaterial({
    color: 0x888888,
    size: 0.2
});

for (let i = 0; i < particleCount; i++) {
    const radius = Math.random() * 20 + 5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI * 2;

    const particle = new THREE.Vector3(
        radius * Math.sin(theta) * Math.cos(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(theta)
    );

    particles.vertices.push(particle);
}

const particleSystem = new THREE.Points(particles, particleMaterial);
scene.add(particleSystem);

const geometry = new THREE.IcosahedronGeometry(10, 0);
const material = new THREE.MeshBasicMaterial({
    color: 0x888888,
    wireframe: true
});
const icosahedron = new THREE.Mesh(geometry, material);

const vertexRadius = 0.15;
const vertexMaterial = new THREE.MeshBasicMaterial({ color: 0x888888 });
const vertexGeometry = new THREE.SphereGeometry(vertexRadius, 8, 8);

for (let i = 0; i < icosahedron.geometry.vertices.length; i++) {
    const vertex = icosahedron.geometry.vertices[i];
    const vertexMesh = new THREE.Mesh(vertexGeometry, vertexMaterial);
    vertexMesh.position.copy(vertex);
    icosahedron.add(vertexMesh);
}

scene.add(icosahedron);

renderer.setClearColor(0xffffff);

function animate() {
  requestAnimationFrame(animate);

  icosahedron.rotation.x += 0.005;
  icosahedron.rotation.y += 0.005;

  for (let i = 0; i < particles.vertices.length; i++) {
    const particle = particles.vertices[i];
    const radius = particle.length();
    const speed = 0.01 * (radius / 20);

    particle.applyAxisAngle(new THREE.Vector3(0, 1, 0), speed);
  }

  particleSystem.geometry.verticesNeedUpdate = true;

  renderer.render(scene, camera);
}

window.addEventListener('resize', function() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

animate();