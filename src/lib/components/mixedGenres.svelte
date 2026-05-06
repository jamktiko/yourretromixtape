<script lang="ts">
	import { video } from '$lib/Video.svelte';
</script>

<button
	class="w-30 cursor-pointer rounded-lg border-[3px] border-text-color bg-black/5 p-2 font-teksti text-base leading-4 font-bold text-text-color shadow-[0px_4px_4px_2px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all duration-300 ease-in-out hover:scale-105 hover:bg-black/0 hover:shadow-lg"
	onclick={() => video.mixedGenre()}>RandomGenre</button
>
