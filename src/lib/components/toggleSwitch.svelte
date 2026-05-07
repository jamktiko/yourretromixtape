<script lang="ts">
	import { video } from '$lib/Video.svelte';

	// Tarkistetaan onko tumma teema aktiivinen
	let onkoTumma = $derived(video.teema === 'dark');
</script>

<button onclick={() => video.vaihdaTeema()} aria-label="Theme Switch"></button>

<div class="flex items-center gap-3">
	<!-- Itse kytkin -->
	<button
		type="button"
		onclick={() => video.vaihdaTeema()}
		class="relative inline-flex h-6 w-11 cursor-pointer rounded-full border-2 border-transparent
    transition-colors duration-200 ease-in-out focus:outline-none
    {onkoTumma ? 'bg-cta-color' : 'bg-text-color'}"
		role="switch"
		aria-checked={onkoTumma}
	>
		<!-- Liikkuva pallo -->
		<span
			class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-text-box shadow ring-0
      transition duration-200 ease-in-out
      {onkoTumma ? 'translate-x-5' : 'translate-x-0'}"
		></span>
	</button>

	<!-- Teksti kytkimen vieressä -->
	<span class="text-sm font-medium text-text-color">
		Dark mode {onkoTumma ? '(On)' : '(Off)'}
	</span>
</div>
