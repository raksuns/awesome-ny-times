import React from "react";
import { useDispatch } from "react-redux";
import {
	IconButton,
	ListItemAvatar,
	Avatar,
	ListItemText,
	ListItemSecondaryAction, ListItem
} from "@material-ui/core";
import { AssignmentLate, BookmarkRounded } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { deleteFavorites } from "../store/favorites";
import { NewsItem } from "../types";

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	favorited: {
		color: '#f50000',
	}
}));

export const FavoriteItem: React.FC<NewsItem> = (newsItem: NewsItem): JSX.Element => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const onFavorite = () => {
		dispatch(deleteFavorites(newsItem._id));
	};

	return (
		<ListItem key={newsItem._id} role={undefined} dense>
			<ListItemAvatar>
				<>
					{ newsItem && newsItem.imgUrl && <Avatar variant="rounded" src={`https://static01.nyt.com/${newsItem.imgUrl}`} />}
					{ newsItem && !newsItem.imgUrl && <Avatar variant="rounded"><AssignmentLate /></Avatar>}
				</>
			</ListItemAvatar>
			<ListItemText>
				<a href={newsItem.web_url} target='_blank' rel="noopener noreferrer">
					{newsItem.lead_paragraph.length > 30 ? newsItem.lead_paragraph.substr(0, 30) : (newsItem.lead_paragraph)}
					{newsItem.lead_paragraph.length > 30 && (<span>...more</span>)}
				</a>
			</ListItemText>
			<ListItemSecondaryAction>
				<IconButton edge="end" onClick={onFavorite} className={classes.favorited}>
					<BookmarkRounded/>
				</IconButton>
			</ListItemSecondaryAction>
		</ListItem>
	);
};
