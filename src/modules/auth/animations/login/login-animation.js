import * as THREE from 'three';
import textureSrc from '~assets/animation-images/login-animation.png';

export function initLoginAnimation() {
  const container = document.getElementById('loginAnimationContainer');
  if (!container) return;

    const existingCanvas = container.querySelector('canvas');
    if (existingCanvas) {
      return;
    }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 800;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  const loader = new THREE.TextureLoader();
  loader.load(textureSrc, (texture) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = texture.image.width;
    canvas.height = texture.image.height;
    ctx.drawImage(texture.image, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    const positions = [];
    const targetPositions = [];
    let scatterPositions = [];
    const colors = [];
    const scales = [];
    const randomOffsets = [];
    const gap = 3;

    for (let y = 0; y < canvas.height; y += gap) {
      for (let x = 0; x < canvas.width; x += gap) {
        const index = (y * canvas.width + x) * 4;
        const r = imageData[index];
        const g = imageData[index + 1];
        const b = imageData[index + 2];
        const a = imageData[index + 3];

        if (a > 0) {
          targetPositions.push(
            x - canvas.width / 2, 
            -(y - canvas.height / 2), 
            0 
          );

          positions.push(
            (Math.random() - 0.5) * window.innerWidth, 
            (Math.random() - 0.5) * window.innerHeight, 
            Math.random() * 400 - 200 
          );

          colors.push(r / 255, g / 255, b / 255); 

          scales.push(Math.random() * 0.5 + 0.5); 
          randomOffsets.push(Math.random() * 0.5 - 0.25); 
        }
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 4,
      vertexColors: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let assembling = true; 
    let scattering = false; 
    function generateScatterPositions() {
      scatterPositions.length = 0; 
      for (let i = 0; i < targetPositions.length; i += 3) {
        scatterPositions.push(
          (Math.random() - 0.5) * window.innerWidth, 
          (Math.random() - 0.5) * window.innerHeight, 
          (Math.random() - 0.5) * 400 
        );
      }
    }

    function scatterParticles() {
      const currentPositions = particles.geometry.attributes.position.array;

      for (let i = 0; i < currentPositions.length; i += 3) {
        const scatterX = scatterPositions[i];
        const scatterY = scatterPositions[i + 1];
        const scatterZ = scatterPositions[i + 2];

        currentPositions[i] += (scatterX - currentPositions[i]) * 0.05;
        currentPositions[i + 1] += (scatterY - currentPositions[i + 1]) * 0.05;
        currentPositions[i + 2] += (scatterZ - currentPositions[i + 2]) * 0.05;
      }
      particles.geometry.attributes.position.needsUpdate = true;
    }

    function animate() {
      const currentPositions = particles.geometry.attributes.position.array;

      if (assembling) {
        for (let i = 0; i < currentPositions.length; i += 3) {
          const targetX = targetPositions[i];
          const targetY = targetPositions[i + 1];
          const targetZ = targetPositions[i + 2];

          currentPositions[i] += (targetX - currentPositions[i]) * 0.1;
          currentPositions[i + 1] += (targetY - currentPositions[i + 1]) * 0.1;
          currentPositions[i + 2] += (targetZ - currentPositions[i + 2]) * 0.1;
        }
      } else if (scattering) {
        scatterParticles();
      }

      const time = Date.now() * 0.005;

      for (let i = 0; i < currentPositions.length; i += 3) {
        const x = currentPositions[i];
        const y = currentPositions[i + 1];
        const z = currentPositions[i + 2];

        const scaleFactor = scales[i / 3] + Math.sin(time + i * 0.3) * 0.1; 
        currentPositions[i] =
          x + Math.sin(time + i) * randomOffsets[i / 3] * 0.3; 
        currentPositions[i + 1] =
          y + Math.cos(time + i) * randomOffsets[i / 3] * 0.3; 
        currentPositions[i + 2] = z + Math.sin(time + i * 0.9) * 1; 

        particles.material.size = 5 * scaleFactor; 
      }

      particles.geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    setInterval(() => {
      if (!scattering) {
        scattering = true;
        assembling = false;
        generateScatterPositions(); 
      } else {
        scattering = false;
        assembling = true;
      }
    }, 5000);

    animate();
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
};
