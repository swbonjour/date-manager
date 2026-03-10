<script lang="ts">
	import Input from '$lib/components/common/input.svelte';
	import { ProfileMenuItem } from '$lib/enums/enum';

	let isShowAnalytics = $state(false);
	let isGetNotices = $state(false);

	const toggleShowAnalytics = () => {
		isShowAnalytics = !isShowAnalytics;
	};

	const toggleGetNotices = () => {
		isGetNotices = !isGetNotices;
	};

	const oldPassword = $state('');
	const newPassword = $state('');
	const newPasswordConfirm = $state('');

	let { selectedMenuItem = $bindable() } = $props();

	const selectMenuItem = (menuItem: ProfileMenuItem) => {
		selectedMenuItem = menuItem;
	};
</script>

<div
	class="bg-primary flex h-full w-full flex-col items-start justify-start gap-10 overflow-y-auto p-10 md:h-full md:w-3/4 md:overflow-y-visible md:rounded-xl"
>
	<p class="text-neutral hidden text-xl font-bold md:block lg:text-2xl">Настройки</p>
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
	<div class="flex w-full flex-col items-center justify-between gap-8 md:flex-row md:gap-28">
		<div class="flex w-full flex-col gap-4 md:w-1/2">
			<p class="text-neutral text-lg font-bold md:block lg:text-xl">Конфиденциальность</p>
			<div
				class="border-secondary_contrast flex h-16 w-full items-center justify-between gap-10 border-b-2"
			>
				<p class="text-neutral text-lg md:block lg:text-xl">Показывать мою аналитику</p>
				<!-- svelte-ignore a11y_consider_explicit_label -->
				<button
					class="bg-accent relative flex h-6 w-12 cursor-pointer items-center rounded-full"
					onclick={toggleShowAnalytics}
				>
					<div
						class={[
							'bg-neutral absolute h-5 w-5 rounded-full transition-all',
							isShowAnalytics ? 'left-6' : 'left-1'
						]}
					></div>
				</button>
			</div>
		</div>
		<div class="flex w-full flex-col gap-4 md:w-1/2">
			<p class="text-neutral text-lg font-bold md:block lg:text-xl">Уведомления</p>
			<div
				class="border-secondary_contrast flex h-16 w-full items-center justify-between gap-10 border-b-2"
			>
				<p class="text-neutral text-lg md:block lg:text-xl">Получать уведомления о сообщениях</p>
				<!-- svelte-ignore a11y_consider_explicit_label -->
				<button
					class="bg-accent relative flex h-6 w-12 cursor-pointer items-center rounded-full"
					onclick={toggleGetNotices}
				>
					<div
						class={[
							'bg-neutral absolute h-5 w-5 rounded-full transition-all',
							isGetNotices ? 'left-6' : 'left-1'
						]}
					></div>
				</button>
			</div>
		</div>
	</div>
	<div class="flex w-full flex-col items-start justify-center gap-8 md:w-1/2">
		<p class="text-neutral text-lg font-bold md:block lg:text-xl">Пароль</p>
		<Input
			value={oldPassword}
			inputAttributes={{ placeholder: 'Текущий пароль' }}
			cssClass="pb-2"
		/>
		<Input value={newPassword} inputAttributes={{ placeholder: 'Новый пароль' }} cssClass="pb-2" />
		<div class="bg-secondary flex w-full flex-col items-start justify-center rounded-xl p-2">
			<p class="text-neutral text-lg md:block lg:text-xl">Пароль должен содержать:</p>
			<div class="flex items-center gap-2">
				<div class="border-secondary_contrast h-2 w-2 rounded-full border"></div>
				<p class="text-neutral text-sm md:block lg:text-lg">минимум 6 символов</p>
			</div>
			<div class="mt-2 flex items-center gap-2">
				<div class="border-secondary_contrast h-2 w-2 rounded-full border"></div>
				<p class="text-neutral text-sm md:block lg:text-lg">заглавные буквы</p>
			</div>
			<div class="flex items-center gap-2">
				<div class="border-secondary_contrast h-2 w-2 rounded-full border"></div>
				<p class="text-neutral text-sm md:block lg:text-lg">строчные буквы</p>
			</div>
			<div class="flex items-center gap-2">
				<div class="border-secondary_contrast h-2 w-2 rounded-full border"></div>
				<p class="text-neutral text-sm md:block lg:text-lg">цифру</p>
			</div>
			<div class="flex items-center gap-2">
				<div class="border-secondary_contrast h-2 w-2 rounded-full border"></div>
				<p class="text-neutral text-sm md:block lg:text-lg">спецсимвол – знаки пунктуации</p>
			</div>
		</div>
		<Input
			value={newPasswordConfirm}
			inputAttributes={{ placeholder: 'Повторите новый пароль' }}
			cssClass="pb-2"
		/>
	</div>
</div>
