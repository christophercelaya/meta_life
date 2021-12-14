/**
 * Created on 14 Dec 2021 by lonmee
 */

export const greeterPlugin = {
  name: 'greetings',

  init: function (ssb) {
    return {
      greet: cb => {
        ssb.publish({type: 'post', text: 'Hello world!'}, cb);
      },
    };
  },
};
