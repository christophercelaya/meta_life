import {Callback} from 'pull-stream';
import QuickLRU from 'quick-lru';

interface Output {
  name?: string;
  image?: string;
  description?: string;
}

export const cachedAboutSelf = {
  name: 'cachedAboutSelf',
  version: '1.0.0',
  manifest: {
    invalidate: 'sync',
    getNameAndImage: 'async',
  },
  permissions: {
    master: {
      allow: ['invalidate', 'get'],
    },
  },

  init: (ssb: any) => {
    const DUNBAR = 150;
    const cache = new QuickLRU({maxSize: DUNBAR});

    function isValid(out: Output | undefined) {
      if (!out) {
        return false;
      }
      return !(!out.name && !out.image);
    }

    return {
      invalidate(id) {
        cache.delete(id);
      },

      get(id, cb: Callback<Output>) {
        if (cache.has(id)) {
          cb(null, cache.get(id));
        } else {
          ssb.aboutSelf.get(id, (err: any, out: Output) => {
            if (!err && isValid(out)) {
              cache.set(id, out);
            }
            cb(err, out);
          });
        }
      },
    };
  },
};
