<script lang="ts">
	import { goto } from '$app/navigation';
	//goto-funktio ohjaa selaimen uuteen osoitteeseen

	//asynkroninen funktio, koska tiedoston haku ja navigointi
	// vie aikaa
	async function arvoVideo() {
		try {
			const vastaus = await fetch('/biisit.json'); //hakee biisin
			//await odottaa, että fetch on valmis ja tallentaa vastauksen muuttujaan vastaus
			const data = await vastaus.json();

			// Arpoo paikan listalta (0- listan pituus)
			const randomID = Math.floor(Math.random() * data.length);
			// Ottaa koko biisin teidot tuosta kohdasta
			const valittuVideo = data[randomID];

			// (?id=), koska silloin ei tarvitse [id]-kansiorakennetta.
			const osoite = `/new?id=${valittuVideo.id}`;

			// eslint-disable-next-line svelte/no-navigation-without-resolve
			await goto(osoite); //odottaa että tehdään new kansio, jossa page.svelte
		} catch (virhe) {
			console.error('Musiikkivideon haku epäonnistui:', virhe);
		}
	}
</script>

// buttonin ympärille div class, niin voi tyylitellä
<button onclick={arvoVideo}>MixedGenres</button>
