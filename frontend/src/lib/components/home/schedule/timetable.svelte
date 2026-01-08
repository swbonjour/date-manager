<script lang="ts">
	import { scheduleStore } from '$lib/stores/schedule-store';
	import RightArrow from '$lib/icon/right-arrow.svg?raw';
	import LeftArrow from '$lib/icon/left-arrow.svg?raw';
	import Calendar from '$lib/components/common/calendar.svelte';
	import Todo from '$lib/icon/todo.svg?raw';
	import { onMount } from 'svelte';
	import { client } from '$lib/utils';
	import { userStore } from '$lib/stores/user-store';
	import TimetableRow from './timetable-row.svelte';
	import type { TaskDto } from '$lib/utils/client';
	import { DateTime } from 'luxon';
	import Dashboard from '$lib/icon/dashboard.svg?raw';

	const scrollDate = (side: 'left' | 'right') => {
		scheduleStore.update((s) => ({
			...s,
			date: side === 'right' ? s.date.plus({ day: 1 }) : s.date.minus({ day: 1 })
		}));
	};

	const toggleTasks = () => {
		scheduleStore.update((s) => ({
			...s,
			isTasksOpen: !$scheduleStore.isTasksOpen
		}));
	};

	const toggleDashboard = () => {
		scheduleStore.update((s) => ({
			...s,
			isDashboardOpen: !$scheduleStore.isDashboardOpen
		}));
	};

	let tasksMap = $derived(() => {
		const resMap: Map<number, TaskDto[]> = new Map();
		for (let i = 0; i < 24; i++) {
			for (const task of $scheduleStore.tasks) {
				const taskTimeStart = DateTime.fromISO(task.start).hour;
				const taskTimeFinish = DateTime.fromISO(task.finish).hour;

				if (
					taskTimeStart === i ||
					(taskTimeStart < i && taskTimeFinish > i) ||
					taskTimeFinish === i
				) {
					const existingTask = resMap.get(i);
					if (!existingTask) {
						resMap.set(i, [task]);
					} else {
						resMap.set(i, [...existingTask, task]);
					}
				}
			}
		}
		return resMap;
	});

	let currentDate = $state($scheduleStore.date);
	let isTasksLoaded = $state(false);

	$effect(() => {
		$scheduleStore.date;
		if (!$userStore.id) {
			return;
		}
		if (currentDate !== $scheduleStore.date || !isTasksLoaded) {
			client.task
				.taskControllerGetTasksByDate({
					date: $scheduleStore.date.toISODate()
				})
				.then((res) => {
					scheduleStore.update((s) => ({
						...s,
						tasks: res
					}));
				});
			isTasksLoaded = true;
			currentDate = $scheduleStore.date;
		}
	});
</script>

<div class="flex h-full w-full flex-col gap-4 md:w-1/2 md:gap-4">
	<div
		class="bg-primary flex min-h-14 w-full items-center justify-center rounded-br-xl rounded-bl-xl md:justify-between md:rounded-xl md:pl-8"
	>
		<div class="text-neutral flex w-fit items-center justify-between gap-4">
			<button
				class="fill-neutral absolute left-8 hover:cursor-pointer md:hidden"
				onclick={toggleDashboard}>{@html Dashboard}</button
			>
			<button class="fill-accent hover:cursor-pointer" onclick={() => scrollDate('left')}
				>{@html LeftArrow}</button
			>
			<div class="flex w-48 items-center justify-center gap-4">
				<p class="text-lg font-semibold">{$scheduleStore.date.toFormat('dd MMMM yyyy')}</p>
				<Calendar bind:dateToUpdate={$scheduleStore.date} />
			</div>
			<button class="fill-accent hover:cursor-pointer" onclick={() => scrollDate('right')}
				>{@html RightArrow}</button
			>
			<button
				class="fill-neutral absolute right-8 hover:cursor-pointer md:hidden"
				onclick={toggleTasks}>{@html Todo}</button
			>
		</div>
	</div>
	<div
		class="bg-primary min-h-0 w-full flex-1 flex-col rounded-tl-xl rounded-tr-xl p-8 md:rounded-xl"
	>
		<div class="flex h-16 w-full items-center justify-between gap-4">
			<div class="relative flex w-20 text-sm">
				<p class="text-secondary_contrast absolute top-0 xl:left-0">час</p>
				<div class="bg-secondary_contrast absolute h-0.5 w-12 rotate-30"></div>
				<p class="text-secondary_contrast absolute -top-5 right-2 md:right-0 lg:right-2 xl:right-4">
					мин
				</p>
			</div>
			<div class="mr-2 flex w-full items-center justify-between text-lg md:mr-12">
				<p class="text-secondary_contrast font-semibold">0</p>
				<div class="bg-secondary_contrast h-1.5 w-1.5 rounded-full md:h-2 md:w-2"></div>
				<p class="text-secondary_contrast font-semibold">10</p>
				<div class="bg-secondary_contrast h-1.5 w-1.5 rounded-full md:h-2 md:w-2"></div>
				<p class="text-secondary_contrast font-semibold">20</p>
				<div class="bg-secondary_contrast h-1.5 w-1.5 rounded-full md:h-2 md:w-2"></div>
				<p class="text-secondary_contrast font-semibold">30</p>
				<div class="bg-secondary_contrast h-1.5 w-1.5 rounded-full md:h-2 md:w-2"></div>
				<p class="text-secondary_contrast font-semibold">40</p>
				<div class="bg-secondary_contrast h-1.5 w-1.5 rounded-full md:h-2 md:w-2"></div>
				<p class="text-secondary_contrast font-semibold">50</p>
				<div class="bg-secondary_contrast h-1.5 w-1.5 rounded-full md:h-2 md:w-2"></div>
				<p class="text-secondary_contrast font-semibold">60</p>
			</div>
		</div>
		<div class="scrollbar h-7/8 w-full overflow-y-scroll">
			<div class="flex flex-col gap-6">
				{#each { length: 24 }, row}
					<TimetableRow {row} tasks={tasksMap().get(row)}></TimetableRow>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.scrollbar::-webkit-scrollbar {
		width: 1rem;
	}

	.scrollbar::-webkit-scrollbar-track {
		border-radius: 100vh;
		background: var(--color-secondary);
	}

	.scrollbar::-webkit-scrollbar-thumb {
		background: var(--color-neutral);
		border-radius: 20px;
	}

	@media (width < 48rem) {
		.scrollbar::-webkit-scrollbar {
			width: 0.2rem;
		}

		.scrollbar::-webkit-scrollbar-track {
			border-radius: 100vh;
			background: var(--color-secondary);
		}

		.scrollbar::-webkit-scrollbar-thumb {
			background: var(--color-neutral);
			border-radius: 20px;
		}
	}
</style>
