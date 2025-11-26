<script lang="ts">
	import EditIcon from '$lib/icon/edit.svg?raw';
	import type { TaskDto } from '$lib/utils/client';
	import { acitivtyTypesLoc } from '$lib/utils/helper';
	import ScheduleTaskEdit from './schedule-task-edit.svelte';
	import { DateTime } from 'luxon';
	import TrashIcon from '$lib/icon/trash.svg?raw';
	import { client } from '$lib/utils';
	import { taskStore } from '$lib/stores/task-store';

	let props: TaskDto = $props();

	let isEditOpen = $state(false);

	const openEdit = () => {
		isEditOpen = !isEditOpen;
	};

	const deleteTask = async () => {
		await client.task.taskControllerDeleteTask({ id: props._id });

		taskStore.update((t) => {
			t.tasks.splice(
				t.tasks.findIndex((item) => item._id === props._id),
				1
			);
			return {
				...t,
				tasks: t.tasks
			};
		});
	};
</script>

<div class="schedule-task">
	<div class="schedule-task_time">
		<p class="schedule-task_time-start">{DateTime.fromISO(props.start).toFormat('HH:mm')}</p>
		<div class="schedule-task_time-line"></div>
		<p class="schedule-task_time-end">{DateTime.fromISO(props.finish).toFormat('HH:mm')}</p>
	</div>

	<div class="schedule-task_label">
		<div class="schedule-task_label-type" style="background-color: var(--color-{props.type})">
			{acitivtyTypesLoc.get(props.type)}
		</div>
		<p class="schedule-task_label-text">{props.label}</p>
	</div>

	<button class="schedule-task_edit" onclick={() => openEdit()}>{@html EditIcon}</button>
	<button class="schedule-task_delete" onclick={() => deleteTask()}>{@html TrashIcon}</button>

	{#if isEditOpen}
		<ScheduleTaskEdit bind:isEditOpen bind:task={props} />
	{/if}
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
		display: flex;
		justify-content: center;
		align-items: center;

		background-color: var(--color-accent);

		font-size: 12px;
		font-weight: 600;
		color: var(--color-primary);

		border-radius: 48px;

		padding: 0.2rem 0.4rem 0.2rem 0.4rem;

		color: #ffffff;
	}

	.schedule-task_label-text {
		font-size: 20px;
		font-weight: 600;

		color: var(--color-neutral);
	}

	.schedule-task_edit {
		background-color: var(--color-primary);
		fill: var(--color-accent);

		outline: none;
		border: none;

		cursor: pointer;
	}

	.schedule-task_delete {
		background-color: var(--color-primary);
		fill: var(--color-accent);

		outline: none;
		border: none;

		cursor: pointer;
	}
</style>
