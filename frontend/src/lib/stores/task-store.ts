import { client } from '$lib/utils';
import type { TaskDto } from '$lib/utils/client';
import { writable } from 'svelte/store';

export const taskStore = writable({
	tasks: [] as TaskDto[],

	init: async (date: string) => {
		const tasks = await client.task.taskControllerGetTasksByDate({ date: date });

		taskStore.update((t) => {
			return {
				...t,
				tasks
			};
		});
	}
});
