import type { TaskDto } from '$lib/utils/client';
import { DateTime } from 'luxon';
import { writable } from 'svelte/store';

export const scheduleStore = writable<{
	date: DateTime<true>;
	isTasksOpen: boolean;
	isTasksModalOpen: boolean;
	tasks: TaskDto[];
	selectedTask?: TaskDto;
	hoveredTask?: string;
	scheduleBusyMinutes: number;
	isDashboardOpen: boolean;
	init: () => void;
}>({
	date: DateTime.now(),
	isTasksOpen: false,
	isTasksModalOpen: false,
	tasks: [] as TaskDto[],
	selectedTask: undefined,
	hoveredTask: undefined,
	scheduleBusyMinutes: 0,
	isDashboardOpen: false,
	init: () => {
		scheduleStore.update((s) => ({
			...s,
			date: DateTime.now(),
			isTasksOpen: window.innerWidth > 768 ? true : false,
			isDashboardOpen: window.innerWidth > 768 ? true : false
		}));
	}
});
