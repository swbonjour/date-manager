import { io, Socket } from 'socket.io-client';
import { writable } from 'svelte/store';

let socket: Socket;

export const messages = writable(
	[] as { id: string; message: string; type: string; create_at: number }[]
);

export const initSocket = () => {
	socket = io('http://109.69.18.59:3000/');

	socket.on('connect', () => {
		console.log('connect');
	});

	socket.on(
		'new_message',
		(data: { id: string; message: string; type: string; create_at: number }) => {
			messages.update((msg) => [
				...msg,
				{ id: data.id, message: data.message, type: data.type, create_at: data.create_at }
			]);
		}
	);

	socket.on(
		'global_new_message',
		(data: { id: string; message: string; type: string; create_at: number }) => {
			messages.update((msg) => [
				...msg,
				{ id: data.id, message: data.message, type: data.type, create_at: data.create_at }
			]);
		}
	);
};

export const sendMessage = (message: string) => {
	socket.emit('send_message', message);
};

export const sendGlobalMessage = (id: string, message: string) => {
	socket.emit('global_send_message', {
		id: id,
		message: message,
		type: 'global',
		create_at: Date.now()
	});
};
