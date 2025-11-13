<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import Menu from '$lib/components/menu.svelte';

	let { children } = $props();
</script>

<svelte:head></svelte:head>

<div class="home">
	<Header></Header>
	<div class="home_inner">
		<Menu></Menu>
		{@render children?.()}
	</div>
</div>

<style>
	.home {
		width: 100wh;
		height: 100vh;

		display: flex;
		flex-direction: column;

		background-color: var(--color-primary);

		overflow: hidden;
	}

	.home_inner {
		width: 100%;
		height: 100%;

		display: flex;

		border-radius: 40px;
	}
</style>
