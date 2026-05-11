<script lang="ts">
	export interface Props {
		onclick: () => void;
		text: string;
	}

	let { onclick, text }: Props = $props();
</script>

<button
	class="w-30 cursor-pointer rounded-lg border-[3px] border-text-color bg-black/0 p-2 font-teksti text-base leading-4 font-bold text-text-color shadow-[0px_4px_4px_2px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all duration-300 ease-in-out hover:scale-105 hover:bg-black/0 hover:shadow-lg active:bg-black/50 active:duration-0"
	{onclick}>{text}</button
>
