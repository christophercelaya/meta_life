/**
 * Created on 18 Jan 2022 by lonmee
 */

const walletInitState = {name: 'nick'};
export const walletReducer = (state = walletInitState, {type, payload}) => {
  switch (type) {
    case 'set':
      return {...state, name: payload};
    case 'delete':
      return walletInitState;
    default:
      return state;
  }
};
