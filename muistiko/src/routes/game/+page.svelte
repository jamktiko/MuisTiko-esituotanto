<script lang="ts">
	import SingleCard from '../SingleCard.svelte';

	// interface korteille ettei typescript itke -bea
	interface Card {
		src: string;
		matched: boolean;
		id?: number;
	}

	const imgCover =
		'https://raw.githubusercontent.com/iamshaunjp/React-Firebase/lesson-58/magic-memory/public/img/cover.png';
	const imgHelmet =
		'https://raw.githubusercontent.com/iamshaunjp/React-Firebase/lesson-58/magic-memory/public/img/helmet-1.png';
	const imgPotion =
		'https://raw.githubusercontent.com/iamshaunjp/React-Firebase/lesson-58/magic-memory/public/img/potion-1.png';
	const imgRing =
		'https://raw.githubusercontent.com/iamshaunjp/React-Firebase/lesson-58/magic-memory/public/img/ring-1.png';
	const imgScroll =
		'https://raw.githubusercontent.com/iamshaunjp/React-Firebase/lesson-58/magic-memory/public/img/scroll-1.png';
	const imgShield =
		'https://raw.githubusercontent.com/iamshaunjp/React-Firebase/lesson-58/magic-memory/public/img/shield-1.png';
	const imgSword =
		'https://raw.githubusercontent.com/iamshaunjp/React-Firebase/lesson-58/magic-memory/public/img/sword-1.png';

	const cardImages: Card[] = [
		{ src: imgHelmet, matched: false },
		{ src: imgPotion, matched: false },
		{ src: imgRing, matched: false },
		{ src: imgScroll, matched: false },
		{ src: imgShield, matched: false },
		{ src: imgSword, matched: false }
	];

	// 2. State Runes with explicit Types
	let cards = $state<Card[]>([]);
	let turns = $state(0);
	let choiceOne = $state<Card | null>(null);
	let choiceTwo = $state<Card | null>(null);
	let disabled = $state(false);

	// 3. Shuffle logic
	const shuffledCards = () => {
		const shuffled = [...cardImages, ...cardImages]
			.sort(() => Math.random() - 0.5)
			.map((card) => ({ ...card, id: Math.random() }));

		cards = shuffled;
		turns = 0;
		choiceOne = null;
		choiceTwo = null;
	};

	// 4. Handle choices (using if/else to avoid linter "expression" errors)
	const handleChoice = (card: Card) => {
		if (choiceOne) {
			choiceTwo = card;
		} else {
			choiceOne = card;
		}
	};

	// 5. Reset Turn
	const resetTurn = () => {
		choiceOne = null;
		choiceTwo = null;
		turns = turns + 1;
	};

	// Initialize game
	shuffledCards();

	// Compare 2 selected cards
	$effect(() => {
		if (choiceOne && choiceTwo) {
			disabled = true;
			if (choiceOne.src === choiceTwo.src) {
				cards = cards.map((card) =>
					card.src === choiceOne!.src ? { ...card, matched: true } : card
				);
				resetTurn();
			} else {
				setTimeout(() => resetTurn(), 500);
			}
			disabled = false;
		}
	});
</script>

<div class="App">
	<h1>Tähän jotain</h1>
	<button onclick={shuffledCards}>Aloita alusta</button>

	<div class="card-grid">
		{#each cards as card (card.id)}
			<SingleCard
				{card}
				{imgCover}
				{disabled}
				{handleChoice}
				flipped={card === choiceOne || card === choiceTwo || card.matched}
			/>
		{/each}
	</div>
	<p>Turns: {turns}</p>
</div>

<style>
	.App {
		max-width: 860px;
		margin: 0 auto;
		background: #aaa;
		min-height: 100vh;
		text-align: center;
		padding: 1rem;
		color: white;
	}
	h1 {
		color: white;
	}
	button {
		background: none;
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
