import { typedAction } from "./helpers";
import { FavoritesState, NewsItem } from "../types";

export const initialState: FavoritesState = {favorites: [], loading: false};

export const addFavorites = (news: NewsItem) => {
	return typedAction("news/ADD_TO_FAVORITES", {news});
};

export const deleteFavorites = (_id: string) => {
	return typedAction("news/DELETE_FAVORITES", {_id});
};

type FavoritesAction = ReturnType<typeof addFavorites | typeof deleteFavorites>;

export function favoritesReducer(state = initialState, action: FavoritesAction): FavoritesState {
	switch (action.type) {
		case "news/ADD_TO_FAVORITES":
			return {
				...state,
				favorites: [
					...state.favorites,
					{
						_id: action.payload.news._id,
						lead_paragraph: action.payload.news.lead_paragraph,
						imgUrl: action.payload.news.imgUrl,
						web_url: action.payload.news.web_url
					}
				]
			};
		case "news/DELETE_FAVORITES":
			return {
				...state,
				favorites: [
					...state.favorites.filter(item => action.payload._id !== item._id)
				]
			};
		default:
			return state;
	}
}
