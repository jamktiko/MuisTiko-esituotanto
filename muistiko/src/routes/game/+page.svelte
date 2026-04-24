<script lang="ts">
	import { onMount } from 'svelte';
	import SingleCard from '$lib/components/SingleCard.svelte';
	import { pelinTila, haeTeemanData, haeKuvanPolku } from '$lib/gameSettings.svelte';

	// trackaa teemaa reaktiivisesti
	let teema = $derived(pelinTila.teema);

	const imgCover =
		'https://raw.githubusercontent.com/iamshaunjp/React-Firebase/lesson-58/magic-memory/public/img/cover.png';

	// interface korteille ettei typescript itke -bea
	interface Card {
		src: string;
		matched: boolean;
		id?: number;
	}

	let cardImages: Card[] = [];
	let cards = $state<Card[]>([]);
	let turns = $state(0);
	let choiceOne = $state<Card | null>(null);
	let choiceTwo = $state<Card | null>(null);
	let disabled = $state(false);

	async function lataaTeemanData() {
		try {
			const currentTheme = pelinTila.teema;
			const themeData = await haeTeemanData(currentTheme);

			cardImages = themeData.map((item: { pic: string }) => ({
				src: haeKuvanPolku(currentTheme, item.pic),
				matched: false
			}));

			sekoitaKortit();
		} catch (error) {
			console.error('Error loading theme data:', error);
		}
	}

	onMount(() => {
		lataaTeemanData();
	});

	const sekoitaKortit = () => {
		const shuffled = [...cardImages, ...cardImages]
			.sort(() => Math.random() - 0.5)
			.map((card) => ({ ...card, id: Math.random() }));

		cards = shuffled;
		turns = 0;
		choiceOne = null;
		choiceTwo = null;
	};

	const käsitteleValinta = (card: Card) => {
		if (disabled) return;
		if (card.matched) return;
		if (card === choiceOne) return;

		if (choiceOne) {
			choiceTwo = card;
		} else {
			choiceOne = card;
		}
	};

	const nollaaVuoro = () => {
		choiceOne = null;
		choiceTwo = null;
		turns = turns + 1;
	};

	$effect(() => {
		if (choiceOne && choiceTwo) {
			disabled = true;
			if (choiceOne.src === choiceTwo.src) {
				cards = cards.map((card) =>
					card.src === choiceOne!.src ? { ...card, matched: true } : card
				);
				nollaaVuoro();
			} else {
				setTimeout(() => nollaaVuoro(), 1000);
			}
			setTimeout(() => (disabled = false), 1000);
		}
	});
</script>

<main>
	<div class="App">
		<button onclick={sekoitaKortit}>Aloita alusta</button>

		<div class="card-grid">
			{#each cards as card (card.id)}
				<SingleCard
					{card}
					{imgCover}
					{disabled}
					handleChoice={käsitteleValinta}
					flipped={card === choiceOne || card === choiceTwo || card.matched}
				/>
			{/each}
		</div>
		<p>Turns: {turns}</p>
	</div>
	<p>Siirrot: {turns}</p>
</main>

<style>
	.App {
		max-width: 860px;
		margin: 0 auto;
		background: #fff;
		min-height: 100vh;
		text-align: center;
		padding: 1rem;
		color: white;
	}

	button {
		background: #aaa;
		border: 2px solid #fff;
		padding: 6px 12px;
		border-radius: 4px;
		color: #fff;
		cursor: pointer;
		font-size: 1em;
	}
	button:hover {
		background: black;
		color: #fff;
	}
	.card-grid {
		margin-top: 40px;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-gap: 20px;
	}
</style>
