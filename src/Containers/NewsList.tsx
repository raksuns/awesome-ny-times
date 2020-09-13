import React from 'react';
import { Button, List, CircularProgress } from '@material-ui/core';

import { Doc } from 'utils/http';
import { NewsItem } from './NewsItem';

type NewsProps = {
	news: Doc[];
	hits: number;
	isPending: boolean;
	onMore: () => void;
};

export const NewsList: React.FC<NewsProps> = (props: NewsProps) => {
	const {hits, news, isPending, onMore} = props;

	return (
		<section className="news-list">
			<List>
				{news && news.map(doc => (
					<NewsItem key={doc._id} doc={doc}/>
				))}
			</List>
			<section className="footer">
				{ !isPending && hits > 0 && <Button variant="outlined" color="secondary" fullWidth onClick={onMore}>
					More
				</Button> }
				{isPending && <CircularProgress />}
			</section>
		</section>
	);
};




