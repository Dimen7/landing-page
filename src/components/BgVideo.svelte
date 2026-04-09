<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { PUBLIC_BG_VIDEO_ID } from '$env/static/public';
	import { videoPlaying } from '../store/bgvideo';

	let active = false;
	let iframeEl: HTMLIFrameElement;
	let volume = 50;

	function postCmd(func: string, args: unknown[] = []) {
		iframeEl?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func, args }), '*');
	}

	function onScroll(e: WheelEvent) {
		if (!active) return;
		volume = Math.min(100, Math.max(0, volume - Math.sign(e.deltaY) * 5));
		postCmd('setVolume', [volume]);
	}

	function onWindowClick(e: MouseEvent) {
		if (!PUBLIC_BG_VIDEO_ID) return;
		if ((e.target as Element).closest('a, button')) return;

		if (!active) {
			active = true;
			videoPlaying.set(true);
			setTimeout(() => postCmd('setVolume', [volume]), 1000);
		} else if ($videoPlaying) {
			postCmd('pauseVideo');
			videoPlaying.set(false);
		} else {
			postCmd('playVideo');
			videoPlaying.set(true);
		}
	}

	onMount(() => {
		if (!PUBLIC_BG_VIDEO_ID) return;
		window.addEventListener('click', onWindowClick);
		return () => window.removeEventListener('click', onWindowClick);
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
