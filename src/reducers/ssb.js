/**
 * Created on 16 Dec 2021 by lonmee
 */
const ssbInitState = {
  source: null,
  selfFeedId: '',
  status: {closed: true},
  info: {
    lastSessionTimestamp: 0,
    preferredReactions: [],
    selfAvatarUrl: '',
    reason: 'connection-attempt',
    displayFeedId: '',
    about: {},
    aliases: [],
    following: null,
    followers: null,
    followsYou: null,
    youFollow: null,
    youBlock: null,
    connection: undefined,
    getFeedReadable: null,
  },
};
export const ssbReducer = (state = ssbInitState, {type, payload}) => {
  switch (type) {
    case 'setSource':
      return {...state, source: payload};
    case 'setFeedId':
      return {...state, selfFeedId: payload};
    case 'delete':
      return ssbInitState;
    default:
      return state;
  }
};
