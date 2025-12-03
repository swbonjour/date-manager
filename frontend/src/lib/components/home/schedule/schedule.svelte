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
		width: 92%;
		height: 90%;

		max-width: 100%;
		max-height: 100%;

		display: flex;
		justify-content: center;
		align-items: flex-start;
		gap: 2rem;

		background-color: var(--color-secondary);
	}
</style>
