<script lang="ts">
	import PlusIcon from '$lib/icon/plus.svg?raw';
	import { onMount } from 'svelte';
	import ScheduleTaskEdit from './schedule-task-edit.svelte';

	import ScheduleTask from './schedule-task.svelte';
	import { client } from '$lib/utils';
	import { scheduleStore } from '$lib/stores/schedule-store';
	import type { TaskDto } from '$lib/utils/client';
	import { userStore } from '$lib/stores/user-store';
	import dayjs from 'dayjs';

	let tasks = $state<TaskDto[]>([]);

	let isEditOpen = $state(false);

	const openEdit = () => {
		isEditOpen = !isEditOpen;
	};

	onMount(async () => {
		const unsubscribeUserStore = userStore.subscribe(async (user) => {
			console.log(
				// $scheduleStore.date.clone().startOf('D').toString(),
				// $scheduleStore.date.toString(),
				dayjs().toString(),
				dayjs().utcOffset()
			);
			if (user.id) {
				tasks = await client.task.taskControllerGetTasksByDate({
					date: $scheduleStore.date.clone().startOf('D').toString()
				});
				unsubscribeUserStore();
			}
		});
	});
</script>

<div class="schedule-tasks">
	<div class="schedule-tasks_header">
		<p class="schedule-tasks_header-text">Мои задачи</p>
		<button class="schedule-tasks_header-create" onclick={() => openEdit()}
			>Создать {@html PlusIcon}</button
		>
	</div>
	<div class="schedule-tasks_tasks">
		{#each tasks as task}
			<ScheduleTask {...task}></ScheduleTask>
		{/each}
	</div>

	{#if isEditOpen}
		<ScheduleTaskEdit bind:isEditOpen bind:tasks />
	{/if}
</div>

<style>
	.schedule-tasks {
		width: 30%;
		height: 100%;

		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: column;

		background-color: var(--color-primary);

		border-radius: 20px;

		padding: 0rem 2rem 2rem 2rem;
	}

	.schedule-tasks_header {
		width: 100%;
		height: 4rem;

		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.schedule-tasks_header-text {
		font-size: 24px;
		font-weight: 600;

		color: var(--color-neutral);
	}

	.schedule-tasks_header-create {
		width: 8rem;
		height: 2rem;

		display: flex;
		justify-content: space-around;
		align-items: center;

		background-color: var(--color-neutral);
		fill: var(--color-primary);
		color: var(--color-primary);

		border-radius: 12px;

		font-size: 16px;
		font-weight: 600;

		outline: none;
		border: none;

		cursor: pointer;
	}

	.schedule-tasks_tasks {
		width: 100%;
		height: 100%;

		padding-top: 2rem;
	}
</style>
