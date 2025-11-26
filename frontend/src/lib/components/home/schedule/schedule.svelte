<script>
	import ScheduleTaskStat from './schedule-task-stat.svelte';
	import ScheduleTasks from './schedule-tasks.svelte';
	import ScheduleTimetable from './schedule-timetable.svelte';
</script>

<div class="schedule">
	<ScheduleTaskStat></ScheduleTaskStat>

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
