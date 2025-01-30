import * as THREE from 'three';
import textureSrc from '~assets/animation-images/landing-animation.png';

window.addEventListener('load', () => {
  const container = document.getElementById('landing-animation-container');

  if (!container) {
    return;
  }

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  const light = new THREE.PointLight(0xffffff, 1, 100);
  light.position.set(2, 2, 5);
  scene.add(light);

  const vertexShader = `
    varying vec2 vUv;

    void main() {
      vUv = uv; // Передаємо UV-координати до фрагментного шейдера
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`;

  const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float uTime;

  void main() {
    vec2 uv = vUv;

    // Анімація хвиль
    uv.x += sin(uTime + uv.y * 10.0) * 0.05;

    vec4 texColor = texture2D(uTexture, uv); 
    gl_FragColor = vec4(texColor.rgb, texColor.a); 
  }
`;

  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(
    textureSrc,
    (texture) => {
      console.log('Текстура завантажена успішно!');

      const aspectRatio = texture.image.width / texture.image.height;

      const geometry = new THREE.PlaneGeometry(1 * aspectRatio, 1);

      const material = new THREE.ShaderMaterial({
        uniforms: {
          uTexture: { value: texture },
          uTime: { value: 0 },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
      });

      const plane = new THREE.Mesh(geometry, material);
      scene.add(plane);

      camera.position.z = 1.5;

      // Анімація
      const animate = () => {
        requestAnimationFrame(animate);

        material.uniforms.uTime.value = performance.now() * 0.001;

        plane.rotation.z -= 0.01;

        renderer.render(scene, camera);
      };

      animate();
    },
    undefined,
    (error) => console.error('Помилка завантаження текстури:', error)
  );
});
