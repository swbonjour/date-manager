<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/button.svelte';
	import { themeStore } from '$lib/stores/theme-store';
	import { onMount } from 'svelte';
	import { client } from '$lib/utils';
	import { userStore } from '$lib/stores/user-store';
	import { Settings } from 'luxon';
	let { children } = $props();

	Settings.defaultLocale = 'ru';

	const isAuthenticated = async () => {
		await client.auth
			.authControllerWhoAmI()
			.then(() => {
				goto('/home');
			})
			.catch(() => {
				goto('/auth');
			});
	};

	onMount(async () => {
		$themeStore.init();
		$userStore.init();
		Settings.defaultZone = $userStore.timezone;
		await isAuthenticated();
	});
</script>

<svelte:head></svelte:head>

<div style="position: absolute; right: 4rem; bottom: 4rem; color: var(--color-neutral)">
	<Button label="Switch colors" onclick={$themeStore.toggle} size="m"></Button>
</div>

{@render children?.()}
