<!--Lisenssit ja tekijänoikeudet-->

<script lang="ts">
	//vastaanottaa onclose funktion joka sulkee modaalin eli ikkunan
	let { onClose } = $props<{ onClose: () => void }>();
</script>

<div>
	<!-- modaalin sisältölaatikko: -->
	<h1>Credits</h1>
	<p>
		All videos are embedded from YouTube via the official YouTube embed feature and remain the
		property of their respective copyright holders. This project is a non-commercial educational
		work created as part of a school assignment and is not intended for permanent public
		distribution. Use of this content is intended to fall under fair use principles for educational
		and non-commercial purposes.
	</p>
	<p>Sources for facts:</p>
	<ul>
		<li><a href="http://wikipedia.org">wikipedia.org</a></li>
		<li><a href="http://www.songmeaningsandfacts.com">songmeaningsandfacts.com</a></li>
		<li><a href="http://www.rollingstone.com">rollingstone.com</a></li>
		<li><a href="http://www.pdmusic.org">pdmusic.org</a></li>
		<li><a href="https://www.classical-music.com">classical-music.com</a></li>
		<li><a href="https://www.schoolofrock.com">schoolofrock.com</a></li>
		<li><a href="http://www.songfacts.com">songfacts.com</a></li>
		<li><a href="http://fanworld.co">fanworld.co</a></li>
		<li><a href="http://www.huffingtonpost.co.uk">huffingtonpost.co.uk</a></li>
		<li><a href="http://www.cheatsheet.com">cheatsheet.com</a></li>
		<li><a href="http://americansongwriter.com">americansongwriter.com</a></li>
		<li><a href="http://musicminds.com">musicminds.com</a></li>
		<li>
			<a
				href="https://americansongwriter.com/behind-the-history-and-meaning-of-tupac-shakurs-california-love/"
				>americansongwriter.com - California Love</a
			>
		</li>
		<li>
			<a
				href="https://www.esquire.com/entertainment/music/a24511474/beastie-boys-sabotage-song-meaning/"
				>esquire.com - Beastie Boys Sabotage</a
			>
		</li>
		<li>
			<a href="https://en.wikipedia.org/wiki/Children%27s_Story">wikipedia.org - Children's Story</a
			>
		</li>
		<li>
			<a href="https://en.wikipedia.org/wiki/Straight_Outta_Compton"
				>wikipedia.org - Straight Outta Compton</a
			>
		</li>
	</ul>

	<!-- suljenappi ikkunalle: -->
	<button onclick={onClose}>Close</button>
</div>

<!-- Tämä tulee page.svelteen eli etusivulle, josta käyttäjä voi 
klikata info-nappia:
<script lang="ts">
//tämä siis skripti osioon
	import InfoButtonTest from './components/InfoButton.svelte';
	//muuttuja joka kertoo onko modaali auki vai ei:
	let modalAuki = $state(false);
</script>
Info-nappi joka avaa modaalin:
<button onclick={() => (modalAuki = true)}>Info</button>
onclose välitetään infoButton komponentille, joka sulkee modaalin:
{#if modalAuki}
	<InfoButtonTest onClose={() => (modalAuki = false)} />
{/if} -->
