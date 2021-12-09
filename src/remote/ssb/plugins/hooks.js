// SPDX-FileCopyrightText: 2018-2019 The Manyverse Authors
//
// SPDX-License-Identifier: MPL-2.0

export const hooksPlugin = {
  name: 'hooks',
  init: () => {
    return {
      publish: msg => {
        console.info(msg);
      },
      publishStream: console.log,
    };
  },
};
