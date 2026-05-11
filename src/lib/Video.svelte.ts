import type { Biisi, GenreData } from '$lib/tyypit';
import { goto } from '$app/navigation';
//video-luokka sisältää metodit ja tilan.
//komponentit käyttävät video luokkaa ja käyttää samaa dataa:
class Video {
	//tila-objekti sisältää reaktiiviset muuttujat:
	tila = $state({
		biisit: [] as Biisi[],
		genreData: [] as GenreData[]
	});
	edellinenBiisi = $state<Biisi | null>(null); // NT: muuttuja, joka tallentaa viimeksi soitetun biisin
	// tiedot aluksi null, koska ei ole vielä soitetun biisin tietoja.

	//getterit palauttaa tilan muuttujat:
	get biisit(): Biisi[] {
		return this.tila.biisit;
	}
	get genret(): GenreData[] {
		return this.tila.genreData;
	}
	//hakee kerralla datan ja tallentaa tilaan:
	async lataadata(): Promise<void> {
		try {
			const [biisitRes, genreRes] = await Promise.all([
				fetch('/data/biisit.json'),
				fetch('/data/genre.json')
			]);
			if (!biisitRes.ok || !genreRes.ok) {
				throw new Error('Failed to fetch data');
			}
			this.tila.biisit = await biisitRes.json();
			this.tila.genreData = await genreRes.json();
		} catch (error: unknown) {
			console.error('Failed to load data:', error);
		}
	}
	//biisin arpominen samasta genrestä joka valittiin,
	//parametrina saadaan juuri nyt soitettava biisi:
	randomize(naytettavaBiisi: Biisi): void {
		if (!naytettavaBiisi) return; //jos biisiä ei löydy, ei tehdä mitään.
		//käytetään filteriä luomaan uusi taulukko jossa on saman genren
		// biisit paitsi se jota soitetaan juuri nyt:
		const genreBiisit = this.biisit.filter(
			(b) => b.genre === naytettavaBiisi.genre && b.id !== naytettavaBiisi.id
		);
		//arvotaan random biisi uudesta taulukosta
		const randomBiisi = Math.floor(Math.random() * genreBiisit.length);

		const valittuRandomBiisi = genreBiisit[randomBiisi];
		/* NT */ this.edellinenBiisi = valittuRandomBiisi; // tallennetaan viimeksi soitetun biisin tiedot,
		// jotta voidaan näyttää "Last watched -teksti" etusivulla.
		// eslint-disable-next-line svelte/no-navigation-without-resolve
		goto(`/new?id=${valittuRandomBiisi.id}`);
	}
	//WILHON FUNKTIO:
	//biisin arpominen valitusta genrestä,
	//joka navigoi videolle, parametrina saadaan valittu genre:
	async arvoVideo(valittuGenre: string) {
		try {
			const suodatetutBiisit = this.biisit.filter((biisi: Biisi) => biisi.genre === valittuGenre);

			if (suodatetutBiisit.length === 0) {
				console.error('Kyseisellä genrellä ei löytynyt biisejä:', valittuGenre);
				return;
			}
			// Arpoo paikan listalta (0- listan pituus)
			const randomID = Math.floor(Math.random() * suodatetutBiisit.length);
			// Ottaa koko biisin tiedot tuosta kohdasta
			const valittuVideo = suodatetutBiisit[randomID];
			/* NT */ this.edellinenBiisi = valittuVideo; // tallennetaan viimeksi soitetun biisin tiedot
			// edellinenBiisi-muuttujaan, jotta voidaan näyttää "Last watched -teksti" etusivulla.
			// (?id=), koska silloin ei tarvitse [id]-kansiorakennetta.
			const osoite = `new?id=${valittuVideo.id}`;
			// eslint-disable-next-line svelte/no-navigation-without-resolve
			await goto(osoite);
		} catch (virhe) {
			console.error('Musiikkivideon haku epäonnistui:', virhe);
		}
	}
	//NEAN FUNKTIO:
	//biisin arpominen täysin satunnaisesti, joka navigoi videolle:
	async mixedGenre() {
		try {
			// Arvotaan satunnainen kokonaisluku väliltä 0 ja biisilistan pituus (ID:n arpominen)
			const randomID = Math.floor(Math.random() * this.biisit.length);
			// Ottaa koko biisin tiedot tuosta kohdasta
			const valittuVideo = this.biisit[randomID];
			this.edellinenBiisi = valittuVideo; // tallennetaan viimeksi soitetun biisin tiedot
			// edellinenBiisi-muuttujaan, jotta voidaan näyttää "Last watched -teksti" etusivulla.

			// Luodaan uusi osoite (URL), johon liitetään valitun videon id-tunnus hakuparametriksi.
			// (?id=), koska silloin ei tarvitse [id]-kansiorakennetta.
			const osoite = `new?id=${valittuVideo.id}`;
			// eslint-disable-next-line svelte/no-navigation-without-resolve
			await goto(osoite); // Siirrytään luotuun osoitteeseen ja odotetaan, että navigointi valmistuu.
		} catch (virhe) {
			console.error('Music video search failed:', virhe);
			//Virhe ilmoitus tulee consoleen näkymään.
		}
	}

	teema = $state('default');

	vaihdaTeema() {
		this.teema = this.teema === 'default' ? 'dark' : 'default';

		// Päivitetään HTML-elementin attribuutti
		if (typeof document !== 'undefined') {
			document.documentElement.setAttribute('data-theme', this.teema);
			// Tallennetaan valinta, jotta se säilyy sivun latauksen yli
			localStorage.setItem('theme', this.teema);
		}
	}
}
//exportataan instanssi:
export const video = new Video();
