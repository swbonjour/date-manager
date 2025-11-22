<script>
	import ScheduleTasks from './schedule-tasks.svelte';
	import ScheduleHeader from './schedule-timetable-header.svelte';
	import ScheduleTimetable from './schedule-timetable.svelte';
</script>

<div class="schedule">
	<div
		style="width: 20%; height: 20%; background-color: var(--color-primary); border-radius: 20px;"
	></div>

	<ScheduleTimetable></ScheduleTimetable>

	<ScheduleTasks></ScheduleTasks>
</div>

<style>
	.schedule {
		width: 100%;
		height: 100%;

		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 2rem;

		background-color: var(--color-secondary);
	}
</style>
