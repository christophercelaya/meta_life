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
import {publishUtilsPlugin} from './plugins/publishUtils';

export const client = {instance: null};

export const makeClient = () =>
  ssbClient(manifest)
    .use(consumer)
    .use(cachedAboutSelf)
    .use(publishUtilsPlugin)
    .use(hooksPlugin)
    .use(connUtils)
    .use(threadsUtils)
    .call(null, (err, ssb) => {
      if (err) {
        console.error(err);
      } else {
        // todo: when hmr active updating, the reference of ssb-server will be null
        window.ssb = client.instance = ssb;
      }
    });
