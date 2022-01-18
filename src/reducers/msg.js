/**
 * Created on 21 Dec 2021 by lonmee
 */

const msgInitState = {
  privateMsg: {},
  publicMsg: {},
};

export const msgReducer = (state = msgInitState, {type, payload}, fId) => {
  switch (type) {
    case 'addPrivateMsg':
      const {sequence, author, timestamp, content} = payload.messages[0].value,
        key = author === fId ? content.recps[1] : author;
      let temp = {};
      if (!state.privateMsg.hasOwnProperty(key)) {
        temp[key] = [];
        temp[key][sequence] = content;
        return {
          ...state,
          privateMsg: {...state.privateMsg, ...temp},
        };
      } else {
        const len = state.privateMsg[key].length;
        if (sequence > len - 1) {
          temp = state.privateMsg[key].concat()[sequence + 1] = content;
          return {...state, privateMsg: temp};
        }
        return state;
      }
    case 'clearPrivateMsg':
      return {...state, privateMsg: {}};
    case 'setPublicMsg':
      return {...state, publicMsg: payload};
    default:
      return state;
  }
};
