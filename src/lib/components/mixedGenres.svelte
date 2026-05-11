<script lang="ts">
	import { video } from '$lib/Video.svelte';
</script>

<button
	class="flex w-auto cursor-pointer items-center justify-center rounded-lg border-[3px] border-text-color bg-black/0 p-2 font-teksti text-base leading-none font-bold whitespace-nowrap text-text-color shadow-[0px_4px_4px_2px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all duration-300 ease-in-out hover:scale-105 hover:bg-black/0 hover:shadow-lg active:bg-black/50 active:duration-0"
	onclick={() => video.mixedGenre()}>RandomGenre</button
>
<!--Video.svelte.ts teidostossa on mixedGenre funktio joka arpoo genren ja siitä videon --->
