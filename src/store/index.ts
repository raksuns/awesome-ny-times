import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { rootReducer } from "./reducer";

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureStore = () => {

	const persistorConfig = {
		key: 'root',
		storage
	};
	const reducer = persistReducer(persistorConfig, rootReducer);

	const store = createStore(
		reducer,
		composeEnhancers(applyMiddleware(thunk))
	);

	try {
		// @ts-ignore
		persistStore(store);
	} catch (e) {
	}

	return store;
};

