import { writable } from 'svelte/store';
import * as jwt from 'jwt-decode';

export const userStore = writable({
	id: '',
	usersMap: new Map(),
	init: () => {
		userStore.update((u) => ({
			...u,
			id: parseAuthToken()
		}));
	}
});

const parseAuthToken = () => {
	const authToken = localStorage.getItem('auth-token');
	if (!authToken) {
		return '';
	}
	const decoded = jwt.jwtDecode(authToken) as { id?: string };
	return decoded?.id || '';
};
