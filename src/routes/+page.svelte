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
<button onclick={() => (modalAuki = true)}>Info</button>
{#if modalAuki}
	<InfoButton onClose={() => (modalAuki = false)} />
{/if}
