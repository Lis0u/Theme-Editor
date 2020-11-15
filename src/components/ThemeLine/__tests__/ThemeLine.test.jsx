import React from 'react';
import ThemeLine from '../ThemeLine';
import { render, getByTestId, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Basic tests on render & mount', () => {
  it('should render without crashing', () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <ThemeLine />
      </Provider>
    );
  });
});

describe('Tests on editMode function', () => {
  it('should enable editMode without crashing', () => {
    const store = mockStore({});
    const { container } = render(
      <Provider store={store}>
        <ThemeLine />
      </Provider>
    );

    const themeLine = getByTestId(container, 'theme-line-button');
    fireEvent.click(themeLine);
  });

  it('should disable editMode without crashing', () => {
    const store = mockStore({});
    const { container } = render(
      <Provider store={store}>
        <ThemeLine />
      </Provider>
    );

    const themeLine = getByTestId(container, 'theme-line-button');
    fireEvent.click(themeLine);

    const cancelButton = getByTestId(container, 'theme-line-cancel-button');
    fireEvent.click(cancelButton);
  });
});
