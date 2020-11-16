import { createStore } from 'redux';

const initialState = {
  theme: {
    'colors.primary': { value: '#000000', type: 'color' },
    'colors.primaryBackground': { value: '#ffffff', type: 'color' },
    'colors.secondary': { value: '#ffffff', type: 'color' },
    'colors.secondaryBackground': { value: '#4a86e8', type: 'color' },
    'colors.highlight1': { value: '#4a86e8', type: 'color' },
    'colors.highlight2': { value: '#ffab40', type: 'color' },
    'sizes.text': { value: '1.1', type: 'em' },
    'sizes.h1': { value: '1.4', type: 'em' },
    'sizes.h2': { value: '1.2', type: 'em' },
    'sizes.borderWidth': { value: '1', type: 'px' },
    'textfield.textSize': { value: '1.1', type: 'em' },
    'textfield.color': { value: '#000000', type: 'color' },
    'textfield.border': { value: '1px solid #000000', type: 'text' },
    'textfield.background': { value: '#ffffff', type: 'color' },
    'buttons.fontSize': { value: 'calc(1.1*1.2)', type: 'text' },
    'buttons.color': { value: '#000000', type: 'color' },
    'buttons.background': { value: '#4a86e8', type: 'color' },
  }
};

function themeReducer (state = initialState, action) {
  switch(action.type) {
    case 'UPDATE_THEME':
      return {
        ...state,
        theme: action.theme,
      }
    default:
      return state;
  }
}

let store = createStore(themeReducer);

export default store;
