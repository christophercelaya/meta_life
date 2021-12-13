/**
 * Created on 09 Dec 2021 by lonmee
 */

import ssbClient from 'react-native-ssb-client';
import manifest from './manifest';
import {cachedAboutSelf} from './plugins/CachedAboutSelf';
import {hooksPlugin} from './plugins/hooks';
import {connUtils} from './plugins/connUtils';
import consumer from 'ssb-deweird/consumer';
import {threadsUtils} from './plugins/threadsUtils';

export const makeClient = () =>
  ssbClient(manifest)
    .use(consumer)
    .use(cachedAboutSelf)
    .use(hooksPlugin)
    .use(connUtils)
    .use(threadsUtils)
    .call(null, (err, ssb) => {
      if (err) {
        console.error(err);
      } else {
        console.log(ssb);
        window.ssb = ssb;
      }
    });
