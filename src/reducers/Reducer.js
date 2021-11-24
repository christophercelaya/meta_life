import {combineReducers} from 'redux';

export const cfgInitState = {lang: 'en', darkMode: true};
export const cfgReducer = (state = cfgInitState, {type, payload}) => {
  switch (type) {
    case 'setLang':
      return {...state, lang: payload};
    case 'setDarkMode':
      return {...state, darkMode: payload};
    case 'reset':
      return cfgInitState;
    default:
      return state;
  }
};

export const userInitState = {name: 'nick'};
export const userReducer = (state = userInitState, {type, payload}) => {
  switch (type) {
    case 'set':
      return {...state, name: payload};
    case 'delete':
      return userInitState;
    default:
      return state;
  }
};

const daoInitValue = [];
const daoReducer = (state = daoInitValue, {type, payload}) => {
  switch (type) {
    case 'add':
      return state.concat(payload);
    case 'remove':
      return state;
    case 'reset':
      return daoInitValue;
    default:
      return state;
  }
};

const reducer = combineReducers({
  cfg: cfgReducer,
  user: userReducer,
  dao: daoReducer,
});

export default reducer;
