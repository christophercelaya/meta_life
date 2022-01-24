/**
 * Created on 21 Dec 2021 by lonmee
 */

const msgInitState = {
  privateMsg: {},
  publicMsg: {},
};

export const msgReducer = (state = msgInitState, {type, payload, fId}) => {
  switch (type) {
    case 'addPrivateMsg':
      const {sequence, author, timestamp, content} = payload.messages[0].value,
        key = author === fId ? content.recps[1] : author,
        temp = {};
      temp[key] = [content];
      return {
        ...state,
        privateMsg:
          state.privateMsg && state.privateMsg.hasOwnProperty(key)
            ? timestamp > state.privateMsg[key].timestamp
              ? {timestamp, contents: state.privateMsg[key].concat([content])}
              : state
            : {...temp},
      };
    case 'clearPrivateMsg':
      return {...state, privateMsg: {}};
    case 'setPublicMsg':
      return {...state, publicMsg: payload};
    default:
      return state;
  }
};
