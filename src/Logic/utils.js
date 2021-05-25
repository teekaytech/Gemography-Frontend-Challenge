export const daysDiff = (first, second = new Date()) => {
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.round((second - first) / oneDay);
}
