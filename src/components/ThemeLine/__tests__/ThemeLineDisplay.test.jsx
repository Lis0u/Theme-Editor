import React from 'react';
import ThemeLineDisplay from '../ThemeLineDisplay';
import { render, getByTestId, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Basic tests on render', () => {
  it('should render without crashing', () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <ThemeLineDisplay />
      </Provider>
    );
  });

  it('should render with empty props', () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <ThemeLineDisplay
          title=""
          themeProps={{}}
          variableName=""
          setEditMode={() => {}}
        />
      </Provider>
    );
  });

  it('should render with a colored themeProps', () => {
    const store = mockStore({
      theme: {
        'colors.primary': { value: '#000000', type: 'color' },
        'sizes.text': { value: 1.1, type: 'em' },
      }
    });
    render(
      <Provider store={store}>
        <ThemeLineDisplay
          themeProps={{ value: '#ffffff', type: 'color' }}
          variableName="colors.primary"
        />
      </Provider>
    );
  });

  it('should render with a px themeProps', () => {
    const store = mockStore({
      theme: {
        'sizes.text': { value: 15, type: 'px' },
      }
    });
    render(
      <Provider store={store}>
        <ThemeLineDisplay
          themeProps={{ value: 15, type: 'px' }}
          variableName="sizes.text"
        />
      </Provider>
    );
  });
});

describe('Test on setEditMode function', () => {
  it('should trigger setEditMode function when clicking on themeLine', () => {
    const store = mockStore({
      theme: {
        'colors.primary': { value: '#000000', type: 'color' },
        'sizes.text': { value: 1.1, type: 'em' },
      }
    });
    const { container } = render(
      <Provider store={store}>
        <ThemeLineDisplay
          themeProps={{ value: '#ffffff', type: 'color' }}
          variableName="colors.primary"
        />
      </Provider>
    );

    const themeLine = getByTestId(container, 'theme-line-button');
    fireEvent.click(themeLine);
  });
});
