/**
 * Created on 21 Dec 2021 by lonmee
 */

const msgInitState = {
  privateMsg: [],
  publicMsg: [],
};

export const msgReducer = (state = msgInitState, {type, payload}) => {
  switch (type) {
    case 'setPrivateMsg':
      return {...state, privateMsg: payload};
    case 'setPublicMsg':
      return {...state, publicMsg: payload};
    default:
      return state;
  }
};
