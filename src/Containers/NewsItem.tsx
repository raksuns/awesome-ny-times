import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as _ from "lodash";
import classNames from "classnames";
import { IconButton, ListItem, ListItemText, ListItemSecondaryAction, ListItemAvatar, Avatar } from "@material-ui/core";
import { BookmarkRounded, AssignmentLate } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { addFavorites, deleteFavorites } from "../store/favorites";
import { NewsItemProps } from "../types";
import { RootState } from "../store/reducer";
const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	cover: {
		width: 151,
	},
	favorite: {
	},
	favorited: {
		color: '#f50000',
	}

}));



export const NewsItem: React.FC<NewsItemProps> = ({ doc }): JSX.Element => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const news = useSelector((state: RootState) => state.news.favorites || []);

	const [isFavorite, setFavorite] = useState<boolean>(false);

	useEffect(() => {
		const check = _.find(news, ['_id', doc._id]);
		setFavorite(!!check);
	}, [doc, news]);

	const onFavorite = () => {
		const hasTarget = _.find(news, ['_id', doc._id]);
		if(!hasTarget) {
			dispatch(addFavorites({
				_id: doc._id,
				lead_paragraph: doc.lead_paragraph,
				imgUrl: doc.multimedia && doc.multimedia[0] ? doc.multimedia[0].url : null,
				web_url: doc.web_url
			}));
			setFavorite(true);
		}
		else {
			dispatch(deleteFavorites(doc._id));
			setFavorite(false);
		}
	};

	return (
		<ListItem key={doc._id} role={undefined} dense>
			<ListItemAvatar>
				<>
				{ doc && doc.multimedia[0] && <Avatar variant="rounded" src={`https://static01.nyt.com/${doc.multimedia[0].url}`} />}
				{ doc && !doc.multimedia[0] && <Avatar variant="rounded"><AssignmentLate /></Avatar>}
				</>
			</ListItemAvatar>
			<ListItemText>
				<a href={doc.web_url} target='_blank' rel="noopener noreferrer">
					{doc.lead_paragraph.length > 30 ? doc.lead_paragraph.substr(0, 30) : doc.lead_paragraph}
					{doc.lead_paragraph.length > 30 && (<span>...more</span>)}
				</a>
			</ListItemText>
			<ListItemSecondaryAction>
				<IconButton edge="end" onClick={onFavorite} className={classNames(classes.favorite, isFavorite ? classes.favorited : '')}>
					<BookmarkRounded/>
				</IconButton>
			</ListItemSecondaryAction>
		</ListItem>
	);
};
