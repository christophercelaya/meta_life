/**
 * Created on 21 Dec 2021 by lonmee
 */

const msgInitState = {
  stagedPeers: [],
  connectedPeers: [],
};

export const msgReducer = (state = msgInitState, {type, payload}) => {
  switch (type) {
    case 'setStagePeers':
      return {...state, stagedPeers: payload};
    case 'setConnectedPeers':
      return {...state, connectedPeers: payload};
    default:
      return state;
  }
};
