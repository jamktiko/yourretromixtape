<script lang="ts">
	//TÄMÄ kaikki jotta mixedGenres.svelte toimii

	// 'page'-objekti, jotta voi lukea osoiteriviltä tiedon (?id=...)
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	// Luetaan 'id' osoiterivin hakuparametreista.
	// $derived pitää huolen, että id päivittyy, vaikka nappia painetaan uudestaan sivun ollessa auki.
	const videoId = $derived(page.url.searchParams.get('id'));

	// Takaisin-toiminto, joka hiljentää linterin virheet.
	async function meneTakaisin(event: MouseEvent) {
		event.preventDefault(); // Estetään selaimen vakiohyppy

		// eslint-disable-next-line svelte/no-navigation-without-resolve
		await goto('/');
	}
</script>

<main>
	{#if videoId}
		<h1>Nyt toistetaan videota: {videoId}</h1>
		<p>Tässä kohtaa koodi tietää, minkä videon se lataa soittimeen.</p>
	{:else}
		<h1>Hups!</h1>
		<p>Videon ID puuttuu osoiteriviltä. Palaa etusivulle ja arvo uusi.</p>
	{/if}

	<button onclick={meneTakaisin}>Takaisin etusivulle</button>
</main>
