/**
 * Created on 21 Dec 2021 by lonmee
 */

const msgInitState = {
  privateMsg: {},
  publicMsg: [],
};

export const msgReducer = (state = msgInitState, {type, payload}, fId) => {
  switch (type) {
    case 'addPrivateMsg':
      const key =
        payload.messages[0].value.author === fId
          ? payload.messages[0].value.content.recps[1]
          : payload.messages[0].value.author;
      (len = state.privateMsg[author].length),
        (msgList = state.privateMsg[author]),
        (lastTimeStamp = msgList ? [len - 1].messages[0].timestamp : 0);
      let temp;
      if (lastTimeStamp === 0) {
        temp = {};
        temp[author] = payload;
      }
      return {
        ...state,
        privateMsg:
          payload.messages[0].timestamp > lastTimeStamp
            ? lastTimeStamp === 0
              ? {...state.privateMsg, ...temp}
              : state.privateMsg[author].concat(payload)
            : state.privateMsg,
      };
    case 'clearPrivateMsg':
      return {...state, privateMsg: {}};
    case 'setPublicMsg':
      return {...state, publicMsg: payload};
    default:
      return state;
  }
};
