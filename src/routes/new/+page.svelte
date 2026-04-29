<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

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

	// haetaan id osoiteriviltä
	let valittuID = $derived($page.url.searchParams.get('id'));

	// etsitään listasta se biisi, jonka id vastaa valittua id:tä
	let naytettavaBiisi = $derived(biisit.find((b) => b.id === valittuID));

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
	{#if naytettavaBiisi}
		<h1>{naytettavaBiisi.title}</h1>

		<!-- tyylittelyä  -->
		<div>
			<iframe
				src={naytettavaBiisi.url}
				title={naytettavaBiisi.title}
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			></iframe>
		</div>
		<!-- tyylitys -->
		<!-- tyylittely"facts"> -->
		Did you know?
		<ul>
			{#each naytettavaBiisi.fact as f (f)}
				<li>{f}</li>
			{/each}
		</ul>
	{/if}
	<!-- tyylit -->
	<!-- tyylit -->
</main>
