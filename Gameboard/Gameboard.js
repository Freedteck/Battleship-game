const Ship = require("../ship/Ship");

const Gameboard = () => {
  const board = Array(10)
    .fill(null)
    .map(() => Array(10).fill(null));
  const missedAttack = [];

  const placeShip = (length, row, col, vertical) => {
    if (
      (vertical && row + length > board.length) ||
      (!vertical && col + length > board.length)
    ) {
      return false;
    }

    for (let i = 0; i < length; i++) {
      if (vertical) {
        if (board[row + i][col] !== null) return false; // Cell is occupied
        board[row + i][col] = Ship(1);
      } else {
        if (board[row][col + i] !== null) return false; // Cell is occupied
        board[row][col + i] = Ship(1);
      }
    }
    return true;
  };

  const receiveAttack = (row, col) => {
    const target = board[row][col];
    if (!target || target.isSunk()) {
      missedAttack.push({ row, col });
    } else {
      board[row][col].hit();
    }
  };

  const allShipSunk = () => {
    for (const grid of board) {
      for (const cell of grid) {
        if (cell !== null && !cell.isSunk()) {
          return false;
        }
      }
    }
    return true;
  };

  return { board, placeShip, receiveAttack, allShipSunk, missedAttack };
};

module.exports = Gameboard;
