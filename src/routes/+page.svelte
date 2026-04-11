<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { scale } from '../store/cursor';
	import SocialLinks from '../components/SocialLinks.svelte';
	import BgVideo from '../components/BgVideo.svelte';
	import VideoControls from '../components/VideoControls.svelte';
	import { videoPlaying } from '../store/bgvideo';
	import defaultProfileImageUrl from '$lib/assets/avatar.svg';
	import { env } from '$env/dynamic/public';

	const profileImageUrl = env.PUBLIC_IMAGE || defaultProfileImageUrl;

	const formatTime = () =>
		new Date().toLocaleTimeString(env.PUBLIC_LOCALE || 'en-US', {
			timeZone: env.PUBLIC_TIMEZONE || 'UTC',
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

	let age = 0;
	try {
		const birthdayDate = new Date(env.PUBLIC_BIRTHDAY);
		if (!isNaN(birthdayDate.getTime())) {
			age = Math.floor((Date.now() - birthdayDate.getTime()) / 3.15576e10);
		}
	} catch (e) {
		// Fallback for invalid/empty date
	}

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

<svelte:window on:mousemove|passive={onMouseMove} />

<BgVideo />

<main class:hovered class:video-playing={$videoPlaying} bind:this={mainEl}>
	<!-- svelte-ignore a11y_mouse_events_have_key_events -->
	<div id="rotating-image">
		<img
			bind:this={imgEl}
			draggable="false"
			src={profileImageUrl}
			alt={env.PUBLIC_NAME || 'Profile Image'}
			on:mouseenter|passive={() => !hovered && scale.set(1.2)}
			on:mouseleave|passive={() => !hovered && scale.set(0)}
		/>
	</div>
	<div id="rotating-card" class:hidden={$videoPlaying}>
		<div id="card">
			<h1>{env.PUBLIC_NAME || 'Loading...'}</h1>
			<p>
				{#if env.PUBLIC_LOCATION}
					It is <b>{time}</b> for me in {env.PUBLIC_LOCATION}.
				{/if}
				{#if age > 0}
					{age} {env.PUBLIC_AGE_SUFFIX || 'years old'}
				{/if}
				{#if env.PUBLIC_BIO}
					<br />
					{env.PUBLIC_BIO}
				{:else if !env.PUBLIC_LOCATION && age === 0}
					Loading bio...
				{/if}
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
		<span id="footer-name">{env.PUBLIC_NAME || 'Loading...'}</span>
		{#if env.PUBLIC_LOCATION}
			<span id="footer-time">
				{time} &middot; {env.PUBLIC_LOCATION}
			</span>
		{/if}
		<span id="footer-bio">
			{#if age > 0}{age} {env.PUBLIC_AGE_SUFFIX || 'years old'}{/if}
			{#if age > 0 && env.PUBLIC_BIO} &middot; {/if}
			{env.PUBLIC_BIO || 'Loading bio...'}
		</span>
		<ul>
			<SocialLinks />
		</ul>
	</footer>
{/if}

<style lang="scss">
	@use '../styles/page' as *;
</style>
