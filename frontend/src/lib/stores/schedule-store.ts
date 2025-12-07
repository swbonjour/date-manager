import { DateTime } from 'luxon';
import { writable } from 'svelte/store';

export const scheduleStore = writable({
	date: DateTime.now(),
	busyMinutes: 0,
	init: () => {
		scheduleStore.update((s) => ({
			...s,
			date: DateTime.now()
		}));
	}
});
