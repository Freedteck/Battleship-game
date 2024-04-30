const Ship = require("../ship/Ship");

const Gameboard = () => {
  const board = Array(10)
    .fill(null)
    .map(() => Array(10).fill(null));
  const missedAttack = [];

  const placeShip = (length, row, col, vertical) => {
    let adjustedRow = row;
    let adjustedCol = col;
    let attempts = 0;

    while (attempts <= 100) { // To prevent infinite loop in case the board is completely filled
      if (vertical && adjustedRow + length > board.length) {
        length = board.length - adjustedRow;
      } else if (!vertical && adjustedCol + length > board[adjustedRow].length) {
        length = board[adjustedRow].length - adjustedCol;
      }

      let occupied = false;
      for (let i = 0; i < length; i++) {
        if (vertical) {
          if (board[adjustedRow + i][adjustedCol] !== null) {
            occupied = true;
            break;
          }
        } else {
          if (board[adjustedRow][adjustedCol + i] !== null) {
            occupied = true;
            break;
          }
        }
      }

      if (!occupied) {
        for (let i = 0; i < length; i++) {
          if (vertical) {
            board[adjustedRow + i][adjustedCol] = Ship(1);
          } else {
            board[adjustedRow][adjustedCol + i] = Ship(1);
          }
        }
        return true;
      }

      // Move to the next available space
      if (vertical) {
        adjustedRow++;
      } else {
        adjustedCol++;
      }

      attempts++;
    }

    return false; // Could not place the ship
  };

  const receiveAttack = (row, col) => {
    const target = board[row][col];
    if (!target || target.isSunk()) {
      missedAttack.push({ row, col });
    } else {
      target.hit();
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
