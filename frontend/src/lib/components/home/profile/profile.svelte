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
	import imageCompression from 'browser-image-compression';
	import { getFileSize } from '$lib/utils/helper';

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

	let inputFileElement: HTMLInputElement | undefined = $state();
	let imgFile = $state<File>();

	const handleInputImgChange = async (e: Event) => {
		const target = e.target as HTMLInputElement;

		if (!target || !target.files?.length) {
			return;
		}

		const file = target.files[0];

		const fileSize = getFileSize(file);

		if (fileSize > 10) {
			return;
		}

		const reader = new FileReader();
		reader.onload = (r) => {
			if (r.target) {
				$userStore.profileImg = r.target.result as string;
			}
		};
		reader.readAsDataURL(file);

		const compressedFile = await imageCompression(file, {
			maxSizeMB: 1,
			maxWidthOrHeight: 300,
			useWebWorker: true,
			maxIteration: 10,
			initialQuality: 0.8
		});

		imgFile = compressedFile;

		//@ts-ignore
		await client.user.userControllerUpdateUserImg({ id: $userStore.id, file: imgFile });
	};

	const triggerInputFile = () => {
		if (inputFileElement) {
			inputFileElement.click();
		}
	};

	onMount(() => {
		const unsubscribeUserStore = userStore.subscribe(async (u) => {
			if (!u.id) {
				return;
			}

			userData = {
				email: u.email,
				id: u.id,
				name: u.name,
				age: u.age
			};

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
	<div class="flex w-full items-center justify-center md:justify-between">
		<input
			type="file"
			bind:this={inputFileElement}
			class="hidden"
			onchange={(e) => handleInputImgChange(e)}
			accept="image/png, image/jpeg"
		/>
		{#if $userStore.profileImg}
			<button
				class="bg-secondary img-shadow relative h-60 w-60 cursor-pointer overflow-hidden rounded-full"
				onclick={triggerInputFile}
			>
				<img
					src={$userStore.profileImg}
					alt="preview"
					class="h-60 w-60 rounded-full object-cover"
					style="box-shadow: 76px 4px 8px 0px rgba(34, 60, 80, 0.2) inset"
				/>
			</button>
		{:else}
			<!-- svelte-ignore a11y_consider_explicit_label -->
			<button
				class="bg-secondary img-shadow_select relative h-60 w-60 cursor-pointer overflow-hidden rounded-full transition-all duration-200"
				onclick={triggerInputFile}
			>
				<div class="bg-neutral absolute top-14 left-20 h-20 w-20 rounded-full"></div>
				<div class="bg-neutral absolute -bottom-2 left-15 h-25 w-30 rounded-full"></div>
			</button>
		{/if}
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
