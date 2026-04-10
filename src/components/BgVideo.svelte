<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { env } from '$env/dynamic/public';
	import { videoActive, videoPlaying, videoVolume } from '../store/bgvideo';

	let iframeEl: HTMLIFrameElement;

	function postCmd(func: string, args: unknown[] = []) {
		if (!iframeEl?.contentWindow) return;
		iframeEl.contentWindow.postMessage(
			JSON.stringify({ event: 'command', func, args }),
			'https://www.youtube.com'
		);
	}

	// Sync play/pause state
	$: if ($videoActive) {
		postCmd($videoPlaying ? 'playVideo' : 'pauseVideo');
	}

	// Sync volume and mute state
	$: if ($videoActive) {
		postCmd('unMute');
		postCmd('setVolume', [$videoVolume]);
	}

	function onScroll(e: WheelEvent) {
		if (!$videoActive || typeof window === 'undefined' || window.innerWidth < 1024) return;
		videoVolume.update((v) => Math.min(100, Math.max(0, v - Math.sign(e.deltaY) * 5)));
	}

	function onWindowClick(e: MouseEvent) {
		if (!env.PUBLIC_BG_VIDEO_ID) return;
		if ((e.target as Element).closest('a, button, input')) return;
		
		if (!$videoActive) {
			videoActive.set(true);
			videoPlaying.set(true);
		} else {
			videoPlaying.update((p) => !p);
		}
	}

	onMount(() => {
		if (!env.PUBLIC_BG_VIDEO_ID) return;
		window.addEventListener('click', onWindowClick, { passive: false });
		return () => window.removeEventListener('click', onWindowClick);
	});

	const origin = typeof window !== 'undefined' ? window.location.origin : '';
</script>

<svelte:window on:wheel|passive={onScroll} />

{#if env.PUBLIC_BG_VIDEO_ID}
	<div 
		id="bg-video" 
		class:active={$videoActive}
		style="--video-blur: {Number(env.PUBLIC_BG_VIDEO_BLUR) || 8}px"
	>
		<iframe
			bind:this={iframeEl}
			src="https://www.youtube.com/embed/{env.PUBLIC_BG_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist={env.PUBLIC_BG_VIDEO_ID}&controls=0&rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=1&origin={origin}&playsinline=1"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerpolicy="strict-origin-when-cross-origin"
			frameborder="0"
			title="Background video"
		></iframe>
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
		opacity: 0;
		transition: opacity 2s;

		&.active {
			opacity: 1;
		}

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
			filter: blur(var(--video-blur, 8px));
		}
	}
</style>
