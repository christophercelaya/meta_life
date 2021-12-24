/**
 * Created on 21 Dec 2021 by lonmee
 */

const contactsInitState = {
  stagedPeers: [],
  connectedPeers: [],
  following: [],
  followers: [],
};

export const contactsReducer = (state = contactsInitState, {type, payload}) => {
  switch (type) {
    case 'setStagedPeers':
      return {...state, stagedPeers: payload};
    case 'setConnectedPeers':
      return {...state, connectedPeers: payload};
    case 'addFollowing':
      return state.following.concat(payload);
    case 'removeFollowing':
      return state.following.filter(p => p.key !== payload.key);
    case 'addFollowers':
      return state.followers.concat(payload);
    case 'removeFollowers':
      return state.followers.filter(p => p.key !== payload.key);
    default:
      return state;
  }
};
