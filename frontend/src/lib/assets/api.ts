import axios, { type Method } from 'axios';

const axiosAPI = axios.create({
	baseURL: 'http://109.69.18.59:3000/'
});

export const apiRequest = (method: Method, url: string, body?: Record<string, unknown>) => {
	const headers = {
		authorization: `Bearer ${localStorage.getItem('auth-token')}`
	};

	return axiosAPI({
		method,
		url,
		data: body,
		headers
	})
		.then((res) => {
			return Promise.resolve(res.data);
		})
		.catch((err) => {
			return Promise.reject(err);
		});
};
