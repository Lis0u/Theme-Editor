import React from 'react';
import SaveButton from '../SaveButton';
import { render } from '@testing-library/react';
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
