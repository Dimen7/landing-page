<script lang="ts">
	import { onMount } from 'svelte';
	import { initVoid, jumpScareUrl, voidAudioUrl } from '$lib/void';
	import defaultProfileImageUrl from '$lib/assets/avatar.svg';
	import { PUBLIC_NAME, PUBLIC_IMAGE, PUBLIC_THEME_COLOR } from '$env/static/public';

	const profileImageUrl = PUBLIC_IMAGE || defaultProfileImageUrl;

	onMount(() => {
		const script = document.createElement('script');
		script.src = 'https://unpkg.com/typeit@latest/dist/index.umd.js';
		script.onload = () => initVoid();
		document.head.appendChild(script);
	});
</script>

<svelte:head>
	<title>Void - {PUBLIC_NAME}</title>
	<meta property="og:title" content="Void - {PUBLIC_NAME}" />
	<meta content={profileImageUrl} property="og:image" />
	<meta
		property="og:description"
		content="Do not trust what you are being told. Do not follow what you are being told. Do not enter the page at all, if you fear the void. The void is infinite and damage is permanently irreversible. Caution is advised."
	/>
	<meta name="theme-color" content={PUBLIC_THEME_COLOR} />
</svelte:head>

<div class="void-wrapper">
	<div id="welcome-page">Click to enter. You comply to do this at your own risk.</div>
	<div id="shine"></div>
	<!-- svelte-ignore a11y_media_has_caption -->
	<video hidden id="jump-scare">
		<source src={jumpScareUrl} type="video/mp4" />
	</video>
	<div id="text"></div>
	<!-- svelte-ignore a11y_media_has_caption -->
	<audio id="audio" loop src={voidAudioUrl}></audio>
</div>

<style lang="scss">
	@use '../../styles/void' as *;
</style>
