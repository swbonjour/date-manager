<script lang="ts">
	import Menu from '$lib/components/home/profile/menu.svelte';
	import Profile from '$lib/components/home/profile/profile.svelte';
	import Setting from '$lib/components/home/profile/setting.svelte';
	import { ProfileMenuItem } from '$lib/enums/enum';

	let selectedOption = $state<ProfileMenuItem>(ProfileMenuItem.PROFILE);
</script>

<div class="flex h-full w-full items-center justify-center gap-8 md:p-8">
	<Menu bind:selectedMenuItem={selectedOption} />
	{#if selectedOption === ProfileMenuItem.PROFILE}
		<Profile bind:selectedMenuItem={selectedOption} />
	{:else}
		<Setting bind:selectedMenuItem={selectedOption} />
	{/if}
</div>
