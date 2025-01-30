import * as THREE from 'three';
import textureSrc from '~assets/animation-images/signup-animation.png';

export function initRegistrationAnimation(): () => void {
  const container = document.getElementById('registration-animation-container');

  if (!container) return () => {};

  const existingCanvas = container.querySelector('canvas');

  if (existingCanvas) return () => {};

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 800;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  const loader = new THREE.TextureLoader();

  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  loader.load(textureSrc, (texture: THREE.Texture) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = texture.image.width;
    canvas.height = texture.image.height;
    ctx.drawImage(texture.image, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    const positions: number[] = [];
    const targetPositions: number[] = [];
    const colors: number[] = [];
    const scales: number[] = [];
    const randomOffsets: number[] = [];
    const gap = 5;

    for (let y = 0; y < canvas.height; y += gap) {
      for (let x = 0; x < canvas.width; x += gap) {
        const index = (y * canvas.width + x) * 4;
        const red = imageData[index];
        const green = imageData[index + 1];
        const blue = imageData[index + 2];
        const alpha = imageData[index + 3];
        const targetX = x - canvas.width / 2;
        const targetY = -(y - canvas.height / 2);
        const targetZ = 0;

        if (alpha > 0) {
          targetPositions.push(targetX, targetY, targetZ);
          positions.push(
            (Math.random() - 0.5) * window.innerWidth,
            (Math.random() - 0.5) * window.innerHeight,
            Math.random() * 400 - 200
          );

          colors.push(red / 255, green / 255, blue / 255);
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

    const material = new THREE.PointsMaterial({ size: 4, vertexColors: true });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let assembling = true;

    function animate(): void {
      const currentPositions = particles.geometry.attributes.position.array;
      for (let i = 0; i < currentPositions.length; i += 3) {
        const targetX = targetPositions[i];
        const targetY = targetPositions[i + 1];
        const targetZ = targetPositions[i + 2];

        if (assembling) {
          currentPositions[i] += (targetX - currentPositions[i]) * 0.1;
          currentPositions[i + 1] += (targetY - currentPositions[i + 1]) * 0.1;
          currentPositions[i + 2] += (targetZ - currentPositions[i + 2]) * 0.1;
        }
      }

      if (assembling) {
        const allAssembled = currentPositions.every(
          (pos, index) => Math.abs(pos - targetPositions[index]) < 0.4
        );
        if (allAssembled) assembling = false;
      } else {
        const time = Date.now() * 0.005;
        for (let i = 0; i < currentPositions.length; i += 3) {
          const x = currentPositions[i];
          const y = currentPositions[i + 1];
          const z = currentPositions[i + 2];

          const scaleFactor = scales[i / 3] + Math.sin(time + i * 0.5) * 0.1;
          currentPositions[i] =
            x + Math.sin(time + i) * randomOffsets[i / 3] * 0.2;
          currentPositions[i + 1] =
            y + Math.cos(time + i) * randomOffsets[i / 3] * 0.3;
          currentPositions[i + 2] = z + Math.sin(time + i * 0.9) * 1;

          particles.material.size = 5 * scaleFactor;
        }
      }

      particles.geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    animate();

    function onResize(): void {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      container.removeChild(renderer.domElement);
    };
  });
}
