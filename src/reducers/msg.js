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
      // return {...state, privateMsg: {}};
      const msgArr = payload.messages;
      const rootKey = payload.messages[0].key;
      const newMsgObj_set = {...state.privateMsg};
      newMsgObj_set[rootKey] = msgArr;
      return {...state, privateMsg: newMsgObj_set};
    case 'addPrivateMsg':
      const newMsgObj_add = {};
      newMsgObj_add[payload.key] = state.privateMsg[payload.key]
        ? state.privateMsg[payload.key].concat(payload.msg)
        : [payload.msg];
      return {
        ...state,
        privateMsg: {...state.privateMsg, ...newMsgObj_add},
      };
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
