import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';

import { Doc, Http, NewsResponse } from 'utils/http';
import { NewsList } from './NewsList';

export const News = () => {
	const [search, setSearch] = useState('');
	const [isPending, setPending] = useState<boolean>(false);
	const [hits, setHits] = useState<number>(0);
	const [page, setPage] = useState<number>(0);
	const [news, setNews] = useState<Array<Doc>>([]);

	const getNews = async () => {

		if(!search) {
			return;
		}

		let res: NewsResponse;
		let params = {
			q: search,
			page: page
		};

		try {
			res = await Http.Request<NewsResponse>(
				"GET",
				"/svc/search/v2/articlesearch.json",
				params
			);

			setHits(res.response.meta.hits);
			setPending(false);

			if(res && res.response && res.response.docs) {
				if (news && news.length > 0) {
					setNews([...news, ...res.response.docs]);
				}
				else {
					setNews(res.response.docs);
				}
			}
		}
		catch(e) {
		}
	};

	useEffect(() => {
		getNews();
	}, [page]);

	const onMore = () => {
		if(news && news.length < hits) {
			setPending(true);
			setPage(page + 1);
		}
	};

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setPending(true);
		setNews([]);

		if(page === 0) {
			await getNews();
		}
		else {
			setPage(0);
		}
	};

	return (
		<section className="container">
			<section className="header">
				<form data-testid="search-form" onSubmit={onSubmit}>
					<TextField
						data-testid="search"
						placeholder="Search news keyword"
						fullWidth
						margin="normal"
						value={search}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
						variant="outlined"
					/>
				</form>
				<section className="hits">Search result : {`${news.length} / ${hits}`}</section>
			</section>
			<NewsList hits={hits} news={news} isPending={isPending} onMore={onMore}/>
		</section>
	);
};




