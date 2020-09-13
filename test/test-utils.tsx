/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode } from 'react';
import { AnyAction, Action, createStore, Store } from 'redux';
import { Provider } from 'react-redux';
import { render, RenderResult } from '@testing-library/react';
import { rootReducer } from '../src/store/reducer';
interface RenderWithRedux<
	S = any,
	A extends Action = AnyAction,
	I extends S = any
	> {
	(
		ui: ReactNode,
		reduxOptions: {
			store?: Store<S, A>
			initialState?: I
		}
	): RenderResult & {
		store: Store<S, A>
	}
}
export const renderWithRedux: RenderWithRedux = (ui, { store = createStore(rootReducer) } = {}) => {
	return {
		...render(<Provider store={store}>{ui}</Provider>),
		// adding `store` to the returned utilities to allow us
		// to reference it in our tests (just try to avoid using
		// this to test implementation details).
		store,
	}
}
