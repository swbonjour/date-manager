<script lang="ts">
	import { goto } from '$app/navigation';
	import { apiRequest } from '$lib/assets/api';
	import Button from '$lib/components/button.svelte';
	import { themeStore } from '$lib/stores/theme-store';
	import { onMount } from 'svelte';

	let { children } = $props();

	const isAuthenticated = async () => {
		await apiRequest('get', 'auth/who-am-i')
			.then((res) => {
				goto('/chat');
			})
			.catch((err) => {
				goto('/');
			});
	};

	onMount(async () => {
		$themeStore.init();
		await isAuthenticated();
	});
</script>

<svelte:head></svelte:head>

<div style="position: absolute; right: 2rem; bottom: 2rem;">
	<Button label="Switch colors" onclick={$themeStore.toggle} size="m"></Button>
</div>

{@render children?.()}
