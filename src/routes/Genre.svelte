<script lang="ts">
	import { fly } from 'svelte/transition';
	interface KappaleGenre {
		genre: string;
		kuva: string;
	}

	let { valittuGenre = $bindable() } = $props(); // Tähän muuttujaan tallennetaan käyttäjän valitsema genre. Alustettu tyhjällä merkkijonolla, joka tarkoittaa, että aluksi mikään genre ei ole valittuna.

	let avaaValikko = $state(false); // Tämä boolean-muuttuja määrittää, onko genre-valikko auki vai kiinni. Alustettu false-arvolla, joka tarkoittaa, että valikko on aluksi kiinni.
	let genret = $state<KappaleGenre[]>([]); // Muuttuja alustettu tyhjällä taulukolla, joka sisältää KappaleGenre-tyyppisiä objekteja. Tämä taulukko täytetään myöhemmin datan haun yhteydessä.
	let virhe = $state<string | null>(null); // Tähän muuttujaan tallennetaan mahdollinen virheviesti, joka syntyy datan haun aikana. Alustettu null-arvolla, joka tarkoittaa, että aluksi ei ole virhettä.
	// Funktio, joka päivittää vain yhden valinnan

	// Otetaan vastaan propsi, jota vanhempi voi lukea

	// Kun käyttäjä valitsee genren dropdownista:
	function valitse(nimi: string) {
		valittuGenre = nimi; // Korvaa vanhan valinnan uudella
		avaaValikko = false; // Sulkee valikon
	}

	// $effect-syntaksi on SvelteKitin tapa määritellä sivuvaikutuksia, kuten datan hakua. Tämä efekti suoritetaan, kun komponentti renderöidään, ja se hakee genretiedot JSON-tiedostosta. Jos haku onnistuu, genret-taulukko täytetään haetulla datalla. Jos haku epäonnistuu, virhe-muuttujaan tallennetaan virheviesti, joka voidaan näyttää käyttäjälle.
	$effect(() => {
		const haeData = async () => {
			try {
				const haku = await fetch('/data/genre.json');
				if (!haku.ok) throw new Error('Failed to load data');

				const data: KappaleGenre[] = await haku.json();
				genret = data;
			} catch (err) {
				virhe = err instanceof Error ? err.message : 'Failed to load data';
			}
		};

		// Kutsutaan datan hakua suorittavaa funktiota, jotta genretiedot haetaan heti komponentin renderöityessä.
		haeData();
	});
</script>

<!-- Valintanappi -->
<button
	class="flex w-42 cursor-pointer items-center justify-center rounded-lg border-[3px] border-text-color bg-cta-color px-3 py-1 font-teksti text-base leading-4 font-bold text-text-color shadow-md
		transition-all duration-300 ease-in-out
	hover:scale-105
	hover:bg-cta-color hover:shadow-lg"
	onclick={() => (avaaValikko = !avaaValikko)}
>
	<span class="text-center">{valittuGenre || 'Choose genre'}</span>
	<svg
		class="h-4 w-4 transition-transform duration-300"
		class:rotate-180={avaaValikko}
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
	>
		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
	</svg>
</button>
<!-- jos datan haussa tapahtuu virhe -->
{#if virhe}
	<label for="genre" class="mb-2 block font-medium text-red-500">{virhe}</label>
{/if}
<!-- jos valikko on auki ja ei virhettä -->
{#if avaaValikko && !virhe}
	<div
		transition:fly={{ y: -8, duration: 180 }}
		class="w-42 max-w-sm
	origin-top"
	>
		{#each genret as g (g.genre)}
			<!-- Käytetään valitse-funktiota, joka tallentaa listaan -->
			<button
				class="flex w-full cursor-pointer items-center justify-center rounded-lg
				border-[3px] border-text-color bg-cta-color p-2 px-3 py-1 font-teksti text-base leading-4 font-bold text-text-color
				transition-all duration-300 ease-in-out
		hover:scale-105
		hover:bg-cta-color hover:shadow-lg"
				onclick={() => valitse(g.genre)}
			>
				{g.genre}
				{#if valittuGenre === g.genre}
					<div class="relative">
						<span class="relative left-3 -translate-x-1/2 -translate-y-1/2 text-text-color">✓</span>
					</div>
				{/if}
			</button>
		{/each}
	</div>
{/if}
