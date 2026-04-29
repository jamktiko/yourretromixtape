<!--Lisenssit ja tekijänoikeudet-->

<script lang="ts">
	//vastaanottaa onclose funktion joka sulkee modaalin eli ikkunan
	let { onClose } = $props<{ onClose: () => void }>();
</script>

<!-- modaalin sisältölaatikko: -->
<div
	class="h-80 w-84 flex-col overflow-auto rounded-xl border-[3px] border-text-color bg-text-box p-2 px-5 text-left font-teksti text-base leading-4 font-bold text-text-color shadow-[0px_4px_4px_2px_rgba(0,0,0,0.25)]
	lg:w-120
	[&::-webkit-scrollbar]:w-1.5
[&::-webkit-scrollbar]:bg-transparent
[&::-webkit-scrollbar-thumb]:rounded-full
[&::-webkit-scrollbar-thumb]:bg-text-color
[&::-webkit-scrollbar-track]:bg-transparent"
>
	<!-- suljenappi ikkunalle: -->
	<div class="flex justify-end">
		<button class="cursor-pointer" onclick={onClose}>Close</button>
	</div>

	<h1 class="pb-2 text-center text-xl">Credits</h1>
	<p class="p-1 font-medium">
		All videos are embedded from YouTube via the official YouTube embed feature and remain the
		property of their respective copyright holders. This project is a non-commercial educational
		work created as part of a school assignment and is not intended for permanent public
		distribution. Use of this content is intended to fall under fair use principles for educational
		and non-commercial purposes.
	</p>
	<p class="py-2 text-center text-xl">Sources for facts:</p>
	<ul class="p-1 font-medium">
		<li class="hover:underline active:text-cta-color">
			<a href="http://wikipedia.org">wikipedia.org</a>
		</li>
		<li class="hover:underline active:text-cta-color">
			<a href="http://www.songmeaningsandfacts.com">songmeaningsandfacts.com</a>
		</li>
		<li class="hover:underline active:text-cta-color">
			<a href="http://www.rollingstone.com">rollingstone.com</a>
		</li>
		<li class="hover:underline active:text-cta-color">
			<a href="http://www.pdmusic.org">pdmusic.org</a>
		</li>
		<li class="hover:underline active:text-cta-color">
			<a href="https://www.classical-music.com">classical-music.com</a>
		</li>
		<li class="hover:underline active:text-cta-color">
			<a href="https://www.schoolofrock.com">schoolofrock.com</a>
		</li>
		<li class="hover:underline active:text-cta-color">
			<a href="http://www.songfacts.com">songfacts.com</a>
		</li>
		<li class="hover:underline active:text-cta-color">
			<a href="http://fanworld.co">fanworld.co</a>
		</li>
		<li class="hover:underline active:text-cta-color">
			<a href="http://www.huffingtonpost.co.uk">huffingtonpost.co.uk</a>
		</li>
		<li class="hover:underline active:text-cta-color">
			<a href="http://www.cheatsheet.com">cheatsheet.com</a>
		</li>
		<li class="hover:underline active:text-cta-color">
			<a href="http://americansongwriter.com">americansongwriter.com</a>
		</li>
		<li class="hover:underline active:text-cta-color">
			<a href="http://musicminds.com">musicminds.com</a>
		</li>
		<li class="hover:underline active:text-cta-color">
			<a
				href="https://americansongwriter.com/behind-the-history-and-meaning-of-tupac-shakurs-california-love/"
				>americansongwriter.com - California Love</a
			>
		</li>
		<li class="hover:underline active:text-cta-color">
			<a
				href="https://www.esquire.com/entertainment/music/a24511474/beastie-boys-sabotage-song-meaning/"
				>esquire.com - Beastie Boys Sabotage</a
			>
		</li>
		<li class="hover:underline active:text-cta-color">
			<a href="https://en.wikipedia.org/wiki/Children%27s_Story">wikipedia.org - Children's Story</a
			>
		</li>
		<li class="hover:underline active:text-cta-color">
			<a href="https://en.wikipedia.org/wiki/Straight_Outta_Compton"
				>wikipedia.org - Straight Outta Compton</a
			>
		</li>
	</ul>
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
