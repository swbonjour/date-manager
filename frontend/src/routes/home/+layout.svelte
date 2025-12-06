<script lang="ts">
	import Header from '$lib/components/home/layout/header.svelte';
	import Menu from '$lib/components/home/layout/menu.svelte';

	let { children } = $props();
</script>

<svelte:head></svelte:head>

<div class="bg-secondary flex h-screen max-h-screen w-screen">
	<Menu />
	<div class="bg-primary flex h-full w-full flex-col">
		<Header />
		<div class="bg-secondary flex flex-1 overflow-hidden md:rounded-tl-4xl">
			{@render children?.()}
		</div>
	</div>
</div>
