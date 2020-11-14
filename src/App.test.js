import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

test('renders learn react link', () => {
  const store = mockStore({});
  render(<Provider store={store}><App /></Provider>);
});
