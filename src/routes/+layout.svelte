<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="app">{@render children()}</div>

<footer
	class="flex w-full flex-row items-center justify-center gap-2 border-t-2 bg-text-box py-4 text-center text-sm text-text-color"
>
	<p>Siri Laine</p>
	<p>Wilho Wilpola</p>
	<p>Niko Mustajärvi</p>
	<p>Nea Tiihonen</p>
</footer>

<style>
	.app {
		min-height: 100vh;
		background-image: url('/retro-casette-bg.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		background-attachment: fixed;
		position: sticky;
	}
</style>
