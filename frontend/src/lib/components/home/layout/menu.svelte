<script lang="ts">
	import Todo from '$lib/icon/todo.svg?raw';
	import Dashboard from '$lib/icon/dashboard.svg?raw';
	import People from '$lib/icon/people.svg?raw';
	import Chat from '$lib/icon/chat.svg?raw';
	import Schedule from '$lib/icon/schedule.svg?raw';
	import Logo from '$lib/icon/logo.svg?raw';
	import { MenuItem } from '$lib/enums/enum';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Notice from '$lib/icon/notice.svg?raw';
	import Sun from '$lib/icon/sun.svg?raw';
	import { themeStore } from '$lib/stores/theme-store';
	import { userStore } from '$lib/stores/user-store';

	let selectedMenuItem = $state<MenuItem>(MenuItem.SCHEDULE);

	let isMenuOpen = $state(false);
	let touchStart = $state(0);
	let touchEnd = $state(0);
	const touchDiff = $derived(touchEnd - touchStart);

	let isProfileMenuOpen = $state(false);

	const selectMenuItem = (menuItem: MenuItem) => {
		selectedMenuItem = menuItem;
		goto(`/home/${menuItem}`);
	};

	const toggleMenu = () => {
		if (touchStart > 100) {
			return;
		}

		if (touchDiff < 50 && touchDiff > -50) {
			return;
		}

		if (touchDiff > 0 && !isMenuOpen) {
			isMenuOpen = !isMenuOpen;
		} else if (touchDiff < 0 && isMenuOpen) {
			isMenuOpen = !isMenuOpen;
			isProfileMenuOpen = false;
		}
	};

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

	onMount(() => {
		addEventListener('touchstart', (e) => {
			touchStart = e.touches[0].clientX;
		});

		addEventListener('touchend', (e) => {
			touchEnd = e.changedTouches[0].clientX;
			toggleMenu();
		});
	});
</script>

{#if isMenuOpen}
	<div class="absolute z-40 h-dvh w-screen bg-black opacity-80 transition-all md:hidden"></div>
{/if}
<div
	class={[
		'bg-primary absolute top-0 z-50 flex h-dvh min-w-20 flex-col items-center gap-8 transition-all md:static',
		isMenuOpen ? 'left-0' : '-left-20'
	]}
>
	<div class="fill-neutral mt-4">{@html Logo}</div>
	<div class="mt-4 flex flex-col gap-14 md:mt-12">
		<button
			class={[
				'hover:cursor-pointer',
				selectedMenuItem === MenuItem.SCHEDULE ? 'fill-accent' : 'fill-neutral'
			]}
			onclick={() => selectMenuItem(MenuItem.SCHEDULE)}
		>
			{@html Schedule}
		</button>
		<button
			class={[
				'hover:cursor-pointer',
				selectedMenuItem === MenuItem.TODO ? 'fill-accent' : 'fill-neutral'
			]}
			onclick={() => selectMenuItem(MenuItem.TODO)}
		>
			{@html Todo}
		</button>
		<button
			class={[
				'hover:cursor-pointer',
				selectedMenuItem === MenuItem.DASHBOARD ? 'fill-accent' : 'fill-neutral'
			]}
			onclick={() => selectMenuItem(MenuItem.DASHBOARD)}
		>
			{@html Dashboard}
		</button>
		<button
			class={[
				'hover:cursor-pointer',
				selectedMenuItem === MenuItem.PEOPLE ? 'fill-accent' : 'fill-neutral'
			]}
			onclick={() => selectMenuItem(MenuItem.PEOPLE)}
		>
			{@html People}
		</button>
		<button
			class={[
				'hover:cursor-pointer',
				selectedMenuItem === MenuItem.CHAT ? 'fill-accent' : 'fill-neutral'
			]}
			onclick={() => selectMenuItem(MenuItem.CHAT)}
		>
			{@html Chat}
		</button>
	</div>
	<div class="mt-auto mb-4 flex flex-col items-center gap-8 md:hidden">
		<button class="fill-neutral hover:cursor-pointer" onclick={toggleTheme}>{@html Sun}</button>
		<button class="fill-neutral hover:cursor-pointer">{@html Notice}</button>
		<div class="relative">
			{#if !$userStore.profileImg}
				<div class="bg-secondary h-12 w-12 rounded-4xl hover:cursor-pointer"></div>
			{:else}
				<button onclick={toggleProfileMenu}>
					<img class="h-12 w-12 rounded-4xl" src={$userStore.profileImg} alt="img" />
				</button>
			{/if}
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			{#if isProfileMenuOpen}
				<div
					class="bg-secondary border-accent absolute -top-5 left-18 z-30 flex w-40 flex-col items-center justify-center overflow-hidden rounded-xl border-2"
					onmouseleave={toggleProfileMenu}
				>
					<button
						class="text-neutral text-md hover:bg-accent border-accent w-full cursor-pointer border-b-2 p-1 transition-all duration-200"
						onclick={gotoUserProfile}>Профиль</button
					>
					<button
						class="text-neutral text-md hover:bg-accent w-full cursor-pointer p-1 transition-all duration-200"
						onclick={logout}>Выйти</button
					>
				</div>
			{/if}
		</div>
	</div>
</div>
