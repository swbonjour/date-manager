export const config = {
	PUBLIC_HTTP_SERVER_URL: import.meta.env.VITE_PUBLIC_HTTP_SERVER_URL || 'http://localhost:3000',
	IS_DEV: Boolean(Number(import.meta.env.VITE_NODE_ENV)) || true
};
