<!-- Yleinen button-komponentti. Näkyvinä ominausuuksina teksti ja mahdollinen disabled-tila -->
<script lang="ts">
	export interface Props {
		onclick: () => void;
		text: string;
		disabled?: boolean;
		// Napin ei-aktiivinen tila, joka estää käyttäjää klikkaamasta sitä. Oletuksena false, eli nappi on aktiivinen. Muista tyylitellä myös disabled-tila!
	}

	let { onclick, text, disabled = false }: Props = $props();
</script>

<button
	class="w-30 rounded border-[3px] border-text-color bg-cta-color p-2 font-['Inter'] text-base leading-4 font-bold text-text-color shadow-[0px_4px_4px_2px_rgba(0,0,0,0.25)] transition-all duration-300 ease-in-out hover:scale-105 hover:bg-cta-color hover:shadow-lg
	disabled:scale-100 disabled:cursor-not-allowed disabled:bg-gray-400
	disabled:opacity-50 disabled:shadow-none"
	{onclick}
	{disabled}>{text}</button
>
