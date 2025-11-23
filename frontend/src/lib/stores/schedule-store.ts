import dayjs from 'dayjs';
import { writable } from 'svelte/store';

export const scheduleStore = writable({
	date: dayjs()
});
