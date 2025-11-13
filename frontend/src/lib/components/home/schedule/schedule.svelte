<script>
	import ScheduleHeader from './schedule-header.svelte';
	import ScheduleTimetable from './schedule-timetable.svelte';
</script>

<div class="schedule">
	<ScheduleHeader></ScheduleHeader>
	<ScheduleTimetable></ScheduleTimetable>
</div>

<style>
	.schedule {
		width: 50%;
		height: 100%;

		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: column;
		gap: 2rem;

		background-color: var(--color-secondary);
	}
</style>
