<script lang="ts">
	import { goto } from '$app/navigation';
	//goto-funktio ohjaa selaimen uuteen osoitteeseen

	//asynkroninen funktio, koska tiedoston haku ja navigointi
	// vie aikaa
	async function arvoVideo() {
		try {
			const vastaus = await fetch('/data/biisit.json'); //hakee biisin
			//await odottaa, että fetch on valmis ja tallentaa vastauksen muuttujaan vastaus
			const data = await vastaus.json();

			// Arpoo paikan listalta (0- listan pituus)
			const randomID = Math.floor(Math.random() * data.length);
			// Ottaa koko biisin teidot tuosta kohdasta
			const valittuVideo = data[randomID];

			// (?id=), koska silloin ei tarvitse [id]-kansiorakennetta.
			const osoite = `new?id=${valittuVideo.id}`;

			// eslint-disable-next-line svelte/no-navigation-without-resolve
			await goto(osoite);
		} catch (virhe) {
			console.error('Musiikkivideon haku epäonnistui:', virhe);
		}
	}
</script>

<button
	class="w-30 cursor-pointer rounded-lg border-[3px] border-text-color bg-black/0 p-2 font-teksti text-base leading-4 font-bold text-text-color shadow-[0px_4px_4px_2px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all duration-300 ease-in-out hover:scale-105 hover:bg-black/0 hover:shadow-lg"
	onclick={arvoVideo}>MixedGenres</button
>
