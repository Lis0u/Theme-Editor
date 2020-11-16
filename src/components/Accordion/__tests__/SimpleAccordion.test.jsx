import React from 'react';
import SimpleAccordion from '../SimpleAccordion';
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
        <SimpleAccordion />
      </Provider>
    );
  });

  it('should open accordion without crashing', () => {
    const store = mockStore({});
    const { container } = render(
      <Provider store={store}>
        <SimpleAccordion />
      </Provider>
    );

    const accordionTitle = getByTestId(container, 'accordion-title');
    fireEvent.click(accordionTitle);
  });

  it('should open and close accordion without crashing', () => {
    const store = mockStore({});
    const { container } = render(
      <Provider store={store}>
        <SimpleAccordion />
      </Provider>
    );

    const accordionTitle = getByTestId(container, 'accordion-title');
    fireEvent.click(accordionTitle); // open
    fireEvent.click(accordionTitle); // close
  });
});
