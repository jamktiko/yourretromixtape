<script lang="ts">
	import { fly } from 'svelte/transition';
	import { video } from '$lib/Video.svelte';

	let { valittuGenre = $bindable() } = $props(); // Tähän muuttujaan tallennetaan käyttäjän valitsema genre. Alustettu tyhjällä merkkijonolla, joka tarkoittaa, että aluksi mikään genre ei ole valittuna.

	let avaaValikko = $state(false); // Tämä boolean-muuttuja määrittää, onko genre-valikko auki vai kiinni. Alustettu false-arvolla, joka tarkoittaa, että valikko on aluksi kiinni.

	// Kun käyttäjä valitsee genren dropdownista:
	function valitse(nimi: string) {
		valittuGenre = nimi; // Korvaa vanhan valinnan uudella
		avaaValikko = false; // Sulkee valikon
	}

	function suljeValikko() {
		avaaValikko = false;
	}
</script>

<!-- Valintanappi -->
<button
	class="flex w-42 cursor-pointer items-center justify-center rounded-lg border-[3px] border-text-color bg-cta-color px-3 py-1 font-teksti text-base leading-4 font-bold text-text-color shadow-md
		transition-all duration-300 ease-in-out
	hover:scale-105
	hover:bg-cta-color hover:shadow-lg active:bg-active-color active:duration-0"
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

{#if avaaValikko}
	<div role="presentation" class="fixed inset-0 z-10 bg-transparent" onclick={suljeValikko}></div>
{/if}

<!-- jos valikko on auki ja ei virhettä -->
{#if avaaValikko}
	<div
		transition:fly={{ y: -8, duration: 180 }}
		class="absolute top-full right-0 z-50 mt-2 w-42 max-w-sm origin-top"
	>
		{#each video.genret as g (g.genre)}
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
