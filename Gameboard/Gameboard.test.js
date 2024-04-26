const Gameboard = require("./Gameboard");

describe("Gameboard", () => {
  test.skip("Ship is placed", () => {
    const gameBoard = Gameboard();
    expect(gameBoard.placeShip(3, 0, 0)).toBe(true);
  });

  test.skip("This ship has received attack", () => {
    const gameBoard = Gameboard()
    gameBoard.placeShip(3, 0, 0, true);
    gameBoard.receiveAttack(2, 0)
    expect(gameBoard.board[2][0].getHits()).toBe(1)
  });

  test.skip("All ship is sunk", () => {
    const gameBoard = Gameboard()
    gameBoard.placeShip(3, 0, 0, true);
    gameBoard.receiveAttack(2, 0)
    gameBoard.receiveAttack(1, 0)
    gameBoard.receiveAttack(0, 0)
    expect(gameBoard.allShipSunk()).toBe(true)
  })
});
