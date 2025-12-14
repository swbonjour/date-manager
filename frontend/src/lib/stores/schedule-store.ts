import { DateTime } from 'luxon';
import { writable } from 'svelte/store';

export const scheduleStore = writable({
	date: DateTime.now(),
	busyMinutes: 0,
	isTasksOpen: false,
	isTasksModalOpen: true,
	init: () => {
		scheduleStore.update((s) => ({
			...s,
			date: DateTime.now(),
			isTasksOpen: window.innerWidth > 768 ? true : false
		}));
	}
});
