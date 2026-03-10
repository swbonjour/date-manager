<script lang="ts">
	import { ProfileMenuItem } from '$lib/enums/enum';
	import ProfileIcon from '$lib/icon/profile.svg?raw';
	import SettingIcon from '$lib/icon/setting.svg?raw';
	import RedoIcon from '$lib/icon/redo.svg?raw';

	let { selectedMenuItem = $bindable() } = $props();

	const selectMenuItem = (menuItem: ProfileMenuItem) => {
		selectedMenuItem = menuItem;
	};
</script>

<div
	class="bg-primary hidden h-full w-1/4 flex-col items-center justify-start gap-8 rounded-xl p-10 md:flex"
>
	<div class="border-secondary_contrast w-full border-b-2">
		<button
			class={[
				'stroke-accent flex cursor-pointer gap-4 pb-4 font-semibold lg:text-lg',
				selectedMenuItem === ProfileMenuItem.PROFILE ? 'text-accent' : 'text-neutral'
			]}
			onclick={() => selectMenuItem(ProfileMenuItem.PROFILE)}
		>
			{@html ProfileIcon} Профиль
		</button>
	</div>
	<div class="border-secondary_contrast w-full border-b-2">
		<button
			class={[
				'stroke-accent flex cursor-pointer gap-4 pb-4 font-semibold lg:text-lg',
				selectedMenuItem === ProfileMenuItem.SETTINGS ? 'text-accent' : 'text-neutral'
			]}
			onclick={() => selectMenuItem(ProfileMenuItem.SETTINGS)}
		>
			{@html SettingIcon} Настройки
		</button>
	</div>
	<div class="border-secondary_contrast w-full border-b-2">
		<button
			class="text-neutral stroke-accent flex cursor-pointer gap-4 pb-4 font-semibold lg:text-lg"
		>
			{@html RedoIcon} Выйти
		</button>
	</div>
</div>
