import { writable } from 'svelte/store';
import * as jwt from 'jwt-decode';
import { setHeader } from '$lib/utils';

interface AuthTokenData {
	_id: string;
	email: string;
}

export const userStore = writable({
	id: '',
	email: '',
	usersMap: new Map(),
	init: () => {
		userStore.update((u) => {
			const authTokenData = parseAuthToken();

			return {
				...u,
				id: authTokenData?._id || '',
				email: authTokenData?.email || ''
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
	return { _id: decoded._id, email: decoded.email };
};
