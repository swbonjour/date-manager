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

		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: column;
		gap: 2rem;
	}

	.schedule_timetable-rows {
		width: 100%;
		height: 100%;

		background-color: var(--color-primary);

		border-radius: 20px;

		padding: 2rem;
	}
</style>
