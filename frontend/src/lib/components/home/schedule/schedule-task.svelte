<script lang="ts">
	import EditIcon from '$lib/icon/edit.svg?raw';
</script>

<div class="schedule-task">
	<div class="schedule-task_time">
		<p class="schedule-task_time-start">8:45</p>
		<div class="schedule-task_time-line"></div>
		<p class="schedule-task_time-end">9:00</p>
	</div>

	<div class="schedule-task_label">
		<div class="schedule-task_label-type">work</div>
		<p class="schedule-task_label-text">Task task task</p>
	</div>

	<button class="schedule-task_edit">{@html EditIcon}</button>
</div>

<style>
	.schedule-task {
		width: 100%;
		height: 4rem;

		display: flex;
		justify-content: center;
		align-items: center;
		gap: 2rem;
	}

	.schedule-task_time {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.schedule-task_time-line {
		width: 100%;
		height: 0.1rem;

		background-color: var(--color-secondary);
	}

	.schedule-task_time-start,
	.schedule-task_time-end {
		font-size: 16px;
		font-weight: 600;
		color: #c5c5c5;
	}

	.schedule-task_label {
		width: 80%;
		height: 100%;

		display: flex;
		justify-content: center;
		align-items: flex-start;
		flex-direction: column;
	}

	.schedule-task_label-type {
		width: 20%;

		display: flex;
		justify-content: center;
		align-items: center;

		background-color: var(--color-accent);

		font-size: 12px;
		font-weight: 600;
		color: var(--color-primary);

		border-radius: 48px;
	}

	.schedule-task_label-text {
		font-size: 20px;
		font-weight: 600;
	}

	.schedule-task_edit {
		background-color: var(--color-primary);
		fill: var(--color-accent);

		outline: none;
		border: none;

		cursor: pointer;
	}
</style>
