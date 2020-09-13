import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { News } from './News';

describe('Search text field', () => {
	it('has a search text field', () => {
		const utils = render(<News/>);
		const searchField = utils.getByRole('textbox');
		fireEvent.change(searchField, { target: { value: 'blackpink' } });
		expect(searchField).toHaveValue('blackpink');
	});

	it('submit', () => {
		const utils = render(<News/>);
		const form = utils.getByTestId('search-form');
		fireEvent.submit(form);
	});
});
