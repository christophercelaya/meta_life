import xs from 'xstream';

export default function ssb(actions) {
  const startConn$ = actions.initializationDone$
    .take(1)
    .map(() => ({type: 'conn.start'}));

  return xs.merge(startConn$);
}
