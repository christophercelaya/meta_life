import {combineReducers} from 'redux';
import {ssbReducer} from './ssb';
import {msgReducer} from './msg';
import {contactsReducer} from './contacts';
import {walletReducer} from './wallet';
import {daoReducer} from './dao';
import {nftReducer} from './nft';

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
  wallet: walletReducer,
  ssb: ssbReducer,
  msg: msgReducer,
  contacts: contactsReducer,
  dao: daoReducer,
  nft: nftReducer,
});

export default reducer;
