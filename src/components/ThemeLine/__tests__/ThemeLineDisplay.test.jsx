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
          variableName="color.primary"
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
          variableName="color.primary"
        />
      </Provider>
    );

    const themeLine = getByTestId(container, 'theme-line-button');
    fireEvent.click(themeLine);
  });
});

describe('Tests on themeLine style on hover', () => {
  it('should color differently on hover', () => {
    const store = mockStore({
      theme: {
        'colors.primary': { value: '#000000', type: 'color' },
        'sizes.text': { value: 1.1, type: 'em' },
        'colors.highlight1': { value: '#AB45AB', type: 'color' },
      }
    });
    const { container } = render(
      <Provider store={store}>
        <ThemeLineDisplay
          themeProps={{ value: '#ffffff', type: 'color' }}
          variableName="color.primary"
        />
      </Provider>
    );

    let themeLineButton = document.getElementsByClassName('invisible-button');
    let style = window.getComputedStyle(themeLineButton[0]);
    expect(style.color).toBe('rgb(0, 0, 0)');

    const themeLine = getByTestId(container, 'theme-line-button');
    fireEvent.mouseEnter(themeLine);

    themeLineButton = document.getElementsByClassName('invisible-button');
    style = window.getComputedStyle(themeLineButton[0]);
    expect(style['font-size']).toBe('1.1em');
    expect(style.color).toBe('rgb(171, 69, 171)');
  });


});
