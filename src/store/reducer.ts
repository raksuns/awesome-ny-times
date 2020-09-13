import { combineReducers } from "redux";
import { favoritesReducer } from "./favorites";

export const rootReducer = combineReducers({
	news: favoritesReducer
});

export type RootState = ReturnType<typeof rootReducer>;

