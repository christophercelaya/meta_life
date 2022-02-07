import {combineReducers} from 'redux';
import {contactsReducer} from './contacts';
import {msgReducer} from './msg';
import {daoReducer} from './dao';
import {userReducer} from './user';

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

const reducer = combineReducers({
  cfg: cfgReducer,
  user: userReducer,
  msg: msgReducer,
  contacts: contactsReducer,
  dao: daoReducer,
});

export default reducer;
