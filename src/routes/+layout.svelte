<script lang="ts">
	import '../styles/global.scss';
	import '../styles/fonts.scss';
	import CursorPointer from '../components/CursorPointer.svelte';
	import defaultFaviconUrl from '$lib/assets/favicon.svg';
	import defaultProfileImageUrl from '$lib/assets/avatar.svg';
	import {
		PUBLIC_NAME,
		PUBLIC_DESCRIPTION,
		PUBLIC_THEME_COLOR,
		PUBLIC_IMAGE,
		PUBLIC_FAVICON,
		PUBLIC_COLOR_WHITE,
		PUBLIC_COLOR_GRAY,
		PUBLIC_COLOR_HIGHLIGHT,
		PUBLIC_COLOR_BG
	} from '$env/static/public';

	const profileImageUrl = PUBLIC_IMAGE || defaultProfileImageUrl;
	const faviconUrl = PUBLIC_FAVICON || defaultFaviconUrl;
</script>

<svelte:head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="description" content={PUBLIC_DESCRIPTION} />
	<meta name="og:title" content={PUBLIC_NAME} />
	<meta content={profileImageUrl} property="og:image" />
	<meta property="og:description" content={PUBLIC_DESCRIPTION} />
	<meta name="twitter:image" itemprop="image" content={profileImageUrl} />
	<meta name="twitter:card" content="summary" />
	<meta name="theme-color" content={PUBLIC_THEME_COLOR} />
	<title>{PUBLIC_NAME}</title>
	<link rel="icon" href={faviconUrl} />

	<style>
		:root {
			--white: {PUBLIC_COLOR_WHITE};
			--gray: {PUBLIC_COLOR_GRAY};
			--highlight: {PUBLIC_COLOR_HIGHLIGHT};
			--bg-color: {PUBLIC_COLOR_BG};
		}
	</style>
</svelte:head>

<CursorPointer />

<slot />
