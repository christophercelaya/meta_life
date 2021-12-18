/**
 * Created on 16 Dec 2021 by lonmee
 */
const ssbInitState = {
  instance: null,
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
    case 'setInstance':
      return {...state, instance: payload, selfFeedId: payload.id};
    case 'setFeedId':
      return {...state, selfFeedId: payload};
    case 'delete':
      return ssbInitState;
    default:
      return state;
  }
};
