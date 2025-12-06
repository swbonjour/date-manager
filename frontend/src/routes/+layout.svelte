<script lang="ts">
	import { goto } from '$app/navigation';
	import { themeStore } from '$lib/stores/theme-store';
	import { onMount } from 'svelte';
	import { client } from '$lib/utils';
	import { userStore } from '$lib/stores/user-store';
	import { Settings } from 'luxon';
	let { children } = $props();
	import '../app.css';
	import { page } from '$app/state';

	const isAuthenticated = async () => {
		await client.auth
			.authControllerWhoAmI()
			.then(() => {
				if (page.url.href.includes('/auth')) {
					goto('/home/schedule');
				}
			})
			.catch(() => {
				if (!page.url.href.includes('/auth')) {
					goto('/auth');
				}
			});
	};

	onMount(async () => {
		$themeStore.init();
		$userStore.init();
		Settings.defaultLocale = 'ru';
		Settings.defaultZone = $userStore.timezone;
		await isAuthenticated();
	});
</script>

<svelte:head></svelte:head>
<!-- 
<div style="position: absolute; right: 4rem; bottom: 4rem; color: var(--color-neutral)">
	<Button label="Switch colors" onclick={$themeStore.toggle} size="m"></Button>
</div> -->

{@render children?.()}
