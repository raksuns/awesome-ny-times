import React from "react";
import {
	AppBar,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	IconButton,
	Slide,
	Toolbar,
	Typography
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TransitionProps } from '@material-ui/core/transitions';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector } from "react-redux";
import { RootState } from "../store/reducer";
import { FavoriteList } from "./FavoriteList";

export interface FavoriteDialogProps {
	open: boolean;
	onClose: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		appBar: {
			position: 'relative',
		},
		title: {
			marginLeft: theme.spacing(2),
			flex: 1,
		},
	}),
);

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & { children?: React.ReactElement },
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export const FavoriteDialog = (props: FavoriteDialogProps) => {
	const classes = useStyles()

	const news = useSelector((state: RootState) => state.news.favorites || []);

	return (
		<Dialog
			fullScreen
			disableBackdropClick
			disableEscapeKeyDown
			maxWidth="xs"
			open={props.open}
			TransitionComponent={Transition}
		>
			<AppBar className={classes.appBar}>
				<Toolbar>
					<IconButton edge="start" color="inherit" onClick={props.onClose} aria-label="close">
						<CloseIcon />
					</IconButton>
					<Typography variant="h6">
						My Favorite News
					</Typography>
				</Toolbar>
			</AppBar>
			<DialogContent dividers>
				<FavoriteList news={news}/>
			</DialogContent>
			<DialogActions>
				<Button autoFocus onClick={props.onClose} color="primary">
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};
