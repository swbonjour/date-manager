<script>
	import ScheduleTimetableRowsHeader from './schedule-timetable-rows-header.svelte';
	import ScheduleTimetableRows from './schedule-timetable-rows.svelte';
</script>

<div class="schedule_timetable">
	<ScheduleTimetableRowsHeader></ScheduleTimetableRowsHeader>
	<ScheduleTimetableRows></ScheduleTimetableRows>
</div>

<style>
	.schedule_timetable {
		width: 100%;
		flex: 8;
		min-height: 8rem;

		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		background-color: var(--color-primary);

		border-radius: 20px;

		padding: 2rem;
	}
</style>
