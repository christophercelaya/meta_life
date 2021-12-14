// SPDX-FileCopyrightText: 2018-2019 The Manyverse Authors
//
// SPDX-License-Identifier: MPL-2.0
import xs from 'xstream';

export const hooksPlugin = {
  name: 'hooks',
  init: () => {
    const stream = xs.create();
    return {
      publish: msg => {
        console.info(msg);
      },
      publishStream: () => stream,
    };
  },
};
