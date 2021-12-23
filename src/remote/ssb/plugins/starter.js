/**
 * Created on 23 Dec 2021 by lonmee
 */
export const starter = {
  name: 'starter',
  init: ssb => {
    return {
      greet: cb => ssb.publish({tye: 'post', text: 'Hello world!'}, cb),
      start: cb => ssb.conn.start(cb),
    };
  },
};
