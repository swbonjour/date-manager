<script lang="ts">
	const { time }: { time: string } = $props();

	const rowData: { length: number; color: string }[] = $state([]);

	const randomLines = () => {
		const colors = ['#8E80F9', '#7DC1FE', '#7BFFA2', '#FF7DA9', '#F2F2F2'];

		for (let i = 0; i < Math.floor(Math.random() * 5); i++) {
			rowData.push({
				length: Math.floor(Math.random() * 100),
				color: colors[Math.floor(Math.random() * colors.length - 1)]
			});
		}
	};

	randomLines();
</script>

<div class="schedule_timetable-row">
	<p class="schedule_timetable-row-time">{time}</p>
	<div class="schedule_timetable-row-wrap">
		{#each rowData as row}
			<div
				class="schedule_timetable-row-line"
				style="width: {row.length}%;background-color: {row.color};"
			></div>
		{/each}
	</div>
</div>

<style>
	.schedule_timetable-row {
		width: 100%;
		height: 3rem;

		display: flex;
		justify-content: center;
		align-items: center;

		gap: 2rem;

		padding-bottom: 1rem;
	}

	.schedule_timetable-row-time {
		width: 10%;

		font-size: 20px;
		font-weight: 600;

		color: var(--color-neutral);
	}

	.schedule_timetable-row-wrap {
		width: 100%;
		height: 100%;

		display: flex;
		justify-content: center;
		align-items: center;

		background-color: var(--color-secondary);

		border-radius: 8px;
	}

	.schedule_timetable-row-line {
		height: 100%;
		width: 100%;

		background-color: var(--color-secondary);
		border-radius: 8px;
	}
</style>
