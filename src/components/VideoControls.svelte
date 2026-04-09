<script lang="ts">
	import Fa from 'svelte-fa';
	import {
		faPlay,
		faPause,
		faVolumeHigh,
		faVolumeLow,
		faVolumeXmark
	} from '@fortawesome/free-solid-svg-icons';
	import { faYoutube } from '@fortawesome/free-brands-svg-icons';
	import { PUBLIC_BG_VIDEO_ID } from '$env/static/public';
	import { videoPlaying, videoVolume } from '../store/bgvideo';

	$: volumeIcon =
		$videoVolume === 0 ? faVolumeXmark : $videoVolume < 50 ? faVolumeLow : faVolumeHigh;
</script>

<div id="video-controls">
	<button on:click={() => videoPlaying.update((p) => !p)}>
		<Fa icon={$videoPlaying ? faPause : faPlay} />
	</button>

	<input type="range" min="0" max="100" step="1" bind:value={$videoVolume} />

	<Fa icon={volumeIcon} />

	<a
		href="https://www.youtube.com/watch?v={PUBLIC_BG_VIDEO_ID}"
		target="_blank"
		rel="noopener noreferrer"
		draggable="false"
		on:dragstart|preventDefault
		id="yt-link"
	>
		<Fa icon={faYoutube} />
	</a>
</div>

<style lang="scss">
	#video-controls {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.2rem;
		padding: 1.2rem 0.9rem;
		background: #1313138f;
		backdrop-filter: blur(32px);
		border-radius: 15px;
		border: 1px solid rgba(255, 255, 255, 0.06);
		box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);

		button {
			background: none;
			border: none;
			padding: 0;
			font-size: 1rem;
			color: var(--white);
			cursor: none;
			width: 1.2rem;
			height: 1.2rem;
			display: flex;
			align-items: center;
			justify-content: center;
			transition: opacity 0.2s;

			&:hover {
				opacity: 0.7;
			}
		}

		input[type='range'] {
			-webkit-appearance: none;
			appearance: none;
			writing-mode: vertical-lr;
			direction: rtl;
			width: 3px;
			height: 100px;
			border-radius: 2px;
			background: rgba(255, 255, 255, 0.2);
			outline: none;

			&::-webkit-slider-thumb {
				-webkit-appearance: none;
				appearance: none;
				width: 12px;
				height: 12px;
				border-radius: 50%;
				background: var(--white);
				cursor: none;
			}

			&::-moz-range-thumb {
				width: 12px;
				height: 12px;
				border-radius: 50%;
				background: var(--white);
				border: none;
				cursor: none;
			}
		}

		#yt-link {
			font-size: 1.1rem;
			color: var(--white);
			opacity: 0.5;
			transition: opacity 0.2s;

			&:hover {
				opacity: 1;
				color: #ff0000;
			}
		}
	}
</style>
