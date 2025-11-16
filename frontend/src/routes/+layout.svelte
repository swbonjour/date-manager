<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/button.svelte';
	import { themeStore } from '$lib/stores/theme-store';
	import { onMount } from 'svelte';
	import { client } from '$lib/utils';
	import { userStore } from '$lib/stores/user-store';
	import dayjs from 'dayjs';
	import '$lib/utils/dayjs-locales/ru';

	dayjs.locale('ru');

	let { children } = $props();

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
		await isAuthenticated();
	});
</script>

<svelte:head></svelte:head>

<div style="position: absolute; right: 2rem; bottom: 2rem;">
	<Button label="Switch colors" onclick={$themeStore.toggle} size="m"></Button>
</div>

{@render children?.()}
