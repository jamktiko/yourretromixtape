/* eslint-disable svelte/no-navigation-without-resolve */
import { goto } from '$app/navigation';

export interface Biisi {
	id: string;
	title: string;
	url: string;
	genre: string;
	fact: string[]; //taulukko faktoille
}

export interface GenreData {
	genre: string;
	kuva: string;
}

class Video {
	// Tilat (state)
	biisit = $state<Biisi[]>([]); //taulukko biisit alkuun tyhjä ja se saa sisältöä haun jälkeen
	genret = $state<GenreData[]>([]);
	valittuGenre = $state('');
	latausKaynnissa = $state(false);

	constructor() {
		// Ladataan data heti kun kyseinen olio luodaan
		this.lataaKaikkiData();
	}

	async lataaKaikkiData() {
		if (this.biisit.length > 0) {
			// Ei lataa uudestaan, jos data on jo ladattu
			return (this.latausKaynnissa = true);
		}

		try {
			// Käynnistetään molemmat haut samanaikaisesti Promise.all:lla, mikä nopeuttaa latausta
			const [biisitRes, genretRes] = await Promise.all([
				fetch('/data/biisit.json'),
				fetch('/data/genre.json')
			]);

			// Muunnetaan vastaukset JSON-muotoon ja tallennetaan muuttujiin.
			this.biisit = (await biisitRes.json()) as Biisi[];
			this.genret = (await genretRes.json()) as GenreData[];
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			// Finally-lohko suoritetaan aina riippumatta siitä, onnistuiko haku vai tuliko virhe.
			// Tässä se kytkee latausanimaation tai "Ladataan..."-tilan pois päältä.
			this.latausKaynnissa = false;
		}
	}

	// Asynkroninen funktio, joka arpoo biisin ja siirtyy katselunäkymään.
	// Parametri kohdegenre on valinnainen (?); jos sitä ei anneta, arvotaan kaikista biiseistä.
	async arvoSatunnainenBiisi(kohdegenre?: string) {
		// Luodaan lista arvontaa varten:
		// Jos kohdegenre on annettu, suodatetaan (filter) vain kyseisen genren biisit.
		// Jos kohdegenretä ei ole annettu, käytetään koko biisilistaa (this.biisit).
		const lista = kohdegenre ? this.biisit.filter((b) => b.genre === kohdegenre) : this.biisit;

		// Tarkistetaan, ettei lista ole tyhjä (varmistus, jotta koodi ei kaadu arvonnassa).
		if (lista.length === 0) {
			return; // Lopetetaan suoritus, jos sopivia biisejä ei löytynyt.
		}

		// Arvotaan satunnainen biisi listasta:
		// Math.random() antaa luvun 0-1 väliltä, joka kerrotaan listan pituudella ja pyöristetään alaspäin.
		const randomBiisi = lista[Math.floor(Math.random() * lista.length)];
		// Siirrytään uuteen osoitteeseen käyttämällä Svelten goto-funktiota.
		// (?id=), koska silloin ei tarvitse [id]-kansiorakennetta.
		await goto(`/new?id=${randomBiisi.id}`);
	}
}

// Exportataan yksi instanssi, jota koko sovellus käyttää
export const video = new Video();
