<script lang="ts">
	import { page } from '$app/state';
	import Button from '$lib/components/Button.svelte';
	import MenuButton from '$lib/components/menuButton.svelte';
	import { goto } from '$app/navigation';
	import { video } from '$lib/Video.svelte';

	// haetaan id osoiteriviltä
	let valittuID = $derived(page.url.searchParams.get('id'));
	// etsitään listasta se biisi, jonka id vastaa valittua id:tä ja
	//tila päivittyy aina, kun valittuID muuttuu:
	let naytettavaBiisi = $derived(video.biisit.find((b) => b.id === valittuID));
	let dynaaminenLogo = $derived.by(() => {
		if (!naytettavaBiisi || video.genret.length === 0) return null;

		const loytynytGenre = video.genret.find((g) => g.genre === naytettavaBiisi.genre);
		return loytynytGenre ? loytynytGenre.kuva : null;
	});
</script>

<!-- Sivun pää asettelun antavat tyylit -->
<main
	class="flex min-h-screen flex-col items-center justify-center px-4 font-teksti text-base leading-4 font-bold text-text-color"
>
	<header class="h-30 w-50">
		{#if dynaaminenLogo}
			<img src={dynaaminenLogo} alt="Genre logo" />
		{/if}
	</header>

	<!-- containeri sivun sisällölle -->
	<div class="inline-flex flex-col items-center justify-center gap-6">
		{#if naytettavaBiisi}
			<!-- videosoittimen containeri -->
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

			<!-- Wrapper Menu ja Randomize napeille -->
			<div class="grid grid-cols-2 gap-4">
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
				<MenuButton text="MENU" onclick={() => goto('/')} />
				<!-- randomize nappi: -->
				<Button text="RANDOMIZE" onclick={() => video.randomize(naytettavaBiisi)} />
			</div>

			<!-- teksti boxi container -->
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
	</div>
</main>
