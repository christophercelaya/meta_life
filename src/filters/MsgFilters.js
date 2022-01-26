export const privateMsgParser = msgs => {
  const authors = new Set(msgs.map(v => v.value.author));
  authors;
  return msgs;
};
