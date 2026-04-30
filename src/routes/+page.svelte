<script lang="ts">
	import Genre from './Genre.svelte';
	import MixedGenres from '$lib/components/mixedGenres.svelte';
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';
	import InfoButton from '$lib/components/InfoButton.svelte';

	async function arvoVideo() {
		try {
			const vastaus = await fetch('/data/biisit.json'); //hakee biisin
			//await odottaa, että fetch on valmis ja tallentaa vastauksen muuttujaan vastaus
			const data = await vastaus.json();

			const suodatetutBiisit = data.filter(
				(biisi: { genre: string }) => biisi.genre === valittuGenre
			);

			if (suodatetutBiisit.length === 0) {
				console.error('Kyseisellä genrellä ei löytynyt biisejä:', valittuGenre);
				return;
			}

			// Arpoo paikan listalta (0- listan pituus)
			const randomID = Math.floor(Math.random() * suodatetutBiisit.length);
			// Ottaa koko biisin teidot tuosta kohdasta
			const valittuVideo = suodatetutBiisit[randomID];

			// (?id=), koska silloin ei tarvitse [id]-kansiorakennetta.
			const osoite = `new?id=${valittuVideo.id}`;

			// eslint-disable-next-line svelte/no-navigation-without-resolve
			await goto(osoite);
		} catch (virhe) {
			console.error('Musiikkivideon haku epäonnistui:', virhe);
		}
	}

	let valittuGenre = $state('');
	//infoikkuna, joka kertoo onko modal auki vai ei
	let modalAuki = $state(false);

	let onkoValittu = $derived(valittuGenre !== '');
</script>

<div><Genre bind:valittuGenre /></div>
<MixedGenres />
<Button onclick={arvoVideo} text="Start" disabled={!onkoValittu} />

<button
	class="cursor-pointer transition-all duration-300 ease-in-out hover:scale-105"
	onclick={() => (modalAuki = true)}
	aria-label="Info"
>
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<!-- Circle -->
		<circle cx="12" cy="12" r="10" stroke="black" stroke-width="2" />

		<!-- "i" stem -->
		<line x1="12" y1="10" x2="12" y2="16" stroke="black" stroke-width="2" />

		<!-- "i" dot -->
		<circle cx="12" cy="7" r="1.5" fill="black" />
	</svg>
</button>

{#if modalAuki}
	<InfoButton onClose={() => (modalAuki = false)} />
{/if}
