/**
 * Created on 07 Dec 2021 by lonmee
 */
import {channel} from "rn_bridge";

// Report JS backend crashes to Java, and in turn, to ACRA
process.on('unhandledRejection', reason => {
  console.error(reason);
  channel.post('exception', reason);
  setTimeout(() => {
    process.exit(1);
  });
});

process.on('uncaughtExceptionMonitor', err => {
  console.error(err);
  if (typeof err === 'string') {
    channel.post('exception', err);
  } else {
    channel.post('exception', err.message + '\n' + err.stack);
  }
});

export default;
