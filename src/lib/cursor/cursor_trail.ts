import * as THREE from 'three';
import vertexShader from './cursor_trail_vertex.glsl?raw';
import fragmentShader from './cursor_trail_fragment.glsl?raw';

interface CursorConfig {
	noiseUrl: string;
	divisor: number;
}

export function initCursorTrail(config: CursorConfig) {
	if (window.innerWidth <= 500) return;

	const { noiseUrl, divisor } = config;

	let camera: THREE.Camera;
	let scene: THREE.Scene;
	let renderer: THREE.WebGLRenderer;
	let uniforms: Record<string, THREE.IUniform>;
	let rtTexture: THREE.WebGLRenderTarget;
	let rtTexture2: THREE.WebGLRenderTarget;

	const new_mouse = { x: 0, y: 0 };

	// Register immediately so mouse position is tracked before texture loads
	document.addEventListener('pointermove', (e) => {
		const ratio = window.innerHeight / window.innerWidth;
		new_mouse.x = (e.pageX - window.innerWidth / 2) / window.innerWidth / ratio;
		new_mouse.y = ((e.pageY - window.innerHeight / 2) / window.innerHeight) * -1;
	});

	const loader = new THREE.TextureLoader();
	loader.setCrossOrigin('anonymous');
	loader.load(noiseUrl, (texture) => {
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.minFilter = THREE.LinearFilter;

		camera = new THREE.Camera();
		camera.position.z = 1;

		scene = new THREE.Scene();

		const geometry = new THREE.PlaneGeometry(2, 2);

		rtTexture = new THREE.WebGLRenderTarget(window.innerWidth * 0.2, window.innerHeight * 0.2);
		rtTexture2 = new THREE.WebGLRenderTarget(window.innerWidth * 0.2, window.innerHeight * 0.2);

		uniforms = {
			u_time: { value: 1.0 },
			u_resolution: { value: new THREE.Vector2() },
			u_noise: { value: texture },
			u_buffer: { value: rtTexture.texture },
			u_mouse: { value: new THREE.Vector2() },
			u_renderpass: { value: false }
		};

		const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader });
		(material.extensions as any).derivatives = true;

		scene.add(new THREE.Mesh(geometry, material));

		renderer = new THREE.WebGLRenderer();
		renderer.setPixelRatio(window.devicePixelRatio);
		document.body.prepend(renderer.domElement);

		onWindowResize();
		window.addEventListener('resize', onWindowResize, false);
		window.addEventListener('orientationchange', onWindowResize, false);

		animate();
	});

	function onWindowResize() {
		renderer.setSize(window.innerWidth, window.innerHeight);
		uniforms.u_resolution.value.x = renderer.domElement.width;
		uniforms.u_resolution.value.y = renderer.domElement.height;
		rtTexture = new THREE.WebGLRenderTarget(window.innerWidth * 0.2, window.innerHeight * 0.2);
		rtTexture2 = new THREE.WebGLRenderTarget(window.innerWidth * 0.2, window.innerHeight * 0.2);
	}

	function animate(delta?: number) {
		setTimeout(() => requestAnimationFrame(animate), 1000 / 144);

		// Smooth interpolation towards actual mouse position
		uniforms.u_mouse.value.x += (new_mouse.x - uniforms.u_mouse.value.x) * divisor;
		uniforms.u_mouse.value.y += (new_mouse.y - uniforms.u_mouse.value.y) * divisor;
		uniforms.u_time.value = (delta ?? 0) * 0.0005;

		// Screen render pass (u_renderpass = false)
		renderer.setRenderTarget(null);
		renderer.render(scene, camera);

		// Off-screen buffer pass (u_renderpass = true)
		const odims = (uniforms.u_resolution.value as THREE.Vector2).clone();
		uniforms.u_resolution.value.x = window.innerWidth * 0.2;
		uniforms.u_resolution.value.y = window.innerHeight * 0.2;
		uniforms.u_buffer.value = rtTexture2.texture;
		uniforms.u_renderpass.value = true;

		renderer.setRenderTarget(rtTexture);
		renderer.clear();
		renderer.render(scene, camera);

		// Swap buffers
		[rtTexture, rtTexture2] = [rtTexture2, rtTexture];
		uniforms.u_buffer.value = rtTexture.texture;
		uniforms.u_resolution.value = odims;
		uniforms.u_renderpass.value = false;
	}
}
