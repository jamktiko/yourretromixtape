<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import Button from '$lib/components/Button.svelte';
	import MixedGenres from '$lib/components/mixedGenres.svelte';

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
	let valittuID = $derived(page.url.searchParams.get('id'));

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

<main
	class="flex min-h-screen flex-col items-center justify-center px-4 font-teksti text-base leading-4 font-bold text-text-color"
>
	<header class="h-50 w-50">
		<img src="/logo_yourRetroMixtape.png" alt="Logo" />
	</header>
	<div class="inline-flex flex-col items-center justify-center gap-8">
		{#if naytettavaBiisi}
			<!-- tyylittelyä  -->
			<div
				class="h-56 w-80 place-content-end overflow-hidden rounded-xl border-[3px] border-text-color bg-cta-color shadow-[0px_4px_4px_2px_rgba(0,0,0,0.25)] lg:h-72 lg:w-100"
			>
				<h1 class="p-1 text-center">{naytettavaBiisi.title}</h1>
				<iframe
					class="lg h-50 w-full lg:h-67"
					src={naytettavaBiisi.url}
					title={naytettavaBiisi.title}
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				></iframe>
			</div>

			<div class="grid grid-cols-2 gap-4">
				<MixedGenres />
				<Button text="RANDOMIZE" onclick={() => 'G'} />
			</div>

			<div
				class="h-relative w-90 rounded-xl border-[3px] border-text-color bg-text-box p-2 px-5 text-left shadow-[0px_4px_4px_2px_rgba(0,0,0,0.25)]"
			>
				<h2 class="pb-2 text-center text-xl">Did you know?</h2>
				<ul class="p-1 font-medium">
					{#each naytettavaBiisi.fact as f (f)}
						<li>{f}</li>
					{/each}
				</ul>
			</div>
		{/if}
		<!-- tyylit -->
		<!-- tyylit -->
	</div>
</main>
