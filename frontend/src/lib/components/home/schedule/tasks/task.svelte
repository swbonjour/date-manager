<script lang="ts">
	import { ActivityTypeColors, ActivityTypeTranslation } from '$lib/enums/enum';
	import Edit from '$lib/icon/edit.svg?raw';
	import { scheduleStore } from '$lib/stores/schedule-store';
	import type { ActivityTypeEnum, TaskDto } from '$lib/utils/client';
	import { DateTime } from 'luxon';
	import { onMount } from 'svelte';

	let { task }: { task: TaskDto } = $props();

	let labelToDisplay = $state('');

	const trimLabel = () => {
		let trimLength = 20;
		if (window.innerWidth > 768 && window.innerWidth < 1024) {
			trimLength = 8;
		} else if (window.innerWidth >= 1280) {
			trimLength = 8;
		}
		if (task.label.length > trimLength) labelToDisplay = task.label.slice(0, trimLength) + '...';
	};

	const toggleEdit = () => {
		scheduleStore.update((s) => ({
			...s,
			isTasksModalOpen: !$scheduleStore.isTasksModalOpen,
			selectedTask: task
		}));
	};

	const hoverTask = (taskId: string) => {
		scheduleStore.update((s) => ({
			...s,
			hoveredTask: taskId
		}));
	};

	const unhoverTask = () => {
		scheduleStore.update((s) => ({
			...s,
			hoveredTask: undefined
		}));
	};

	onMount(() => {
		trimLabel();
		window.addEventListener('resize', () => {
			trimLabel();
		});
	});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_mouse_events_have_key_events -->
<div
	class={[
		'flex h-14 items-center justify-between gap-8 transition-all duration-75 lg:w-full',
		task._id === $scheduleStore.hoveredTask ? 'border-secondary_contrast border-b-2' : ''
	]}
	onmouseover={() => hoverTask(task._id)}
	onmouseleave={() => unhoverTask()}
>
	<div class="flex h-full flex-col items-center justify-between">
		<p class="text-md text-secondary_contrast">{DateTime.fromISO(task.start).toFormat('HH:mm')}</p>
		<div class="bg-secondary_contrast h-0.5 w-full"></div>
		<p class="text-md text-secondary_contrast">{DateTime.fromISO(task.finish).toFormat('HH:mm')}</p>
	</div>
	<div class="flex h-full w-full flex-col items-start justify-between">
		<div
			class="text-secondary rounded-xl pt-0.5 pr-2 pb-0.5 pl-2 text-xs"
			style="background-color: {ActivityTypeColors[task.type]};"
		>
			{ActivityTypeTranslation[task.type]}
		</div>
		<p
			class="text-md text-neutral w-40 overflow-hidden font-semibold text-ellipsis xl:w-20 2xl:w-40"
		>
			{task.label}
		</p>
	</div>
	<button class="fill-accent hover:cursor-pointer" onclick={toggleEdit}>{@html Edit}</button>
</div>
