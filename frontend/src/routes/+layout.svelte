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
	import { scheduleStore } from '$lib/stores/schedule-store';

	const isAuthenticated = async () => {
		await client.auth
			.authControllerWhoAmI()
			.then(() => {
				if (page.url.href.includes('/auth')) {
					goto('/home/schedule');
				}
			})
			.catch(() => {
				goto('/auth');
			});
	};

	onMount(async () => {
		$themeStore.init();
		$userStore.init();
		Settings.defaultLocale = 'ru';
		Settings.defaultZone = $userStore.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
		await isAuthenticated().then(async () => {
			$scheduleStore.init();
			window.addEventListener('resize', () => {
				const isItemsOpen = window.innerWidth > 768;

				scheduleStore.update((s) => ({
					...s,
					isTasksOpen: isItemsOpen,
					isDashboardOpen: isItemsOpen
				}));
			});
			if ($userStore.id) {
				await $userStore.getProfileImg();
			}
		});
	});
</script>

<svelte:head></svelte:head>
<!-- 
<div style="position: absolute; right: 4rem; bottom: 4rem; color: var(--color-neutral)">
	<Button label="Switch colors" onclick={$themeStore.toggle} size="m"></Button>
</div> -->

{@render children?.()}
