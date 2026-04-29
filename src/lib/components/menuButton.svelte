<!-- Yleinen button-komponentti. Näkyvinä ominausuuksina teksti ja mahdollinen disabled-tila -->
<script lang="ts">
	export interface Props {
		onclick: () => void;
		text: string;
		// Napin ei-aktiivinen tila, joka estää käyttäjää klikkaamasta sitä. Oletuksena false, eli nappi on aktiivinen. Muista tyylitellä myös disabled-tila!
	}

	let { onclick, text }: Props = $props();
</script>

<button
	class="w-30 cursor-pointer rounded-lg border-[3px] border-text-color bg-black/0 p-2 font-teksti text-base leading-4 font-bold text-text-color shadow-[0px_4px_4px_2px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all duration-300 ease-in-out hover:scale-105 hover:bg-black/0 hover:shadow-lg"
	{onclick}>{text}</button
>
