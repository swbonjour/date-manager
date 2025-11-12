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
		height: 100%;
		width: 50%;
		background-color: var(--color-secondary);
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: column;
		gap: 2rem;
	}
</style>
