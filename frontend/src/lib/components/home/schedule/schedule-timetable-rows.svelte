<script>
	import ScheduleTimetableRow from './schedule-timetable-row.svelte';

	const rows = $state([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]);
</script>

<div class="schedule_timetable-rows">
	{#each rows as row}
		<ScheduleTimetableRow></ScheduleTimetableRow>
	{/each}
</div>

<style>
	.schedule_timetable-rows {
		width: 100%;
		height: 90%;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		overflow-y: scroll;
	}
</style>
