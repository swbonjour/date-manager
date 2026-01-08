<script lang="ts">
	import { ActivityTypeColors } from '$lib/enums/enum';
	import type { ActivityTypeEnum, TaskDto } from '$lib/utils/client';
	import { DateTime } from 'luxon';

	let { row, tasks }: { row: number; tasks: TaskDto[] | undefined } = $props();

	let parsedTasks = $state<
		{ taskStartPadding: number; taskPercentInHour: number; type: ActivityTypeEnum }[]
	>([]);

	const parseTasksByHour = () => {
		if (!tasks) {
			return [];
		}

		const res: { taskStartPadding: number; taskPercentInHour: number; type: ActivityTypeEnum }[] =
			[];
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
				type: task.type
			});
		}
		return res;
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
			<div
				class="absolute top-0 h-full w-2 rounded-md bg-red-500"
				style="left: {task.taskStartPadding}%; width: {task.taskPercentInHour}%; background-color: {ActivityTypeColors[
					task.type
				]}"
			></div>
		{/each}
	</div>
</div>
