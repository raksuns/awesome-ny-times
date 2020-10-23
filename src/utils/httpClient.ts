import { stringify } from "query-string";
import axios from "axios";

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

export const HttpClient = {
	Request: async <A>(
		methodType: string,
		url: string,
		params?: HttpModel.IRequestQueryPayload,
		payload?: HttpModel.IRequestPayload
	): Promise<A> => {
		return new Promise((resolve, reject) => {
			axios({
				method: `${methodType}`,
				url: `${process.env.REACT_APP_API_URL}${url}`,
				cache: "no-cache",
				headers: {
					"Content-Type": "application/json",
				},
				timeout: 1000,
				withCredentials: true,
				data: JSON.stringify(payload),
				params: params
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
