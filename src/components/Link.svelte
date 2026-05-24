<script lang="ts">
	import { scale } from '../store/cursor';

	export let href: string;
	export let newTab: boolean = true;
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -->
<a
	on:mouseenter|passive={() => scale.set(-0.6)}
	on:mouseleave|passive={() => scale.set(0)}
	on:dragstart|preventDefault
	draggable="false"
	{href}
	rel="noopener noreferrer"
	target={newTab ? '_blank' : '_self'}
>
	<slot />
</a>

<!-- eslint-enable svelte/no-navigation-without-resolve -->

<style lang="scss">
	@use '../styles/link' as *;
</style>
