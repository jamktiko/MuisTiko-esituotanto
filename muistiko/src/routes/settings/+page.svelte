<script lang="ts">
	import SettingSelector from '$lib/components/SettingSelector.svelte';
	import Button from '$lib/components/Button.svelte';

	interface Asetusvalikko {
		teksti: string;
		placeholder: string;
		optiot: string[];
	}

	function aloitaPeli() {
		window.location.href = '/game';
	}

	const asetukset: Asetusvalikko[] = [
		{
			teksti: 'Teema',
			placeholder: 'Valitse teema',
			optiot: ['Kissat', 'Koirat', 'Opettajat', 'TIKO']
		},
		{
			teksti: 'Korttien määrä',
			placeholder: 'Valitse määrä',
			optiot: ['12', '20', '30']
		},
		{
			teksti: 'Aikaraja (min)',
			placeholder: 'Valitse aika',
			optiot: ['1', '2', '3']
		},
		{
			teksti: 'Sallitut hutit',
			placeholder: 'Valitse huteja',
			optiot: ['15', '7', '3']
		}
	];
</script>

<header>
	<h1>Muistipelin asetukset</h1>
</header>

<div class="asetukset">
	{#each asetukset as asetus (asetus)}
		<SettingSelector
			teksti={asetus.teksti}
			placeholder={asetus.placeholder}
			optiot={asetus.optiot}
		/>
	{/each}
</div>

<div class="nappi">
	<Button text="Aloita peli!" onclick={aloitaPeli} />
</div>

<style>
	h1 {
		text-align: center;
	}

	.asetukset {
		display: grid;
		gap: 1rem;
		max-width: 400px;
		margin: 0 auto;
	}

	.nappi {
		text-align: center;
	}
</style>
