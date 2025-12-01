<script lang="ts">
	import { scheduleStore } from '$lib/stores/schedule-store';
	import { onMount } from 'svelte';

	let busyMinutes = $state(0);

	const minutesInDay = 1440;

	const busyMinutesPercent = $derived(Math.round((busyMinutes / minutesInDay) * 100));
	const unbusyMinutesPercent = $derived(100 - busyMinutesPercent);

	onMount(() => {
		const scheduleStoreUnsubsriber = scheduleStore.subscribe((s) => {
			busyMinutes = s.busyMinutes;
		});
	});
</script>

<div class="schedule-tasks-stat">
	<p class="schedule-tasks-stat_label">График задач</p>

	<div class="schedule-tasks-stat_diagram">
		<p class="schedule-tasks-stat_diagram-text">{busyMinutesPercent} %</p>
	</div>

	<div class="schedule-tasks-stat_data">
		<div class="schedule-tasks-stat_filled">
			<p class="schedule-tasks-stat_filled-text">Заполнено</p>
			<div class="schedule-tasks-stat_filled_data">
				<div class="schedule-tasks-stat_filled-hint"></div>
				<p class="schedule-tasks-stat_filled_percent">{busyMinutesPercent} %</p>
			</div>
		</div>

		<div class="schedule-tasks-stat_empty">
			<p class="schedule-tasks-stat_empty-text">Свободно</p>
			<div class="schedule-tasks-stat_empty_data">
				<div class="schedule-tasks-stat_empty-hint"></div>
				<p class="schedule-tasks-stat_empty_percent">{unbusyMinutesPercent} %</p>
			</div>
		</div>
	</div>
</div>

<style>
	.schedule-tasks-stat {
		width: 20%;

		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		gap: 1rem;

		background-color: var(--color-primary);
		border-radius: 20px;

		padding: 2rem;
	}

	.schedule-tasks-stat_label {
		font-size: 24px;
		font-weight: 600;

		color: var(--color-neutral);
	}

	.schedule-tasks-stat_diagram {
		width: 14rem;
		height: 14rem;

		background: conic-gradient(var(--color-accent) 0% 75%, var(--color-secondary) 75% 100%);

		display: flex;
		align-items: center;
		justify-content: center;

		position: relative;

		border-radius: 50%;
	}

	.schedule-tasks-stat_diagram::before {
		content: '';
		position: absolute;

		width: 10rem;
		height: 10rem;

		background: var(--color-primary);

		border-radius: 50%;
	}

	.schedule-tasks-stat_diagram-text {
		position: absolute;

		font-size: 20px;
		font-weight: 600;

		color: var(--color-neutral);
	}

	.schedule-tasks-stat_data {
		display: flex;
		justify-content: center;
		align-items: center;

		gap: 2rem;
	}

	.schedule-tasks-stat_filled,
	.schedule-tasks-stat_empty {
		width: 100%;

		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 0.8rem;
	}

	.schedule-tasks-stat_filled_data,
	.schedule-tasks-stat_empty_data {
		width: 4rem;

		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.schedule-tasks-stat_filled-hint {
		width: 1rem;
		height: 1rem;

		background-color: var(--color-accent);

		border-radius: 3px;
	}

	.schedule-tasks-stat_empty-hint {
		width: 1rem;
		height: 1rem;

		background-color: var(--color-secondary);

		border-radius: 3px;
	}

	.schedule-tasks-stat_filled_percent,
	.schedule-tasks-stat_empty_percent,
	.schedule-tasks-stat_filled-text,
	.schedule-tasks-stat_empty-text {
		font-size: 12px;
		font-weight: 500;

		color: var(--color-neutral);
	}
</style>
