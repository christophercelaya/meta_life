/**
 * Created on 09 Dec 2021 by lonmee
 */

import ssbClient from 'react-native-ssb-client';
import manifest from './Manifest';
// import {cachedAboutSelf} from './plugins/CachedAboutSelf';
// import {hooksPlugin} from './plugins/hooks';
// import {connUtils} from './plugins/connUtils';
// import threadsUtils from './plugins/threadsUtils';
// import consumer from 'ssb-deweird/consumer';

export const makeClient = () =>
  ssbClient(manifest)
    // .use(consumer)
    // .use(cachedAboutSelf)
    // .use(hooksPlugin)
    // .use(connUtils)
    // .use(threadsUtils)
    .callPromise();
