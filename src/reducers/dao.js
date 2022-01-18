/**
 * Created on 18 Jan 2022 by lonmee
 */

const daoInitValue = [];
export const daoReducer = (state = daoInitValue, {type, payload}) => {
  switch (type) {
    case 'add':
      return state.concat(payload);
    case 'remove':
      return state;
    case 'reset':
      return daoInitValue;
    default:
      return state;
  }
};
