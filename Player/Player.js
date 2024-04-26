const Gameboard = require("../Gameboard/Gameboard");

const Player = () => {
  const player = Gameboard();
  const computer = Gameboard();

  const attackShip = (shipToAttack, row, col) => {
    if (shipToAttack === computer) {
      computer.receiveAttack(row, col);
    } else if (shipToAttack === player) {
      player.receiveAttack(row, col);
    }
  };
  return { player, computer, attackShip };
};

module.exports = Player;
