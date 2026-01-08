<script lang="ts">
	import { ActivityTypeColors } from '$lib/enums/enum';
	import { scheduleStore } from '$lib/stores/schedule-store';
	import type { ActivityTypeEnum, TaskDto } from '$lib/utils/client';
	import { DateTime } from 'luxon';

	let { row, tasks }: { row: number; tasks: TaskDto[] | undefined } = $props();

	let parsedTasks = $state<
		{ taskStartPadding: number; taskPercentInHour: number; type: ActivityTypeEnum; _id: string }[]
	>([]);

	const parseTasksByHour = () => {
		if (!tasks) {
			return [];
		}

		const res: {
			taskStartPadding: number;
			taskPercentInHour: number;
			type: ActivityTypeEnum;
			_id: string;
		}[] = [];
		const minutesInHour = 60;

		for (const task of tasks) {
			const taskTimeStart = DateTime.fromISO(task.start);
			const taskTimeFinish = DateTime.fromISO(task.finish);

			let taskPercentInHour = 0;
			let taskStartPadding = 0;

			if (taskTimeStart.hour === row && taskTimeFinish.hour === row) {
				taskPercentInHour = Math.round(
					(taskTimeFinish.diff(taskTimeStart, 'minute').minutes / minutesInHour) * 100
				);
				taskStartPadding = Math.round(
					(taskTimeStart.diff(DateTime.fromISO(task.start).startOf('hour'), 'minute').minutes /
						minutesInHour) *
						100
				);
			} else if (taskTimeStart.hour === row && taskTimeFinish.hour !== row) {
				taskPercentInHour = Math.round(
					(DateTime.fromISO(task.start).endOf('hour').diff(taskTimeStart, 'minute').minutes /
						minutesInHour) *
						100
				);
				taskStartPadding = Math.round(
					(taskTimeStart.diff(DateTime.fromISO(task.start).startOf('hour'), 'minute').minutes /
						minutesInHour) *
						100
				);
			} else if (taskTimeStart.hour !== row && taskTimeFinish.hour !== row) {
				taskPercentInHour = 100;
				taskStartPadding = 0;
			} else if (taskTimeStart.hour !== row && taskTimeFinish.hour === row) {
				taskPercentInHour = Math.round(
					(taskTimeFinish.diff(DateTime.fromISO(task.finish).startOf('hour'), 'minute').minutes /
						minutesInHour) *
						100
				);
				taskStartPadding = 0;
			}
			res.push({
				taskPercentInHour: taskPercentInHour,
				taskStartPadding: taskStartPadding,
				type: task.type,
				_id: task._id
			});
		}
		return res;
	};

	const toggleEdit = (taskId: string) => {
		const task = $scheduleStore.tasks.find((item) => item._id === taskId);

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

	$effect(() => {
		tasks;
		parsedTasks = parseTasksByHour();
	});
</script>

<div class="flex items-center justify-center gap-4">
	<p class="text-neutral w-20 text-lg font-semibold">{`${row}:00`}</p>
	<div class="bg-secondary relative mr-2 h-8 w-full rounded-md md:mr-8">
		{#each parsedTasks as task}
			<!-- svelte-ignore a11y_mouse_events_have_key_events -->
			<button
				class={[
					'shadow-neutral absolute top-0 h-full w-2 cursor-pointer rounded-md transition-all duration-75',
					task._id === $scheduleStore.hoveredTask ? 'shadow-md' : ''
				]}
				style="left: {task.taskStartPadding}%; width: {task.taskPercentInHour}%; background-color: {ActivityTypeColors[
					task.type
				]}"
				onclick={() => toggleEdit(task._id)}
				onmouseover={() => hoverTask(task._id)}
				onmouseleave={() => unhoverTask()}
				aria-label="row"
			></button>
		{/each}
	</div>
</div>
