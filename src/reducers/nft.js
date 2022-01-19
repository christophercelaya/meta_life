/**
 * Created on 18 Jan 2022 by lonmee
 */

const nftInitValue = [];
export const nftReducer = (state = nftInitValue, {type, payload}) => {
  switch (type) {
    case 'add':
      return state.concat(payload);
    case 'remove':
      return state;
    case 'reset':
      return nftInitValue;
    default:
      return state;
  }
};
