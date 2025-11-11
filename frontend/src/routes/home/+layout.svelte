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
		display: flex;
		flex-direction: column;
		height: 100vh;
		background-color: var(--color-secondary);
	}

	.home_inner {
		display: flex;
		height: 100%;
	}
</style>
