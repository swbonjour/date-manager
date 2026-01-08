import type { TaskDto } from '$lib/utils/client';
import { DateTime } from 'luxon';
import { writable } from 'svelte/store';

export const scheduleStore = writable<{
	date: DateTime<true>;
	busyMinutes: number;
	isTasksOpen: boolean;
	isTasksModalOpen: boolean;
	tasks: TaskDto[];
	selectedTask?: TaskDto;
	init: () => void;
}>({
	date: DateTime.now(),
	busyMinutes: 0,
	isTasksOpen: false,
	isTasksModalOpen: false,
	tasks: [] as TaskDto[],
	selectedTask: undefined,
	init: () => {
		scheduleStore.update((s) => ({
			...s,
			date: DateTime.now(),
			isTasksOpen: window.innerWidth > 768 ? true : false
		}));
	}
});
