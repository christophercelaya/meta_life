/**
 * Created on 09 Dec 2021 by lonmee
 */

import ssbClient from 'react-native-ssb-client';
import manifest from './manifest';
import {starter} from './plugins/starter';

export const makeClient = () => ssbClient(manifest).use(starter).callPromise();
