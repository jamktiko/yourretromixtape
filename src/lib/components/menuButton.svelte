<!-- Yleinen button-komponentti. Näkyvinä ominausuuksina teksti ja mahdollinen disabled-tila -->
<script lang="ts">
	export interface Props {
		onclick: () => void;
		text: string;
		// Napin ei-aktiivinen tila, joka estää käyttäjää klikkaamasta sitä. Oletuksena false, eli nappi on aktiivinen. Muista tyylitellä myös disabled-tila!
	}

	let { onclick, text }: Props = $props();
</script>

<button {onclick}>{text}</button>
