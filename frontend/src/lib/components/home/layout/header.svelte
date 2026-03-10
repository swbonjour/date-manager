<script lang="ts">
	import { goto } from '$app/navigation';
	import Notice from '$lib/icon/notice.svg?raw';
	import Sun from '$lib/icon/sun.svg?raw';
	import { themeStore } from '$lib/stores/theme-store';
	import { userStore } from '$lib/stores/user-store';

	let isProfileMenuOpen = $state(false);

	const toggleTheme = () => {
		$themeStore.toggle();
	};

	const toggleProfileMenu = () => {
		isProfileMenuOpen = !isProfileMenuOpen;
	};

	const gotoUserProfile = () => {
		goto('/home/user');
	};

	const logout = () => {
		localStorage.removeItem('auth-token');
		goto('/auth');
	};
</script>

<div class="bg-primary hidden h-20 w-full items-center justify-end gap-8 pr-8 md:flex">
	<button class="fill-neutral hover:cursor-pointer" onclick={toggleTheme}>{@html Sun}</button>
	<button class="fill-neutral hover:cursor-pointer">{@html Notice}</button>
	<div class="text-neutral flex flex-col font-semibold">
		<p>{$userStore.name.length > 12 ? $userStore.name.slice(0, 12) : $userStore.name}</p>
	</div>
	{#if !$userStore.profileImg}
		<div class="bg-secondary h-12 w-12 rounded-4xl"></div>
	{:else}
		<div class="relative">
			<button
				class="shadow-neutral cursor-pointer rounded-full transition-all duration-200 hover:shadow-md"
				onclick={toggleProfileMenu}
			>
				<img class="h-12 w-12 rounded-4xl" src={$userStore.profileImg} alt="img" />
			</button>
			{#if isProfileMenuOpen}
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="bg-secondary border-accent absolute right-0 -bottom-18 z-30 flex w-40 flex-col items-center justify-center overflow-hidden rounded-xl border-2"
					onmouseleave={toggleProfileMenu}
				>
					<button
						class="text-neutral text-md hover:bg-accent w-full cursor-pointer p-1 transition-all duration-200"
						onclick={gotoUserProfile}>Профиль</button
					>
					<button
						class="text-neutral text-md hover:bg-accent w-full cursor-pointer p-1 transition-all duration-200"
						onclick={logout}>Выйти</button
					>
				</div>
			{/if}
		</div>
	{/if}
</div>
