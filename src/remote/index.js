import xs from 'xstream';

export const ssb = ssbP =>
  xs
    .fromPromise(ssbP)
    .compose(stream => xs.merge(stream, xs.never()))
    .remember();
