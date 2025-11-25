import { DateTime } from 'luxon';
import { writable } from 'svelte/store';

export const scheduleStore = writable({
	date: DateTime.now()
});
