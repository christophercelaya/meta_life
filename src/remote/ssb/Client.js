/**
 * Created on 09 Dec 2021 by lonmee
 */

import ssbClient from 'react-native-ssb-client';
import manifest from './manifest';
import {peers, starter} from './plugins/starter';
import {msgUtils} from './plugins/msgUtils';

export const makeClient = () =>
  ssbClient(manifest).use(starter).use(peers).use(msgUtils).callPromise();
