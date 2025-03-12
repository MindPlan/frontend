import React, { useEffect } from 'react';
import * as THREE from 'three';

interface AnimatedImageProps {
  textureSrc: string;
  containerId: string;
}

interface ShaderUniforms {
  uTexture: { value: THREE.Texture };
  uTime: { value: number };
}

export const AnimatedImage: React.FC<AnimatedImageProps> = ({
  textureSrc,
  containerId,
}) => {
  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    const light = new THREE.PointLight(0xffffff, 1, 100);

    const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`;

    const fragmentShader = `
      varying vec2 vUv;
      uniform sampler2D uTexture;
      uniform float uTime;
      void main() {
        vec2 uv = vUv;
        uv.x += sin(uTime + uv.y * 10.0) * 0.02;
        vec4 texColor = texture2D(uTexture, uv);
        gl_FragColor = vec4(texColor.rgb, texColor.a);
        }`;

    const textureLoader = new THREE.TextureLoader();
    const plane = new THREE.Mesh();

    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    light.position.set(2, 2, 5);
    scene.add(light);

    textureLoader.load(textureSrc, (texture) => {
      const aspectRatio = texture.image.width / texture.image.height;
      const geometry = new THREE.PlaneGeometry(2.9 * aspectRatio, 2.9);
      const material = new THREE.ShaderMaterial({
        uniforms: { uTexture: { value: texture }, uTime: { value: 0 } },
        vertexShader,
        fragmentShader,
        transparent: true,
      });

      plane.geometry = geometry;
      plane.material = material;
      scene.add(plane);
    });

    camera.position.set(0, 0, 1.5);
    camera.lookAt(0, 0, 0);

    const animate = () => {
      requestAnimationFrame(animate);
      if ((plane.material as THREE.ShaderMaterial).uniforms) {
        (plane.material as THREE.ShaderMaterial).uniforms.uTime.value =
          performance.now() * 0.001;
      }
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [textureSrc, containerId]);

  return null;
};
