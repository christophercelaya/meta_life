/**
 * Created on 21 Dec 2021 by lonmee
 */

const msgInitState = {
  privateMsg: {},
  publicMsg: {},
};

export const msgReducer = (state = msgInitState, {type, payload}) => {
  switch (type) {
    case 'setPrivateMsg':
      return {...state, privateMsg: payload};
    case 'addPrivateMsg':
      return state;
    case 'clearPrivateMsg':
      return {...state, privateMsg: {}};
    case 'setPublicMsg':
      return {...state, publicMsg: payload};
    case 'addPublicMsg':
      return state;
    case 'clearPublicMsg':
      return {...state, privateMsg: {}};
    default:
      return state;
  }
};
