<script lang="ts">
	import { onMount } from 'svelte';
	import { env } from '$env/dynamic/public';
	import { videoActive, videoPlaying, videoVolume, currentVideoId, getRandomVideoId, getAllVideoIds } from '../store/bgvideo';

	let player: YT.Player | null = null;
	let playerReady = false;

	// YouTube IFrame API types
	declare global {
		interface Window {
			YT: any;
			onYouTubeIframeAPIReady: () => void;
		}
	}

	function initYouTubeAPI() {
		if (typeof window === 'undefined' || window.YT) return;

		const tag = document.createElement('script');
		tag.src = 'https://www.youtube.com/iframe_api';
		const firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
	}

	function createPlayer(videoId: string) {
		if (!window.YT || !videoId) return;

		if (player) {
			player.cueVideoById(videoId);
			return;
		}

		player = new window.YT.Player('bg-video-player', {
			height: '100%',
			width: '100%',
			videoId: videoId,
			playerVars: {
				autoplay: 1,
				controls: 0,
				modestbranding: 1,
				rel: 0,
				iv_load_policy: 3,
				playsinline: 1,
				mute: 1,
				enablejsapi: 1,
				origin: window.location.origin,
				loop: getAllVideoIds().length === 1 ? 1 : 0
			},
			events: {
				onReady: onPlayerReady,
				onStateChange: onPlayerStateChange,
				onError: onPlayerError
			}
		});
	}

	function onPlayerReady(event: any) {
		playerReady = true;
		// If we are already active/playing, start video and unmute
		if ($videoActive && $videoPlaying) {
			event.target.playVideo();
			event.target.unMute();
		} else {
			event.target.pauseVideo();
		}
	}

	function onPlayerStateChange(event: any) {
		const state = event.data;
		const videoIds = getAllVideoIds();

		// 0 = ENDED, 1 = PLAYING, 2 = PAUSED, 3 = BUFFERING, 5 = CUED
		if (state === 0) {
			// Video ended
			clearVideoTimer();

			if (videoIds.length > 1) {
				// Multiple videos - load next random video
				setTimeout(() => {
					currentVideoId.set(getRandomVideoId());
				}, 500);
			} else if (videoIds.length === 1 && player) {
				// Single video - replay from start
				player.seekTo(0);
				if ($videoActive && $videoPlaying) {
					player.playVideo();
				}
			}
		} else if (state === 2) {
			// Video paused - stop timer
			clearVideoTimer();
		}
	}

	function onPlayerError(event: any) {
		console.error('YouTube player error:', event.data);
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
			
			// IMMEDIATE UNMUTE for iOS gesture unlock
			if (player && playerReady) {
				player.unMute();
				player.playVideo();
			}
		} else {
			const next = !$videoPlaying;
			videoPlaying.set(next);
			
			if (player && playerReady) {
				if (next) {
					player.playVideo();
					player.unMute();
				} else {
					player.pauseVideo();
				}
			}
		}
	}

	onMount(() => {
		if (!env.PUBLIC_BG_VIDEO_ID) return;

		// Load YouTube IFrame API
		initYouTubeAPI();
		window.onYouTubeIframeAPIReady = () => {
			if ($currentVideoId) {
				createPlayer($currentVideoId);
			}
		};

		window.addEventListener('click', onWindowClick, { passive: false });

		// Fallback: Wait for YouTube API to load
		let retries = 0;
		const waitForAPI = setInterval(() => {
			if (window.YT && $currentVideoId) {
				clearInterval(waitForAPI);
				if (!player) {
					createPlayer($currentVideoId);
				}
			}
			retries++;
			if (retries > 50) clearInterval(waitForAPI);
		}, 100);

		return () => {
			window.removeEventListener('click', onWindowClick);
			clearVideoTimer();
		};
	});

	const videoIds = getAllVideoIds();
	const hasMultipleVideos = videoIds.length > 1;
	let videoTimer: number | null = null;
	let lastLoadedVideoId = '';
	let loadingVideo = false;

	function startVideoTimer(duration: number) {
		clearVideoTimer();
		if (!hasMultipleVideos || duration <= 0) return;

		// Add 1 second buffer for safety
		const timeoutMs = (duration + 1) * 1000;

		videoTimer = window.setTimeout(() => {
			if ($videoActive && $videoPlaying && hasMultipleVideos) {
				currentVideoId.set(getRandomVideoId());
			}
		}, timeoutMs);
	}

	function clearVideoTimer() {
		if (videoTimer) {
			clearTimeout(videoTimer);
			videoTimer = null;
		}
	}

	// Sync play/pause with store
	$: if (player && playerReady && $videoActive) {
		if ($videoPlaying) {
			player.playVideo();
		} else {
			player.pauseVideo();
			clearVideoTimer();
		}
	}

	// Start auto-next timer when user plays video (only for multiple videos)
	$: if (player && playerReady && $videoActive && $videoPlaying && hasMultipleVideos) {
		const duration = player.getDuration();
		if (duration > 0) {
			startVideoTimer(duration);
		}
	}

	// Sync volume with store
	$: if (player && playerReady && $videoActive && $videoPlaying) {
		player.setVolume($videoVolume);
	}

	// Load new video when currentVideoId changes
	$: if (player && playerReady && $currentVideoId && $currentVideoId !== lastLoadedVideoId && !loadingVideo) {
		loadingVideo = true;
		lastLoadedVideoId = $currentVideoId;

		player.loadVideoById($currentVideoId);

		setTimeout(() => {
			loadingVideo = false;
			if ($videoActive && $videoPlaying) {
				player.playVideo();
				player.unMute();
			}
		}, 500);
	}
</script>

<svelte:window on:wheel|passive={onScroll} />

{#if env.PUBLIC_BG_VIDEO_ID}
	<div
		id="bg-video"
		class:active={$videoActive}
		style="--video-blur: {Number(env.PUBLIC_BG_VIDEO_BLUR) || 8}px"
	>
		<div id="bg-video-player"></div>
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

		#bg-video-player {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 100vw;
			height: 56.25vw;
			min-height: 100vh;
			min-width: 177.78vh;
			filter: blur(var(--video-blur, 8px));

			:global(iframe) {
				border: none;
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
