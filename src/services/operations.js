export const intersectionArrays = (ar1, ar2) => {
  return ar1.filter(function(a) {
    return true === this.has(a.id);
  }, ar2.reduce((hash, b) => hash.add(b.id), new Set()));
};