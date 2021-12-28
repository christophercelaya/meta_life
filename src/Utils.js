export const friendParser = graph => {
  if (graph == undefined) {
    return [[], []];
  }
  let fArr = [],
    bArr = [];
  Object.keys(graph).forEach(k =>
    graph[k] > 0 ? fArr.push(k) : graph[k] == -1 && bArr.push(k),
  );
  return [fArr, bArr];
};
