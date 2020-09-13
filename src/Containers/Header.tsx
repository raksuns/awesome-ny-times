import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { BookmarkRounded } from "@material-ui/icons";
import { FavoriteDialog } from "Containers/FavoriteDialog";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducer";

const useStyles = makeStyles((theme) => ({
	title: {
		flexGrow: 1,
	},
}));

export const Header = () => {
	const classes = useStyles();

	const news = useSelector((state: RootState) => state.news.favorites || []);

	const [openFavorite, setOpenFavorite] = useState<boolean>(false);

	const handleFavoriteDialog = () => {
		setOpenFavorite(!openFavorite);
	};

	return (
		<AppBar position="sticky">
			<Toolbar>
				<Typography variant="h6" className={classes.title}>
					NY Times
				</Typography>
				<Button color="inherit" onClick={handleFavoriteDialog}>
					<BookmarkRounded/>
					Show My Favorite ({news.length})
				</Button>
				<FavoriteDialog open={openFavorite} onClose={handleFavoriteDialog}/>
			</Toolbar>
		</AppBar>
	);
};
