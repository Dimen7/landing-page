<script lang="ts">
	import '../styles/global.scss';
	import '../styles/fonts.scss';
	import CursorPointer from '../components/CursorPointer.svelte';
	import defaultFaviconUrl from '$lib/assets/favicon.svg';
	import defaultProfileImageUrl from '$lib/assets/avatar.svg';
	import { env } from '$env/dynamic/public';

	const profileImageUrl = env.PUBLIC_IMAGE || defaultProfileImageUrl;
	const faviconUrl = env.PUBLIC_FAVICON || defaultFaviconUrl;
</script>

<svelte:head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="description" content={env.PUBLIC_DESCRIPTION} />
	<meta name="og:title" content={env.PUBLIC_NAME} />
	<meta content={profileImageUrl} property="og:image" />
	<meta property="og:description" content={env.PUBLIC_DESCRIPTION} />
	<meta name="twitter:image" itemprop="image" content={profileImageUrl} />
	<meta name="twitter:card" content="summary" />
	<meta name="theme-color" content={env.PUBLIC_THEME_COLOR} />
	<title>{env.PUBLIC_NAME || 'Loading...'}</title>
	<link rel="icon" href={faviconUrl} />

	<style>
		:root {
			--white: {env.PUBLIC_COLOR_WHITE};
			--gray: {env.PUBLIC_COLOR_GRAY};
			--highlight: {env.PUBLIC_COLOR_HIGHLIGHT};
			--bg-color: {env.PUBLIC_COLOR_BG};
		}
	</style>
</svelte:head>

<CursorPointer />

<slot />
