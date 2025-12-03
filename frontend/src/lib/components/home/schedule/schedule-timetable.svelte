<script>
	import ScheduleTimetableHeader from './schedule-timetable-header.svelte';
	import ScheduleTimetableRowsHeader from './schedule-timetable-rows-header.svelte';
	import ScheduleTimetableRows from './schedule-timetable-rows.svelte';
</script>

<div class="schedule_timetable">
	<ScheduleTimetableHeader></ScheduleTimetableHeader>

	<div class="schedule_timetable-rows">
		<ScheduleTimetableRowsHeader></ScheduleTimetableRowsHeader>
		<ScheduleTimetableRows></ScheduleTimetableRows>
	</div>
</div>

<style>
	.schedule_timetable {
		width: 50%;
		height: 100%;

		max-height: 100%;

		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 2rem;

		background-color: var(--color-primary);

		border-radius: 20px;

		padding: 2rem;
	}

	.schedule_timetable-rows {
		width: 100%;

		flex: 1;

		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: column;
		gap: 1rem;
	}
</style>
