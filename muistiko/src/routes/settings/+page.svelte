<script lang="ts">
	import SettingSelector from '$lib/components/SettingSelector.svelte';
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';
	import { pelinTila, asetaTeema } from '$lib/gameSettings.svelte';
	import type { Teema } from '$lib/gameSettings.svelte';

	interface Asetusvalikko {
		teksti: string;
		placeholder: string;
		optiot: string[];
		type?: 'theme' | 'setting';
	}

	function käynnistäPeli() {
		goto('/game') // TÄÄ JAKEN KANSSA SELVITYKSEEN
			.then(() => {})
			.catch((err) => console.error(err));
	}

	function käsitteleTeemanVaihtaminen(event: Event) {
		const target = event.target as HTMLSelectElement;
		const valittu = target.value as Teema;
		asetaTeema(valittu);
	}

	const asetukset: Asetusvalikko[] = [
		{
			teksti: 'Teema',
			placeholder: 'Valitse teema',
			optiot: ['Kissat', 'Koirat', 'Opettajat', 'Tikologot'],
			type: 'theme'
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
	{#each asetukset as asetus (asetus.teksti)}
		{#if asetus.type === 'theme'}
			<div class="asetus-item">
				<label for="theme-select">{asetus.teksti}</label>
				<select value={pelinTila.teema} onchange={käsitteleTeemanVaihtaminen}>
					<option disabled value="">{asetus.placeholder}</option>
					{#each asetus.optiot as optio (optio)}
						<option value={optio.toLowerCase()}>{optio}</option>
					{/each}
				</select>
			</div>
		{:else}
			<SettingSelector
				teksti={asetus.teksti}
				placeholder={asetus.placeholder}
				optiot={asetus.optiot}
			/>
		{/if}
	{/each}
</div>

<div class="nappi">
	<Button
		text="Aloita peli!"
		onclick={() => {
			void goto('/game'); // TÄÄKI PITÄÄ KATTOO JAKEN KANSSA
		}}
	/>
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

	.asetus-item {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.asetus-item label {
		font-weight: bold;
	}

	.asetus-item select {
		padding: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 4px;
		font-size: 1rem;
	}

	.nappi {
		text-align: center;
	}
</style>
