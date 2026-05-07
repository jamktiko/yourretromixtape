<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { video } from '$lib/Video.svelte';
	import { onMount } from 'svelte';

	let { children } = $props();
	//haetaan data kerran sovelluksen käynnistyessä,
	// jotta se on valmiina heti etusivulle päästyä:
	onMount(() => {
		video.lataadata();
		const tallennettuTeema = localStorage.getItem('theme') || 'default';
		video.teema = tallennettuTeema;
		document.documentElement.setAttribute('data-theme', tallennettuTeema);
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="app">
	{@render children()}

	<footer
		class="flex w-full flex-row items-center justify-center gap-2 border-t-2 bg-text-box py-4 text-center text-sm text-text-color"
	>
		<p>Created by:</p>
		<p>Siri Laine</p>
		<p>-</p>
		<p>Wilho Wilpola</p>
		<p>-</p>
		<p>Niko Mustajärvi</p>
		<p>-</p>
		<p>Nea Tiihonen</p>
	</footer>
</div>

<style>
	.app {
		min-height: 100vh;
		background-image: var(--bg-image);
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		background-attachment: fixed;
	}

	@media (max-width: 768px) {
		.app {
			background-attachment: scroll;
		}
	}
</style>
