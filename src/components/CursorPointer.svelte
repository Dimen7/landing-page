<script lang="ts">
	import { onMount } from 'svelte';
	import { burst, scale } from '../store/cursor';
	import { initCursorTrail } from '$lib/cursor/cursor_trail';
	import clickSoundUrl from '$lib/assets/click.mp3';
	import { env } from '$env/dynamic/public';

	let burstInterval: ReturnType<typeof setInterval>;
	let randomInterval: ReturnType<typeof setInterval>;

	let mouseX = -20;
	let mouseY = -20;
	let randomScaleX = 0;
	let randomScaleY = 0;
	let randomPositionXOffset = 0;
	let randomPositionYOffset = 0;

	function reduce(number: number, step = 1) {
		if (number > 0) number -= step;
		else if (number < 0) number += step;
		const doubleStep = step * 2;
		if (number !== 0 && number < doubleStep && number > -doubleStep) number = 0;
		return number;
	}

	let playClickSound: () => void = () => {};

	onMount(() => {
		if (window.innerWidth <= 500) return;

		// Initialize cursor trail (three.js bundled via npm)
		initCursorTrail({
			noiseUrl: env.PUBLIC_CURSOR_NOISE_URL,
			divisor: Number(env.PUBLIC_CURSOR_DIVISOR) || 0.2
		});

		// Load click sound
		const audioCtx = new window.AudioContext();
		const gainNode = audioCtx.createGain();
		gainNode.gain.value = 1;

		const request = new XMLHttpRequest();
		request.open('GET', clickSoundUrl, true);
		request.responseType = 'arraybuffer';
		request.onload = () => {
			audioCtx.decodeAudioData(request.response, (buffer) => {
				playClickSound = () => {
					const source = audioCtx.createBufferSource();
					source.playbackRate.value = Math.random() * 0.7 + 0.6;
					source.buffer = buffer;
					gainNode.gain.exponentialRampToValueAtTime(
						Math.max($burst, 0.2),
						audioCtx.currentTime + 0.1
					);
					source.connect(gainNode);
					gainNode.connect(audioCtx.destination);
					source.start(0);
				};
			});
		};
		request.send();
	});
</script>

<svelte:window
	on:contextmenu={(e) => e.preventDefault()}
	on:mousemove|passive={(e) => {
		mouseX = e.clientX;
		mouseY = e.clientY;
	}}
	on:mousedown|passive={() => {
		playClickSound();

		if ($burst < 1) burst.increment();

		randomPositionXOffset = Math.random() * 10 - 5;
		randomPositionYOffset = Math.random() * 10 - 5;
		randomScaleY = Math.random() * 0.8;
		randomScaleX = Math.random() * 0.8;

		clearInterval(randomInterval);
		randomInterval = setInterval(() => {
			randomPositionXOffset = reduce(randomPositionXOffset);
			randomPositionYOffset = reduce(randomPositionYOffset);
			randomScaleY = reduce(randomScaleY, 0.1);
			randomScaleX = reduce(randomScaleX, 0.1);
			if (
				randomScaleX === 0 &&
				randomScaleY === 0 &&
				randomPositionXOffset === 0 &&
				randomPositionYOffset === 0
			)
				clearInterval(randomInterval);
		}, 10);

		clearInterval(burstInterval);
		burstInterval = setInterval(() => {
			burst.decrement();
			if ($burst < 0) {
				clearInterval(burstInterval);
				burst.reset();
			}
		}, 100);
	}}
/>

<div
	class="pointer"
	style="
	transform:	scaleX({1 + $burst + randomScaleX + $scale})
				scaleY({1 + $burst + randomScaleY + $scale})
				translate({randomPositionXOffset}px, {randomPositionYOffset}px);
	left: {mouseX - 20}px; top: {mouseY - 20}px;
	box-shadow: 0px 0px {$burst * 50}px var(--white);
	"
></div>

<style lang="scss">
	@use '../styles/layout' as *;
</style>
