<script lang="ts">
	import Input from '$lib/components/common/input.svelte';
	import { ActivityTypeColors, ActivityTypeTranslation, ProfileMenuItem } from '$lib/enums/enum';
	import { userStore } from '$lib/stores/user-store';
	import { ActivityTypeEnum, type GetUserByIdResponse } from '$lib/utils/client';
	import EditIcon from '$lib/icon/edit.svg?raw';
	import ImageIcon from '$lib/icon/image.svg?raw';
	import TrashIcon from '$lib/icon/trash.svg?raw';
	import { onMount, tick } from 'svelte';
	import { client } from '$lib/utils';

	const activities = [
		ActivityTypeEnum.EDUCATION,
		ActivityTypeEnum.ENTERTAINMENT,
		ActivityTypeEnum.HOBBY
	];

	let isEditName = $state(true);
	let nameInput = $state<HTMLInputElement>();

	let isEditAge = $state(true);
	let ageInput = $state<HTMLInputElement>();

	let isEditEmail = $state(true);
	let emailInput = $state<HTMLInputElement>();

	let isEditDescription = $state(true);
	let descriptionInput = $state<HTMLTextAreaElement>();

	let description = $state('');

	let userData = $state<GetUserByIdResponse>({
		name: '',
		age: '',
		email: '',
		id: ''
	});

	const toggleEditName = async () => {
		isEditName = !isEditName;
		await tick();
		nameInput?.focus();
	};

	const toggleEditAge = async () => {
		isEditAge = !isEditAge;
		await tick();
		ageInput?.focus();
	};

	const toggleEditEmail = async () => {
		isEditEmail = !isEditEmail;
		await tick();
		emailInput?.focus();
	};

	const toggleEditDescription = async () => {
		isEditDescription = !isEditDescription;
		await tick();
		descriptionInput?.focus();
	};

	let { selectedMenuItem = $bindable() } = $props();

	const selectMenuItem = (menuItem: ProfileMenuItem) => {
		selectedMenuItem = menuItem;
	};

	onMount(() => {
		const unsubscribeUserStore = userStore.subscribe(async (u) => {
			if (!u.id) {
				return;
			}

			const user = await client.user.userControllerGetUserById({ id: u.id });

			if (user) {
				userData = user;
			}

			unsubscribeUserStore();
		});
	});
</script>

<div
	class="bg-primary flex h-full w-full flex-col items-start justify-start gap-10 overflow-y-auto p-10 md:h-full md:w-3/4 md:overflow-y-visible md:rounded-xl"
>
	<p class="text-neutral hidden text-xl font-bold md:block lg:text-2xl">Профиль</p>
	<div class="flex w-full items-center justify-between md:hidden">
		<button
			class={[
				' text-xl font-bold md:block lg:text-2xl',
				selectedMenuItem === ProfileMenuItem.PROFILE ? 'text-accent' : 'text-neutral'
			]}
			onclick={() => selectMenuItem(ProfileMenuItem.PROFILE)}
		>
			Профиль
		</button>
		<button
			class={[
				' text-xl font-bold md:block lg:text-2xl',
				selectedMenuItem === ProfileMenuItem.SETTINGS ? 'text-accent' : 'text-neutral'
			]}
			onclick={() => selectMenuItem(ProfileMenuItem.SETTINGS)}
		>
			Настройки
		</button>
		<p class="text-neutral text-xl font-bold md:block lg:text-2xl">Выйти</p>
	</div>
	<div class="flex items-center justify-between gap-6">
		{#if !$userStore.profileImg}
			<div class="bg-secondary flex h-40 w-40 items-center justify-center rounded-full"></div>
		{:else}
			<img src={$userStore.profileImg} alt="img" class="h-40 w-40 rounded-full object-cover" />
		{/if}
		<div class="flex flex-col items-start justify-center gap-4">
			<button
				class="border-accent text-accent bg-primary fill-accent stroke-accent flex cursor-pointer items-center gap-2 rounded-xl border-2 p-2 font-bold lg:text-lg"
				>{@html ImageIcon} Изменить</button
			>
			<button
				class="border-accent text-accent bg-primary fill-accent flex cursor-pointer items-center gap-2 rounded-xl border-2 p-2 font-bold lg:text-lg"
				>{@html TrashIcon} Удалить</button
			>
		</div>
	</div>
	<div
		class="flex w-full flex-col items-start justify-between gap-8 md:flex-row md:gap-0 md:overflow-y-auto xl:w-5/6"
	>
		<div class="flex w-full flex-col items-center justify-start gap-8 md:w-1/4">
			<div class="flex w-full flex-col items-start justify-center gap-4 text-lg font-semibold">
				<p class="text-neutral text-lg font-bold lg:text-xl">Имя</p>
				<div class="flex w-full items-center gap-4">
					<Input
						value={userData.name}
						inputAttributes={{ placeholder: '', disabled: isEditName }}
						bind:inputElement={nameInput}
						cssClass="pb-2"
					/>
					<button class="fill-accent cursor-pointer" onclick={toggleEditName}
						>{@html EditIcon}</button
					>
				</div>
			</div>

			<div class="flex w-full flex-col items-start justify-center gap-4 text-lg font-semibold">
				<p class="text-neutral text-lg font-bold lg:text-xl">Дата рождения</p>
				<div class="flex w-full items-center gap-4">
					<Input
						value={userData.age}
						inputAttributes={{ placeholder: '', disabled: isEditAge, type: 'date' }}
						bind:inputElement={ageInput}
						cssClass="pb-2"
					/>
					<button class="fill-accent cursor-pointer" onclick={toggleEditAge}
						>{@html EditIcon}</button
					>
				</div>
			</div>

			<div class="flex w-full flex-col items-start justify-center gap-4 text-lg font-semibold">
				<p class="text-neutral text-lg font-bold lg:text-xl">Почта</p>
				<div class="flex w-full items-center gap-4">
					<Input
						value={userData.email}
						inputAttributes={{ placeholder: '', disabled: isEditEmail }}
						bind:inputElement={emailInput}
						cssClass="pb-2"
					/>
					<button class="fill-accent cursor-pointer" onclick={toggleEditEmail}
						>{@html EditIcon}</button
					>
				</div>
			</div>
		</div>
		<div class="flex w-full flex-col items-center justify-center gap-8 md:w-2/4">
			<div class="flex w-full flex-col items-start justify-center gap-4 text-lg font-semibold">
				<p class="text-neutral text-lg font-bold lg:text-xl">Обо мне</p>
				<div class="flex w-full items-center gap-4">
					<textarea
						class="bg-primary border-secondary text-neutral text-md h-full w-full resize-none overflow-hidden rounded-xl border-2 p-2 outline-0"
						maxlength="255"
						rows="4"
						bind:value={description}
						disabled={isEditDescription}
						bind:this={descriptionInput}
					></textarea>
					<button class="fill-accent cursor-pointer" onclick={toggleEditDescription}
						>{@html EditIcon}</button
					>
				</div>
			</div>
			<div class="flex items-center justify-center gap-6 self-start">
				<p class="text-neutral text-lg font-bold lg:text-xl">Статус</p>
				<div class="bg-accent text-neutral rounded-xl p-2 text-lg font-bold lg:text-xl">
					Подтвержден
				</div>
			</div>
		</div>
	</div>
</div>
