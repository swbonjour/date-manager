import { SchedlyApi, type ApiConfig } from './client';
import { config } from './config';

export class SchedlyApiSingle extends SchedlyApi<unknown> {
	private static _instance: SchedlyApi<unknown> | undefined;

	public static Instance(data: ApiConfig<unknown>) {
		if (!SchedlyApiSingle._instance) {
			SchedlyApiSingle._instance = new SchedlyApiSingle(data);
		}
		return SchedlyApiSingle._instance;
	}
}

export const client = SchedlyApiSingle.Instance({
	baseURL: config.PUBLIC_HTTP_SERVER_URL,
	withCredentials: true,
	//timeout: 120000,
	timeout: 1000 * 60 * 5 // 5 min
});

type CommonRequestHeadersList =
	| 'Accept'
	| 'Content-Length'
	| 'User-Agent'
	| 'Content-Encoding'
	| 'Authorization';

export const setHeader = (header: CommonRequestHeadersList, value: string) => {
	client.instance.defaults.headers.common[header] = value;
};
