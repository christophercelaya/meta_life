/**
 * Created on 21 Dec 2021 by lonmee
 */

const contactsInitState = {
  stagedPeers: [],
  connectedPeers: [],
  following: [],
  followers: [],
  friendsGraph: {},
};

export const contactsReducer = (state = contactsInitState, {type, payload}) => {
  switch (type) {
    case 'setStagedPeers':
      return {...state, stagedPeers: payload};
    case 'setConnectedPeer                                                    s':
      return {...state, connectedPeers: payload};
    case 'addFollowing':
      return {...state, following: state.following.concat(payload)};
    case 'removeFollowing':
      return {
        ...state,
        following: state.following.filter(p => p.key !== payload.key),
      };
    case 'addFollowers':
      return {...state, following: state.followers.concat(payload)};
    case 'removeFollowers':
      return {
        ...state,
        following: state.followers.filter(p => p.key !== payload.key),
      };
    case 'setFriendsGraph':
      return {...state, friendsGraph: payload};
    default:
      return state;
  }
};
