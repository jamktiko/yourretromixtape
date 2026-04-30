<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import Button from '$lib/components/Button.svelte';
	import MenuButton from '$lib/components/menuButton.svelte';
	import { goto } from '$app/navigation';

	//interface rakenne yhdelle biisille
	interface Biisi {
		id: string;
		title: string;
		url: string;
		genre: string;
		fact: string[]; //taulukko faktoille
	}

	interface GenreData {
		genre: string;
		kuva: string;
	}

	//tilamäärittely:
	//taulukko biisit alkuun tyhjä ja se saa sisältöä haun jälkeen
	let biisit = $state<Biisi[]>([]);
	let genret = $state<GenreData[]>([]);

	// haetaan id osoiteriviltä
	let valittuID = $derived(page.url.searchParams.get('id'));

	// etsitään listasta se biisi, jonka id vastaa valittua id:tä
	let naytettavaBiisi = $derived(biisit.find((b) => b.id === valittuID));

	let dynaaminenLogo = $derived.by(() => {
		if (!naytettavaBiisi || genret.length === 0) return null;

		// Etsitään täydellinen osuma
		const loytynytGenre = genret.find((g) => g.genre === naytettavaBiisi.genre);

		return loytynytGenre ? loytynytGenre.kuva : null;
	});

	//onmount suoritetaan kerran kun komponentti ladataan selaimessa

	onMount(async () => {
		try {
			const [biisitRes, genretRes] = await Promise.all([
				fetch('/data/biisit.json'),
				fetch('/data/genre.json')
			]);

			biisit = (await biisitRes.json()) as Biisi[];
			genret = (await genretRes.json()) as GenreData[];
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	});
</script>

<main
	class="flex min-h-screen flex-col items-center justify-center px-4 font-teksti text-base leading-4 font-bold text-text-color"
>
	<header class="h-30 w-50">
		{#if dynaaminenLogo}
			<img src={dynaaminenLogo} alt="Genre logo" />
		{/if}
	</header>
	<div class="inline-flex flex-col items-center justify-center gap-6">
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
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
				<MenuButton text="MENU" onclick={() => goto('/')} />
				<Button text="RANDOMIZE" onclick={() => 'G'} />
			</div>

			<div
				class="h-relative mb-60 w-80 rounded-xl border-[3px] border-text-color bg-text-box p-2 px-5 text-left shadow-[0px_4px_4px_2px_rgba(0,0,0,0.25)] lg:w-90"
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
