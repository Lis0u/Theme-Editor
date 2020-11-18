import { createStore } from 'redux';

const initialState = {
  theme: {}
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
