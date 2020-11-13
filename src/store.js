import { createStore } from 'redux';

const initialState = {
  theme: {
    'colors.primary': '#000000',
    'colors.primaryBackground': '#ffffff',
    'colors.secondary': '#ffffff',
    'colors.secondaryBackground': '#4a86e8',
    'colors.highlight1': '#4a86e8',
    'colors.highlight2': '#ffab40',
    'sizes.text': 1.1,
    'sizes.h1': 1.4,
    'sizes.h2': 1.2,
    'sizes.borderWidth': 1,
    'textfield.textSize': 1.1,
    'textfield.color': '#000000',
    'textfield.border': '1px solid #000000',
    'textfield.background': '#ffffff',
    'buttons.fontSize': 'calc(1.1*1.2)',
    'buttons.color': '#000000',
    'buttons.background': '#4a86e8',
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
store.subscribe(() => {
  localStorage.setItem('store', JSON.stringify(store.getState()));
});

export default store;
