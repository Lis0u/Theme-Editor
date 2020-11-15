import React from 'react';
import SaveButton from '../SaveButton';
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
        <SaveButton />
      </Provider>
    );
  });
});

describe('Tests on button click', () => {
  it('should trigger the save button without crashing', () => {
    const store = mockStore({});
    const { container } = render(
      <Provider store={store}>
        <SaveButton />
      </Provider>
    );

    const saveButton = getByTestId(container, 'save-button');
    fireEvent.click(saveButton);
  });
});
