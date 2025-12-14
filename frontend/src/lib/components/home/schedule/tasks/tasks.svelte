<script lang="ts">
	import Plus from '$lib/icon/plus.svg?raw';
	import { scheduleStore } from '$lib/stores/schedule-store';
	import { ActivityTypeEnum } from '$lib/utils/client';
	import TaskEdit from './task-edit.svelte';
	import Task from './task.svelte';

	const toggleTasks = () => {
		scheduleStore.update((s) => ({
			...s,
			isTasksOpen: !$scheduleStore.isTasksOpen
		}));
	};
</script>

{#if $scheduleStore.isTasksOpen}
	<div
		class="bg-primary absolute top-0 left-0 z-20 h-screen w-screen flex-col items-center justify-start rounded-xl pt-4 pr-8 pb-8 pl-8 md:static md:flex md:h-full md:w-1/2 xl:w-1/4"
	>
		<div class="flex w-full justify-between">
			<p class="text-neutral text-xl font-semibold">Мои задачи</p>
			<div class="flex gap-8">
				<button
					class="bg-secondary text-neutral fill-neutral text-md flex h-10 items-center justify-between gap-2 rounded-md p-2 hover:cursor-pointer"
					><p class="max-md:hidden">Создать</p>
					{@html Plus}</button
				>
				<button
					class="text-neutral fill-neutral text-md flex h-10 rotate-45 items-center justify-between gap-2 rounded-md p-2 hover:cursor-pointer md:hidden"
					onclick={toggleTasks}
					><p class="max-md:hidden">Создать</p>
					{@html Plus}</button
				>
			</div>
		</div>
		<div class="scrollbar mt-8 flex h-7/8 w-full flex-col gap-4 overflow-auto pr-8">
			{#each { length: 20 } as tasks}
				<Task
					time={{ start: '9:00', finish: '10:00' }}
					type={ActivityTypeEnum.WORK}
					label={'TestTestTestTestTestTestTestTestTest'}
				></Task>
			{/each}
		</div>
	</div>
	<TaskEdit></TaskEdit>
{/if}

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
