/**
 * Created on 21 Dec 2021 by lonmee
 */

const contactsInitState = {
  stagedPeers: [],
  connectedPeers: [],
  friendsGraph: {},
  peerInfoDic: {},
};

export const contactsReducer = (state = contactsInitState, {type, payload}) => {
  switch (type) {
    case 'setStagedPeers':
      return {...state, stagedPeers: payload};
    case 'setConnectedPeers':
      return {...state, connectedPeers: payload};
    case 'setFriendsGraph':
      return {...state, friendsGraph: payload, friends: {}};
    case 'addPeerInfo':
      return {...state, peerInfoDic: {...state.peerInfoDic}};
    default:
      return state;
  }
};
