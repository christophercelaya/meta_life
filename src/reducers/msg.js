/**
 * Created on 21 Dec 2021 by lonmee
 */

const msgInitState = {
  privateMsg: {},
  privateParsed: {},
  publicMsg: {},
  publicParsed: {},
};

export const msgReducer = (state = msgInitState, {type, payload}) => {
  switch (type) {
    case 'setPrivateMsg':
      const msgArr = payload.messages;
      const rootKey = payload.messages[0].key;
      const newMsgObj = {...state.privateMsg};
      newMsgObj[rootKey] = msgArr;
      return {...state, privateMsg: newMsgObj};
    case 'addPrivateMsg':
      return {...state, privateMsg: state.privateMsg.concat(payload)};
    case 'clearPrivateMsg':
      return {...state, privateMsg: {}};
    case 'setPublicMsg':
      return {...state, publicMsg: payload};
    case 'addPublicMsg':
      return {...state, publicMsg: state.publicMsg.messages.concat(payload)};
    case 'clearPublicMsg':
      return {...state, privateMsg: {}};
    default:
      return state;
  }
};
