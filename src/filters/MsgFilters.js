export const privateMsgParser = msgs => {
  const authors = new Set(msgs.map(v => v.value.author));
  for (const author of authors) {
  }
  return msgs;
};
