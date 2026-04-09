<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.status}</title>
</svelte:head>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="container" on:click={() => (window.location.href = window.location.origin)}>
	<span class="text">{$page.status}</span>
</div>

<style lang="scss">
	@use '../styles/404' as *;
</style>
