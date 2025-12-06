<script lang="ts">
	import Notice from '$lib/icon/notice.svg?raw';
	import Sun from '$lib/icon/sun.svg?raw';
	import { themeStore } from '$lib/stores/theme-store';

	const toggleTheme = () => {
		$themeStore.toggle();
	};
</script>

<div class="bg-primary hidden h-20 w-full items-center justify-end gap-8 pr-8 md:flex">
	<button class="fill-neutral hover:cursor-pointer" onclick={toggleTheme}>{@html Sun}</button>
	<button class="fill-neutral hover:cursor-pointer">{@html Notice}</button>
	<div class="text-neutral flex flex-col">
		<p>Name</p>
		<p>Surname</p>
	</div>
	<div class="bg-secondary h-12 w-12 rounded-4xl"></div>
</div>
