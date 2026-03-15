<script lang="ts">
	import Close from '$lib/icon/close.svg?raw';
	import Plus from '$lib/icon/plus.svg?raw';
	import { scheduleStore } from '$lib/stores/schedule-store';
	import { ActivityTypeEnum } from '$lib/utils/client';
	import { DateTime } from 'luxon';
	import TaskEdit from './task-edit.svelte';
	import Task from './task.svelte';

	const toggleTasks = () => {
		scheduleStore.update((s) => ({
			...s,
			isTasksOpen: !$scheduleStore.isTasksOpen
		}));
	};

	const toggleEdit = () => {
		scheduleStore.update((s) => ({
			...s,
			isTasksModalOpen: !$scheduleStore.isTasksModalOpen,
			selectedTask: undefined
		}));
	};

	const sortedTasks = $derived(
		$scheduleStore.tasks.sort(
			(a, b) => DateTime.fromISO(a.start).valueOf() - DateTime.fromISO(b.start).valueOf()
		)
	);
</script>

{#if $scheduleStore.isTasksOpen}
	<div
		class="bg-primary absolute top-0 left-0 z-20 h-dvh w-screen flex-col items-center justify-start rounded-xl pt-8 pr-8 pb-8 pl-8 md:static md:flex md:h-full md:w-1/2 md:pt-4 xl:w-1/4"
	>
		<div class="flex w-full items-center justify-between">
			<p class="text-neutral text-xl font-semibold">Мои задачи</p>
			<div class="flex gap-8">
				<button
					class="bg-secondary text-neutral fill-neutral text-md hover:bg-accent hidden h-10 items-center justify-between gap-2 rounded-md p-2 transition-all duration-200 hover:cursor-pointer md:flex"
					onclick={toggleEdit}
					><p class="text-neutral text-md">Создать</p>
					{@html Plus}</button
				>
				<button
					class="bg-accent fill-neutral absolute right-8 bottom-8 flex h-12 w-12 items-center justify-center rounded-full hover:cursor-pointer md:hidden"
					onclick={toggleEdit}
				>
					{@html Plus}
				</button>
				<button
					class="text-neutral fill-neutral hover:cursor-pointer md:hidden"
					onclick={toggleTasks}
				>
					{@html Close}</button
				>
			</div>
		</div>
		<div class="scrollbar mt-8 flex h-7/8 w-full flex-col gap-4 overflow-auto">
			{#each sortedTasks as task}
				<Task {task}></Task>
			{/each}
		</div>
	</div>
{/if}
<TaskEdit></TaskEdit>

<style>
	.scrollbar::-webkit-scrollbar {
		width: 0.5rem;
		height: 0.2rem;
	}

	.scrollbar::-webkit-scrollbar-track {
		border-radius: 100vh;
		background: var(--color-secondary);
	}

	.scrollbar::-webkit-scrollbar-thumb {
		background: var(--color-neutral);
		border-radius: 20px;
	}

	@media (width < 48rem) {
		.scrollbar::-webkit-scrollbar {
			width: 0.2rem;
			height: 0.2rem;
		}

		.scrollbar::-webkit-scrollbar-track {
			border-radius: 100vh;
			background: var(--color-secondary);
		}

		.scrollbar::-webkit-scrollbar-thumb {
			background: var(--color-neutral);
			border-radius: 20px;
		}
	}
</style>
