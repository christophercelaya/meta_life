/**
 * Created on 21 Dec 2021 by lonmee
 */

const msgInitState = {
  privateMsg: {},
  publicMsg: {messages: [], full: false},
};

export const msgReducer = (state = msgInitState, {type, payload}) => {
  switch (type) {
    case 'setPrivateMsg':
      return {...state, privateMsg: payload};
    case 'addPrivateMsg':
      const msg = payload.messages[0],
        rootKey = msg.value.content.rootKey || msg.key,
        newPrivate = {...state.privateMsg};
      newPrivate[rootKey] = state.privateMsg[rootKey]
        ? state.privateMsg[rootKey].concat(msg)
        : [msg];
      return {...state, privateMsg: newPrivate};
    case 'clearPrivateMsg':
      return {...state, privateMsg: {}};
    case 'setPublicMsg':
      return {...state, publicMsg: payload};
    case 'addPublicMsg':
      return {...state, publicMsg: state.publicMsg.messages.concat(payload)};
    case 'clearPublicMsg':
      return {...state, publicMsg: {}};
    default:
      return state;
  }
};
