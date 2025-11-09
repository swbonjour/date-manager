import { writable } from 'svelte/store';
import * as jwt from 'jwt-decode';
import { setHeader } from '$lib/utils';

interface AuthTokenData {
	id: string;
	login: string;
}

export const userStore = writable({
	id: '',
	login: '',
	usersMap: new Map(),
	init: () => {
		userStore.update((u) => {
			const authTokenData = parseAuthToken();

			return {
				...u,
				id: authTokenData?.id || '',
				login: authTokenData?.login || ''
			};
		});
	}
});

const parseAuthToken = (): AuthTokenData | undefined => {
	const authToken = localStorage.getItem('auth-token');
	if (!authToken) {
		return;
	}
	setHeader('Authorization', `Bearer ${authToken}`);
	const decoded: AuthTokenData = jwt.jwtDecode(authToken);
	return { id: decoded.id, login: decoded.login };
};
