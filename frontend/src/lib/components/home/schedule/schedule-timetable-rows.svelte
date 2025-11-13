<script>
	import ScheduleTimetableRow from './schedule-timetable-row.svelte';

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
		{ time: '23:00' },
		{ time: '24:00' }
	]);
</script>

<div class="schedule_timetable-rows">
	{#each rows as row}
		<ScheduleTimetableRow time={row.time}></ScheduleTimetableRow>
	{/each}
</div>

<style>
	.schedule_timetable-rows {
		width: 100%;
		height: 36rem;

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
