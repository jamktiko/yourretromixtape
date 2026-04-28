<script lang="ts">
	interface KappaleGenre {
		Genre: string;
	}

	let valitutGenret = $state<string[]>([]); // Tähän muuttujaan tallennetaan käyttäjän valitsema genre. Alustettu tyhjällä merkkijonolla, joka tarkoittaa, että aluksi mikään genre ei ole valittuna.

	let avaaValikko = $state(false); // Tämä boolean-muuttuja määrittää, onko genre-valikko auki vai kiinni. Alustettu false-arvolla, joka tarkoittaa, että valikko on aluksi kiinni.
	let genret = $state<KappaleGenre[]>([]); // Muuttuja alustettu tyhjällä taulukolla, joka sisältää KappaleGenre-tyyppisiä objekteja. Tämä taulukko täytetään myöhemmin datan haun yhteydessä.
	let virhe = $state<string | null>(null); // Tähän muuttujaan tallennetaan mahdollinen virheviesti, joka syntyy datan haun aikana. Alustettu null-arvolla, joka tarkoittaa, että aluksi ei ole virhettä.

	//Funktio, joka tallentaa valinnan taulukkoon
	const valitse = (genre: string) => {
		// Lisätään uusi genre taulukkoon (spread-operaattori on varma tapa)
		valitutGenret = [...valitutGenret, genre];

		// Suljetaan valikko valinnan jälkeen
		avaaValikko = false;
	};
	// $effect-syntaksi on SvelteKitin tapa määritellä sivuvaikutuksia, kuten datan hakua. Tämä efekti suoritetaan, kun komponentti renderöidään, ja se hakee genretiedot JSON-tiedostosta. Jos haku onnistuu, genret-taulukko täytetään haetulla datalla. Jos haku epäonnistuu, virhe-muuttujaan tallennetaan virheviesti, joka voidaan näyttää käyttäjälle.
	$effect(() => {
		const haeData = async () => {
			try {
				const haku = await fetch('/data/genre.json');
				if (!haku.ok) throw new Error('Failed to load data');

				const data: KappaleGenre[] = await haku.json();
				genret = data;
			} catch (err) {
				virhe = err instanceof Error ? err.message : 'Failed to load data';
			}
		};

		// Kutsutaan datan hakua suorittavaa funktiota, jotta genretiedot haetaan heti komponentin renderöityessä.
		haeData();
	});
</script>

<!-- Valintanappi -->
<button onclick={() => (avaaValikko = !avaaValikko)}> Choose a Genre </button>
<!-- jos datan haussa tapahtuu virhe -->
{#if virhe}
	<label for="genre">{virhe}</label>
{/if}
<!-- jos valikko on auki ja ei virhettä -->
{#if avaaValikko && !virhe}
	<div>
		{#each genret as g (g.Genre)}
			<!-- Käytetään valitse-funktiota, joka tallentaa listaan -->
			<button onclick={() => valitse(g.Genre)}>
				{g.Genre}
			</button>
		{/each}
	</div>
{/if}
