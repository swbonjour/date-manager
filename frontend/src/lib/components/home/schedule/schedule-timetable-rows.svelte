<script lang="ts">
	import { scheduleStore } from '$lib/stores/schedule-store';
	import { client } from '$lib/utils';
	import { onMount } from 'svelte';
	import ScheduleTimetableRow from './schedule-timetable-row.svelte';
	import type { TaskDto } from '$lib/utils/client';
	import { DateTime } from 'luxon';
	import { userStore } from '$lib/stores/user-store';
	import { taskStore } from '$lib/stores/task-store';

	const rows = $state([
		{ time: '0:00' },
		{ time: '1:00' },
		{ time: '2:00' },
		{ time: '3:00' },
		{ time: '4:00' },
		{ time: '5:00' },
		{ time: '6:00' },
		{ time: '7:00' },
		{ time: '8:00' },
		{ time: '9:00' },
		{ time: '10:00' },
		{ time: '11:00' },
		{ time: '12:00' },
		{ time: '13:00' },
		{ time: '14:00' },
		{ time: '15:00' },
		{ time: '16:00' },
		{ time: '17:00' },
		{ time: '18:00' },
		{ time: '19:00' },
		{ time: '20:00' },
		{ time: '21:00' },
		{ time: '22:00' },
		{ time: '23:00' }
	]);

	let rowsDataByHours = $state<Map<string, TaskDto[]>>(new Map());

	onMount(async () => {
		const unsubscribeUserStore = userStore.subscribe(async (user) => {
			if (user.id) {
				await $taskStore.init($scheduleStore.date.toISO());

				unsubscribeUserStore();
			}
		});
	});

	taskStore.subscribe(async (t) => {
		const newRowsDataByHours: Map<string, TaskDto[]> = new Map();

		for (const rowData of t.tasks) {
			const rowDataStartHour = DateTime.fromISO(rowData.start).hour;
			const rowDataFinishHour = DateTime.fromISO(rowData.finish).hour;

			let rowDataHoursDiff = Math.ceil(
				DateTime.fromISO(rowData.finish).diff(DateTime.fromISO(rowData.start), 'hours').hours
			);

			if (
				DateTime.fromISO(rowData.start).hour !== DateTime.fromISO(rowData.finish).hour &&
				rowDataHoursDiff === 1
			) {
				rowDataHoursDiff++;
			}

			for (let hour = rowDataStartHour; hour < rowDataStartHour + rowDataHoursDiff; hour++) {
				const existingRowsData = newRowsDataByHours.get(String(hour));

				if (!existingRowsData) {
					newRowsDataByHours.set(String(hour), [rowData]);
				} else {
					newRowsDataByHours.set(String(hour), [...existingRowsData, rowData]);
				}
			}
		}

		rowsDataByHours = newRowsDataByHours;
	});
</script>

<div class="schedule_timetable-rows">
	{#each rows as row}
		<ScheduleTimetableRow
			time={row.time}
			rowData={rowsDataByHours.get(row.time.split(':')[0]) || []}
		></ScheduleTimetableRow>
	{/each}
</div>

<style>
	.schedule_timetable-rows {
		width: 100%;
		height: 39rem;

		padding-right: 2rem;

		overflow-y: auto;
	}

	.schedule_timetable-rows::-webkit-scrollbar {
		background-color: var(--color-secondary);
		border-radius: 48px;
	}

	.schedule_timetable-rows::-webkit-scrollbar-thumb {
		background-color: var(--color-neutral);
		border-radius: 48px;
	}

	@media (max-height: 720px) {
		.schedule_timetable-rows {
			width: 100%;
			height: 18rem;

			padding-right: 2rem;

			overflow-y: auto;
		}
	}
</style>
