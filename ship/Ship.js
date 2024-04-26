const Ship = (length) => {
  let hits = 0;

  const hit = () => {
    hits++;
  };
  const isSunk = () => {
    return hits === length;
  };
  const getHits = () => hits

  return { length, getHits, hit, isSunk };
};

module.exports = Ship;
