import React from 'react';
import ThemeLineForm from '../ThemeLineForm';
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
        <ThemeLineForm />
      </Provider>
    );
  });

  it('should render with empty props', () => {
    const store = mockStore({ theme: { 'textfield.textSize': { value: '', type: '' }} });
    render(
      <Provider store={store}>
        <ThemeLineForm
          title=""
          variableName=""
          themeProps={{ value: '', type: '' }}
          setEditMode={() => {}}
        />
      </Provider>
    );
  });

  it('should render with a title', () => {
    const store = mockStore({ theme: { 'textfield.textSize': { value: '', type: '' }} });
    render(
      <Provider store={store}>
        <ThemeLineForm
          title="Text size"
        />
      </Provider>
    );
  });

  it('should render with a colored themeProps', () => {
    const store = mockStore({
      theme: {
        'textfield.textSize': { value: '', type: '' },
        'textfield.color': { value: '#000000', type: 'color' }
      }
    });
    render(
      <Provider store={store}>
        <ThemeLineForm
          title="Text color"
          variableName="textfield.color"
          themeProps={{ value: '#ffffff', type: 'color' }}
        />
      </Provider>
    );
  });

  it('should render with an em type themeProps', () => {
    const store = mockStore({
      theme: {
        'textfield.textSize': { value: 1.1, type: 'em' },
      }
    });
    render(
      <Provider store={store}>
        <ThemeLineForm
          title="Text size"
          variableName="textfield.textSize"
          themeProps={{ value: 1.1, type: 'em' }}
        />
      </Provider>
    );
  });

  it('should render with a px type themeProps', () => {
    const store = mockStore({
      theme: {
        'textfield.textSize': { value: 15, type: 'px' },
      }
    });
    render(
      <Provider store={store}>
        <ThemeLineForm
          title="Text size"
          variableName="textfield.textSize"
          themeProps={{ value: 15, type: 'px' }}
        />
      </Provider>
    );
  });
});

describe('Tests on handleCancel button', () => {
  it('should trigger cancel without crashing', () => {
    const store = mockStore({
      theme: {
        'textfield.textSize': { value: 1.1, type: 'em' },
      }
    });
    const { container } = render(
      <Provider store={store}>
        <ThemeLineForm
          title="Text size"
          variableName="textfield.textSize"
          themeProps={{ value: 1.1, type: 'em' }}
        />
      </Provider>
    );

    const cancelButton = getByTestId(container, 'theme-line-cancel-button');
    fireEvent.click(cancelButton);
  });
});

describe('Tests on the Input component', () => {
  it('should change number value within input of type em', () => {
    const store = mockStore({
      theme: {
        'textfield.textSize': { value: 1.1, type: 'em' },
      }
    });
    const { container } = render(
      <Provider store={store}>
        <ThemeLineForm
          title="Text size"
          variableName="textfield.textSize"
          themeProps={{ value: 1.1, type: 'em' }}
        />
      </Provider>
    );

    const input = getByTestId(container, 'theme-line-value-input').querySelector('input');
    fireEvent.change(input, { target: { value: '3.2' } });
    expect(input.value).toBe('3.2');
  });

  it('should not change value with string in input of type em', () => {
    const store = mockStore({
      theme: {
        'textfield.textSize': { value: 1.1, type: 'em' },
      }
    });
    const { container } = render(
      <Provider store={store}>
        <ThemeLineForm
          title="Text size"
          variableName="textfield.textSize"
          themeProps={{ value: 1.1, type: 'em' }}
        />
      </Provider>
    );

    const input = getByTestId(container, 'theme-line-value-input').querySelector('input');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input.value).toBe('');
  });
});

describe('Test on radio buttons', () => {
  it('should select text radio input without crashing', () => {
    const store = mockStore({
      theme: {
        'textfield.textSize': { value: 1.1, type: 'em' },
      }
    });
    const { container } = render(
      <Provider store={store}>
        <ThemeLineForm
          title="Text size"
          variableName="textfield.textSize"
          themeProps={{ value: 1.1, type: 'em' }}
        />
      </Provider>
    );

    const radioText = getByTestId(container, 'radio-text');
    fireEvent.click(radioText);
  });

  it('should select em radio input without crashing', () => {
    const store = mockStore({
      theme: {
        'textfield.textSize': { value: 1.1, type: 'em' },
      }
    });
    const { container } = render(
      <Provider store={store}>
        <ThemeLineForm
          title="Text size"
          variableName="textfield.textSize"
          themeProps={{ value: 1.1, type: 'em' }}
        />
      </Provider>
    );

    const radioText = getByTestId(container, 'radio-em');
    fireEvent.click(radioText);
  });

  it('should select px radio input without crashing', () => {
    const store = mockStore({
      theme: {
        'textfield.textSize': { value: 1.1, type: 'em' },
      }
    });
    const { container } = render(
      <Provider store={store}>
        <ThemeLineForm
          title="Text size"
          variableName="textfield.textSize"
          themeProps={{ value: 1.1, type: 'em' }}
        />
      </Provider>
    );

    const radioText = getByTestId(container, 'radio-px');
    fireEvent.click(radioText);
  });

  it('should select color radio input without crashing', () => {
    const store = mockStore({
      theme: {
        'textfield.textSize': { value: 1.1, type: 'em' },
      }
    });
    const { container } = render(
      <Provider store={store}>
        <ThemeLineForm
          title="Text size"
          variableName="textfield.textSize"
          themeProps={{ value: 1.1, type: 'em' }}
        />
      </Provider>
    );

    const radioText = getByTestId(container, 'radio-color');
    fireEvent.click(radioText);
  });
});

describe('Test on OK button', () => {
  it('should trigger the OK button without crashing', () => {
    const store = mockStore({
      theme: {
        'textfield.textSize': { value: 1.1, type: 'em' },
      }
    });
    const { container } = render(
      <Provider store={store}>
        <ThemeLineForm
          title="Text size"
          variableName="textfield.textSize"
          themeProps={{ value: 1.1, type: 'em' }}
        />
      </Provider>
    );

    const saveButton = getByTestId(container, 'theme-line-save-button');
    fireEvent.click(saveButton);
  });
});
