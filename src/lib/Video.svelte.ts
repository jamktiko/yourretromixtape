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
	//getterit palauttaa tilan muuttujat:
	get biisit() {
		return this.tila.biisit;
	}
	get genret() {
		return this.tila.genreData;
	}
	//hakee kerralla datan ja tallentaa tilaan:
	async lataadata() {
		const [biisitRes, genreRes] = await Promise.all([
			fetch('/data/biisit.json'),
			fetch('/data/genre.json')
		]);
		this.tila.biisit = await biisitRes.json();
		this.tila.genreData = await genreRes.json();
	}
	//biisin arpominen samasta genrestä joka valittiin,
	//parametrina saadaan juuri nyt soitettava biisi:
	randomize(naytettavaBiisi: Biisi) {
		if (!naytettavaBiisi) return; //jos biisiä ei löydy, ei tehdä mitään.
		//käytetään filteriä luomaan uusi taulukko jossa on saman genren
		// biisit paitsi se jota soitetaan juuri nyt:
		const genreBiisit = this.biisit.filter(
			(b) => b.genre === naytettavaBiisi.genre && b.id !== naytettavaBiisi.id
		);
		//arvotaan random biisi uudesta taulukosta
		const randomBiisi = Math.floor(Math.random() * genreBiisit.length);
		const valittuRandomBiisi = genreBiisit[randomBiisi];
		// eslint-disable-next-line svelte/no-navigation-without-resolve
		goto(`/new?id=${valittuRandomBiisi.id}`);
	}
	//WILHON FUNKTIO:
	//biisin arpominen valitusta genrestä,
	//joka navigoi videolle, parametrina saadaab valittu genre:
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
	//muutin funktion nimen:
	async mixedGenre() {
		try {
			const randomID = Math.floor(Math.random() * this.biisit.length);
			// Ottaa koko biisin teidot tuosta kohdasta
			const valittuVideo = this.biisit[randomID];
			// (?id=), koska silloin ei tarvitse [id]-kansiorakennetta.
			const osoite = `new?id=${valittuVideo.id}`;
			// eslint-disable-next-line svelte/no-navigation-without-resolve
			await goto(osoite);
		} catch (virhe) {
			console.error('Musiikkivideon haku epäonnistui:', virhe);
		}
	}
}
//exportataan instanssi:
export const video = new Video();
