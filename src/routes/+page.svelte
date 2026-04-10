<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { scale } from '../store/cursor';
	import SocialLinks from '../components/SocialLinks.svelte';
	import BgVideo from '../components/BgVideo.svelte';
	import VideoControls from '../components/VideoControls.svelte';
	import { videoPlaying } from '../store/bgvideo';
	import defaultProfileImageUrl from '$lib/assets/avatar.svg';
	import {
		PUBLIC_NAME,
		PUBLIC_LOCALE,
		PUBLIC_TIMEZONE,
		PUBLIC_LOCATION,
		PUBLIC_BIRTHDAY,
		PUBLIC_AGE_SUFFIX,
		PUBLIC_BIO,
		PUBLIC_IMAGE
	} from '$env/static/public';

	const profileImageUrl = PUBLIC_IMAGE || defaultProfileImageUrl;

	const formatTime = () =>
		new Date().toLocaleTimeString(PUBLIC_LOCALE, {
			timeZone: PUBLIC_TIMEZONE,
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit'
		});

	let time = formatTime();

	onMount(() => {
		const interval = setInterval(() => {
			time = formatTime();
		}, 1000);
		return () => clearInterval(interval);
	});

	let birthdayDate = new Date(PUBLIC_BIRTHDAY);
	let age = Math.floor((Date.now() - birthdayDate.getTime()) / 3.15576e10);

	let hovered = false;
	let mainEl: HTMLElement;
	let imgEl: HTMLImageElement;

	function onMouseMove(e: MouseEvent) {
		if (!mainEl || !imgEl) return;
		const target = document.elementFromPoint(e.clientX, e.clientY);
		const overContent = mainEl.contains(target) || imgEl.contains(target) || target === imgEl;
		const i = imgEl.getBoundingClientRect();
		const overImgGap =
			e.clientX >= i.left - 20 &&
			e.clientX <= i.right + 20 &&
			e.clientY >= i.top - 20 &&
			e.clientY <= i.bottom + 20;
		const inZone = overContent || overImgGap;
		if (inZone !== hovered) {
			hovered = inZone;
			if (!inZone) scale.set(0);
		}
	}
</script>

<svelte:window on:mousemove={onMouseMove} />

<BgVideo />

<main class:hovered class:video-playing={$videoPlaying} bind:this={mainEl}>
	<!-- svelte-ignore a11y_mouse_events_have_key_events -->
	<div id="rotating-image">
		<img
			bind:this={imgEl}
			draggable="false"
			src={profileImageUrl}
			alt={PUBLIC_NAME}
			on:mouseenter={() => !hovered && scale.set(1.2)}
			on:mouseleave={() => !hovered && scale.set(0)}
		/>
	</div>
	<div id="rotating-card" class:hidden={$videoPlaying}>
		<div id="card">
			<h1>{PUBLIC_NAME}</h1>
			<p>
				It is <b>{time}</b> for me in {PUBLIC_LOCATION}.
				{age} {PUBLIC_AGE_SUFFIX}
				<br />
				{PUBLIC_BIO}
			</p>
			<ul>
				<SocialLinks />
			</ul>
		</div>
	</div>
</main>

{#if $videoPlaying}
	<div id="controls-anchor" transition:fly={{ x: -80, duration: 600, opacity: 0 }}>
		<VideoControls />
	</div>
{/if}

{#if $videoPlaying}
	<footer transition:fly={{ y: 80, duration: 700, opacity: 0, delay: 50 }}>
		<span id="footer-name">{PUBLIC_NAME}</span>
		<span id="footer-time">
			{time} &middot; {PUBLIC_LOCATION}
		</span>
		<span id="footer-bio">{age} {PUBLIC_AGE_SUFFIX} &middot; {PUBLIC_BIO}</span>
		<ul>
			<SocialLinks />
		</ul>
	</footer>
{/if}

<style lang="scss">
	@use '../styles/page' as *;
</style>
