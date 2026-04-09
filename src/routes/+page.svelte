<script lang="ts">
	import { onMount } from 'svelte';
	import { scale } from '../store/cursor';
	import SocialLinks from '../components/SocialLinks.svelte';
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

<main class:hovered bind:this={mainEl}>
	<!-- svelte-ignore a11y_mouse_events_have_key_events -->
	<div id="rotating-image">
		<img
			bind:this={imgEl}
			src={profileImageUrl}
			alt={PUBLIC_NAME}
			on:mouseenter={() => !hovered && scale.set(1.2)}
			on:mouseleave={() => !hovered && scale.set(0)}
		/>
	</div>
	<div id="rotating-card">
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

<style lang="scss">
	@use '../styles/page' as *;
</style>
