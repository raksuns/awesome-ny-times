import React from "react";
import { List } from '@material-ui/core';
import { NewsItem } from "../types";
import { FavoriteItem } from './FavoriteItem';

export interface FavoriteListProps {
	news: NewsItem[];
}

export const FavoriteList: React.FC<FavoriteListProps> = ({news}) => {
	return (
		<List>
		{news && news.map((newsItem: NewsItem) => <FavoriteItem key={newsItem._id} {...newsItem}/>)}
		</List>
	);
};
