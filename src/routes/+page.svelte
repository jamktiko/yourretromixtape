<script lang="ts">
	import Genre from './Genre.svelte';
	import MixedGenres from '$lib/components/mixedGenres.svelte';
	import Button from '$lib/components/Button.svelte';
	import InfoButton from '$lib/components/InfoButton.svelte';
	import { video } from '$lib/Video.svelte';

	let valittuGenre = $state('');
	//infoikkuna, joka kertoo onko modal auki vai ei
	let modalAuki = $state(false);
	let onkoValittu = $derived(valittuGenre !== '');
</script>

<!-- etusivun päätyylit, josta asettelu muodostuu -->
<main
	class="flex min-h-screen flex-col items-center justify-center px-4 font-teksti text-base leading-4 font-bold text-text-color"
>
	<header class="h-auto w-auto p-6">
		<img class="h-50 w-auto" src="/logo_yourRetroMixtape.png" alt="Main Logo" />
	</header>

	<!-- containeri missä on kaikki etusivun sisältö paitsi header -->
	<div
		class="h-relative mb-60 flex w-80 flex-col justify-between rounded-xl border-[3px] border-text-color bg-text-box p-2 px-5 text-left shadow-[0px_4px_4px_2px_rgba(0,0,0,0.25)] lg:w-90"
	>
		{#if modalAuki}
			<InfoButton onClose={() => (modalAuki = false)} />
		{/if}
		<div class="flex justify-between">
			<!-- Info modaalin avaavan nappulan tyylit -->
			<button
				class="cursor-pointer transition-all duration-300 ease-in-out hover:scale-105"
				onclick={() => (modalAuki = true)}
				aria-label="Info"
			>
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<!-- Circle -->
					<circle cx="12" cy="12" r="10" stroke="black" stroke-width="2" />

					<!-- "i" stem -->
					<line x1="12" y1="10" x2="12" y2="16" stroke="black" stroke-width="2" />

					<!-- "i" dot -->
					<circle cx="12" cy="7" r="1.5" fill="black" />
				</svg>
			</button>
			<div class="relative inline-block self-start">
				<Genre bind:valittuGenre />
			</div>
		</div>
		{#if video.edellinenBiisi}
			<div class="mt-4 text-left text-sm">
				<p>Last watched: {video.edellinenBiisi.title}</p>
				 // Näyttää viimeksi soitetun biisin artistin ja kappaleen nimen.
			</div>
		{/if}
		<div class="flex flex-col items-center py-5">
			<h1 class="pb-2 text-center text-xl">Welcome to YourRetroMixtape!</h1>
			<p class="p-1 font-medium">
				Choose a genre from the "Choose genre" dropdown menu, or press the "RandomGenre" button to
				pick one of the curated genres on random.
			</p>
		</div>

		<!-- Wrapperit etusivun RandomGenre ja Start napeille -->
		<div class="flex flex-col items-center gap-4">
			<div class="mb-3.5 grid grid-cols-2 gap-4">
				<MixedGenres />
				<Button
					onclick={() => video.arvoVideo(valittuGenre)}
					text="Start"
					disabled={!onkoValittu}
				/>
			</div>
		</div>
	</div>
</main>
