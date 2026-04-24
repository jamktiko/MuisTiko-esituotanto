<script lang="ts">
	interface Props {
		pelinLogo: string;
	}

	let { pelinLogo }: Props = $props();
</script>

<header>
	{#if pelinLogo}
		<img src={pelinLogo} alt="" height="75%" />
	{/if}
</header>

<style>
	header {
		padding: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #aaa;
		height: 150px;
	}

	img {
		max-height: 100%;
		max-width: 100%;
		object-fit: contain;
	}
</style>
