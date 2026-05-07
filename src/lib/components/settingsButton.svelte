<!--Lisenssit ja tekijänoikeudet-->

<script lang="ts">
	//vastaanottaa onclose funktion joka sulkee modaalin eli ikkunan
	import { fade, scale } from 'svelte/transition';
	let { onClose } = $props<{ onClose: () => void }>();
	import ToggleSwitch from './toggleSwitch.svelte';
</script>

<!-- modaalin sisältölaatikko: -->
<div
	class="fixed inset-0 z-50 flex items-center justify-center"
	in:fade={{ duration: 150 }}
	out:fade={{ duration: 100 }}
>
	<div
		class="h-48 w-52 flex-col overflow-auto rounded-xl border-[3px] border-text-color bg-text-box p-2 px-5 text-left font-teksti text-base leading-4 font-bold text-text-color shadow-[0px_4px_4px_2px_rgba(0,0,0,0.25)]
	lg:w-105"
		in:scale={{ duration: 200, start: 0.9 }}
		out:scale={{ duration: 150 }}
	>
		<!-- suljenappi ikkunalle: -->
		<div class="flex justify-end">
			<button class="cursor-pointer text-text-color" onclick={onClose} aria-label="Close">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 20 20"
					fill="none"
				>
					<path
						d="M15 5L5 15M5 5L15 15"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
		</div>

		<ToggleSwitch />
	</div>
</div>
