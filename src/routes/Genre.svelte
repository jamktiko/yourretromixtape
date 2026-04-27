<script lang="ts">
	// interface määrittelee, millaisia objekteja genret-taulukko sisältää. Interface jäljittelee muodoltaan json-tiedoston rakennetta, joka sisältää Genre-kentän.
	interface KappaleGenre {
		Genre: string;
	}

	let genret = $state<KappaleGenre[]>([]);
	// Muuttuja alustettu tyhjällä taulukolla, joka sisältää KappaleGenre-tyyppisiä objekteja. Tämä taulukko täytetään myöhemmin datan haun yhteydessä.
	let valittuGenre = $state<string>('');
	// Tähän muuttujaan tallennetaan käyttäjän valitsema genre. Alustettu tyhjällä merkkijonolla, joka tarkoittaa, että aluksi mikään genre ei ole valittuna.
	let virhe = $state<string | null>(null);
	// Tähän muuttujaan tallennetaan mahdollinen virheviesti, joka syntyy datan haun aikana. Alustettu null-arvolla, joka tarkoittaa, että aluksi ei ole virhettä.
	// Muuttujissa käytetty $state-syntaksia, joka on SvelteKitin tapa määritellä reaktiivisia tilamuuttujia. Näiden avulla komponentti osaa reagoida tilamuutoksiin ja päivittää näkymän automaattisesti.

	// $effect-syntaksi on SvelteKitin tapa määritellä sivuvaikutuksia, kuten datan hakua. Tämä efekti suoritetaan, kun komponentti renderöidään, ja se hakee genretiedot JSON-tiedostosta. Jos haku onnistuu, genret-taulukko täytetään haetulla datalla. Jos haku epäonnistuu, virhe-muuttujaan tallennetaan virheviesti, joka voidaan näyttää käyttäjälle.
	$effect(() => {
		const haeData = async () => {
			try {
				const haku = await fetch('/data/genre.json');
				if (!haku.ok) throw new Error('Failed to load genre data');

				const data: KappaleGenre[] = await haku.json();
				genret = data;
			} catch (err) {
				virhe = err instanceof Error ? err.message : 'Failed to load genre data';
			}
		};

		// Kutsutaan datan hakua suorittavaa funktiota, jotta genretiedot haetaan heti komponentin renderöityessä.
		haeData();
	});
</script>

<div>
	{#if virhe}
		<label for="genre" class="text-red-500">{virhe}</label>
	{/if}
	<select name="genre" bind:value={valittuGenre}>
		<option value="">Choose a Genre</option>
		<!-- Valinnat genret-taulukon perusteella -->
		{#each genret as g (g)}
			<option value={g.Genre}>
				{g.Genre}
			</option>
		{/each}
	</select>
</div>
<!-- Tyylit valikkonapin diviin -->
