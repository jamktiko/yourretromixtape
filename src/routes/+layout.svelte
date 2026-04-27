<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="app">{@render children()}</div>

<style>
	.app {
		min-height: 100vh;
		background-image: url('/retro-casette-bg.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}
</style>
