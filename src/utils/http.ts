import { stringify } from "query-string";

declare namespace HttpModel {
	export interface IRequestPayload {
		[key: string]: {};
	}

	export interface IRequestQueryPayload {
		[key: string]: {};
	}
}

export interface Meta {
	hits: number;
	offset: number;
	time: number;
}

export interface Multimedia {
	url: string;
	width: number;
	height: number;
}

export interface Doc {
	_id: string;
	lead_paragraph: string;
	web_url: string;
	snippet: string;
	pub_date: Date;
	multimedia: Array<Multimedia>;
}

export interface NyResponse {
	docs: Array<Doc>;
	meta: Meta;
}

export interface NewsResponse {
	copyright: string;
	response: NyResponse;
	status: string;
}

export const Http = {
	Request: async <A>(
		methodType: string,
		url: string,
		params?: HttpModel.IRequestQueryPayload,
		payload?: HttpModel.IRequestPayload
	): Promise<A> => {
		return new Promise((resolve, reject) => {
			const query = params
				? `?${stringify({ ...params, 'api-key': process.env.REACT_APP_API_KEY })}`
				: `?${stringify({'api-key': process.env.REACT_APP_API_KEY})}`;

			fetch(`${process.env.REACT_APP_API_URL}${url}${query}`, {
				body: JSON.stringify(payload),
				cache: "no-cache",
				headers: {
					"content-type": "application/json",
				},
				method: `${methodType}`,
			})
			.then(async response => {
				if (response.status === 200) {
					return response.json().then(resolve);
				}
				return reject(response);
			})
			.catch(e => {
				reject(e);
			});
		});
	},
};
