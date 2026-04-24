<script lang="ts">
	import './layout.css';
	import muistikoLogo from '$lib/assets/muistikoLogo.svg';

	let { children } = $props();
	import Header from '$lib/components/Header.svelte';
</script>

<svelte:head><link rel="icon" href={muistikoLogo} /></svelte:head>

<Header pelinLogo="/data/opettajat/kromattu_heikki.png" />
<main>
	{@render children()}
</main>
