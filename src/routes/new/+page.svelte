<script lang="ts">
	import { onMount } from 'svelte';
	//interface rakenne yhdelle biisille
	interface Biisi {
		id: string;
		title: string;
		url: string;
		genre: string;
		fact: string[]; //taulukko faktoille
	}

	//tilamäärittely:
	//taulukko biisit alkuun tyhjä ja se saa sisältöä haun jälkeen
	let biisit = $state<Biisi[]>([]);
	//onmount suoritetaan kerran kun komponentti ladataan selaimessa
	onMount(async () => {
		try {
			//haetaan biisit tiedostosta
			const biisitResponse = await fetch('/data/biisit.json');
			//muutetaan vastaus objektiksi ja tallennetaan
			biisit = (await biisitResponse.json()) as Biisi[];
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	});
</script>

<main>
	{#each biisit as biisi (biisi.id)}
		<!-- tyylittelyä  -->
		<iframe
			src={biisi.url}
			title={biisi.title}
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
		></iframe>
		<!-- tyylitys -->
		<!-- tyylittely"facts"> -->
		Did you know?
		<ul>
			{#each biisi.fact as f (f)}
				<li>{f}</li>
			{/each}
		</ul>
		<!-- tyylit -->
		<!-- tyylit -->
	{/each}
</main>
