<script lang="ts">
	import type { TaskDto } from '$lib/utils/client';
	import { DateTime } from 'luxon';

	const { time, rowData }: { time: string; rowData: TaskDto[] } = $props();

	const rowHour = Number(time.split(':')[0]);

	const calculatedRows = $derived(() => {
		const sortedRows = rowData.sort(
			(a, b) => DateTime.fromISO(a.start).valueOf() - DateTime.fromISO(b.start).valueOf()
		);

		return sortedRows.map((row) => {
			const start = DateTime.fromISO(row.start);
			const finish = DateTime.fromISO(row.finish);

			let minutesInHour: number;
			let percent: number;
			let percentagePaddingLeft: number;
			if (finish.hour === rowHour && start.hour === rowHour) {
				minutesInHour = finish.diff(start, 'minutes').minutes;
				percent = (minutesInHour / 60) * 100;
			} else if (finish.hour === rowHour) {
				minutesInHour = finish.minute;
				percent = (minutesInHour / 60) * 100;
			} else if (start.hour === rowHour) {
				minutesInHour = Math.abs(start.minute - 60);
				percent = (minutesInHour / 60) * 100;
			} else {
				percent = 100;
			}

			if (finish.hour === rowHour && start.hour === rowHour) {
				percentagePaddingLeft = (start.minute / 60) * 100;
			} else if (finish.hour === rowHour) {
				percentagePaddingLeft = 0;
			} else if (start.hour === rowHour) {
				percentagePaddingLeft = ((60 - Math.abs(start.minute - 60)) / 60) * 100;
			} else {
				percentagePaddingLeft = 0;
			}

			return { task: row, percentage: percent, percentagePaddingLeft: percentagePaddingLeft };
		});
	});
</script>

<div class="schedule_timetable-row">
	<p class="schedule_timetable-row-time">{time}</p>
	<div class="schedule_timetable-row-wrap">
		{#each calculatedRows() as row}
			<div
				class="schedule_timetable-row-line"
				style="width: {row.percentage}%; background-color: var(--color-{row.task
					.type}); left: {row.percentagePaddingLeft}%;"
			></div>
		{/each}
	</div>
</div>

<style>
	.schedule_timetable-row {
		width: 100%;
		height: 3rem;

		display: flex;
		justify-content: center;
		align-items: center;

		gap: 2rem;

		padding-bottom: 1rem;
	}

	.schedule_timetable-row-time {
		width: 10%;

		font-size: 20px;
		font-weight: 600;

		color: var(--color-neutral);
	}

	.schedule_timetable-row-wrap {
		width: 100%;
		height: 100%;

		background-color: var(--color-secondary);

		border-radius: 8px;

		position: relative;
	}

	.schedule_timetable-row-line {
		height: 100%;
		width: 100%;

		display: inline-block;

		position: absolute;

		background-color: var(--color-secondary);
		border-radius: 8px;
	}
</style>
