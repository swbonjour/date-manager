<script lang="ts">
	import { ActivityTypeTranslation } from '$lib/enums/enum';
	import Edit from '$lib/icon/edit.svg?raw';
	import type { ActivityTypeEnum } from '$lib/utils/client';
	import { onMount } from 'svelte';

	let {
		time,
		type,
		label
	}: { time: { start: string; finish: string }; type: ActivityTypeEnum; label: string } = $props();

	let labelToDisplay = $state('');

	const trimLabel = () => {
		let trimLength = 20;
		if (window.innerWidth > 768 && window.innerWidth < 1024) {
			trimLength = 8;
		} else if (window.innerWidth >= 1280) {
			trimLength = 8;
		}
		if (label.length > trimLength) labelToDisplay = label.slice(0, trimLength) + '...';
	};

	onMount(() => {
		trimLabel();
		window.addEventListener('resize', () => {
			trimLabel();
		});
	});
</script>

<div class="flex h-14 items-center justify-between gap-8 lg:w-full">
	<div class="flex h-full flex-col items-center justify-between">
		<p class="text-md text-secondary_contrast">{time.start}</p>
		<div class="bg-secondary_contrast h-0.5 w-full"></div>
		<p class="text-md text-secondary_contrast">{time.finish}</p>
	</div>
	<div class="flex h-full w-full flex-col items-start justify-between">
		<div class="text-secondary bg-accent rounded-xl pt-0.5 pr-2 pb-0.5 pl-2 text-xs">
			{ActivityTypeTranslation[type]}
		</div>
		<p
			class="text-md text-neutral w-40 overflow-hidden font-semibold text-ellipsis xl:w-20 2xl:w-40"
		>
			{label}
		</p>
	</div>
	<button class="fill-accent hover:cursor-pointer">{@html Edit}</button>
</div>
