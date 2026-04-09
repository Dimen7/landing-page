<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { PUBLIC_BG_VIDEO_ID } from '$env/static/public';

	let active = false;
	let iframeEl: HTMLIFrameElement;
	let volume = 50;

	function setVolume(v: number) {
		iframeEl?.contentWindow?.postMessage(
			JSON.stringify({ event: 'command', func: 'setVolume', args: [v] }),
			'*'
		);
	}

	function onScroll(e: WheelEvent) {
		if (!active) return;
		volume = Math.min(100, Math.max(0, volume - Math.sign(e.deltaY) * 5));
		setVolume(volume);
	}

	onMount(() => {
		if (!PUBLIC_BG_VIDEO_ID) return;
		const handler = () => {
			active = true;
			window.removeEventListener('click', handler);
		};
		window.addEventListener('click', handler);
		return () => window.removeEventListener('click', handler);
	});
</script>

<svelte:window on:wheel={onScroll} />

{#if PUBLIC_BG_VIDEO_ID && active}
	<div id="bg-video" in:fade={{ duration: 2000 }}>
		<iframe
			bind:this={iframeEl}
			src="https://www.youtube-nocookie.com/embed/{PUBLIC_BG_VIDEO_ID}?autoplay=1&mute=0&loop=1&playlist={PUBLIC_BG_VIDEO_ID}&controls=0&rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=1"
			allow="autoplay; encrypted-media"
			frameborder="0"
			title="Background video"
		/>
	</div>
{/if}

<style lang="scss">
	#bg-video {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
		pointer-events: none;

		iframe {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 100vw;
			height: 56.25vw;
			min-height: 100vh;
			min-width: 177.78vh;
			border: none;
			filter: blur(8px);
		}
	}
</style>
