const Player = require("./Player/Player");
require("./Game.css");

const Game = () => {
  const container = document.createElement("div");
  container.classList.add("container");

  const playerBoardContainer = document.createElement("div");
  playerBoardContainer.classList.add("player-board");

  const playerHead = document.createElement("h2");
  playerHead.textContent = "Player";

  const computerMisses = document.createElement("p");
  playerHead.appendChild(computerMisses);

  const pGameBoard = document.createElement("div");
  pGameBoard.classList.add("p-game-board");

  const computerBoardContainer = document.createElement("div");
  computerBoardContainer.classList.add("computer-board");

  const computerHead = document.createElement("h2");
  computerHead.textContent = "Computer";

  const cGameBoard = document.createElement("div");
  cGameBoard.classList.add("c-game-board");

  const players = Player();
  const player = players.player;
  const computer = players.computer;

  const existed = [];
  let gameOver = false;
  let playerTurn = true;

  const gameLoop = () => {
    player.placeShip(3, 0, 1, false);
    player.placeShip(3, 6, 3, true);
    player.placeShip(3, 2, 7, false);

    player.placeShip(4, 3, 0, true);

    const placeComputerShips = () => {
      const lengthOption = [2, 3, 4];
      const lengthIndex = Math.floor(Math.random() * lengthOption.length);
      const length = lengthOption[lengthIndex];

      const vertical = [true, false];
      const index = Math.floor(Math.random() * vertical.length);
      const choice = vertical[index];

      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 10);

      computer.placeShip(length, row, col, choice);
    };

    for (let i = 0; i < 4; i++) {
      placeComputerShips();
    }
  };

  gameLoop();

  const renderPlayerBoard = (playerBoard) => {
    for (let i = 0; i < player.board.length; i++) {
      const rows = document.createElement("div");
      rows.classList.add("row");
      for (let j = 0; j < player.board[i].length; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.id = j;
        cell.dataset.id = i;
        rows.appendChild(cell);

        if (player.board[i][j]) {
          cell.classList.add("ship");
        }
      }
      playerBoard.appendChild(rows);
    }
  };

  const renderComputerBoard = (computerBoard) => {
    for (let i = 0; i < computer.board.length; i++) {
      const rows = document.createElement("div");
      rows.classList.add("row");
      for (let j = 0; j < computer.board[i].length; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.id = j;
        cell.dataset.index = i;
        rows.appendChild(cell);

        cell.addEventListener("click", () => {
          if (playerTurn && !cell.classList.contains("clicked")) {
            playerAttack(cell, i, j);
          }
        });
      }
      computerBoard.appendChild(rows);
    }
  };

  const clearBoard = () => {
    // Clear player's board
    const playerBoard = document.querySelector(".p-game-board");
    playerBoard.innerHTML = "";
    renderPlayerBoard(playerBoard);

    // Clear computer's board
    const computerBoard = document.querySelector(".c-game-board");
    computerBoard.innerHTML = "";
    renderComputerBoard(computerBoard);
  };

  const computerAttack = () => {
    let row, col;

    // Generate random coordinates until finding an unattacked position
    do {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
    } while (existed.some((coord) => coord[0] === row && coord[1] === col));

    if (!gameOver) {
      // Attack player's ships
      players.attackShip(player, row, col);

      // Record the attacked position
      existed.push([row, col]);

      // Update the UI to reflect the attack
      const cells = pGameBoard.querySelectorAll(".cell");
      cells.forEach((cell) => {
        if (cell.dataset.id === row.toString() && cell.id === col.toString()) {
          cell.classList.add("clicked");
          if (player.board[row][col] && player.board[row][col].isSunk()) {
            cell.textContent = "X";
            cell.classList.remove("ship");
            cell.classList.add("hit");
            setTimeout(() => {
              computerAttack();
            }, 1000);
          } else {
            cell.style.backgroundColor = "grey";
            playerTurn = true;
          }
        }
      });
    }
    if (player.allShipSunk()) {
      gameOver = true;
      alert("Computer Won");
      setTimeout(() => {
        clearBoard();
        gameLoop();
      }, 1000);
    }
  };

  const playerAttack = (cell, row, col) => {
    const cells = pGameBoard.querySelectorAll(".cell");
    if (!gameOver) {
      players.attackShip(computer, row, col);
      cell.classList.add("clicked");
      if (computer.board[row][col] && computer.board[row][col].isSunk()) {
        cell.textContent = "X";
        cell.classList.remove("ship");
        cell.classList.add("hit");
      } else {
        cell.style.backgroundColor = "grey";
        playerTurn = false;
        setTimeout(() => {
          computerAttack();
        }, 1000);
      }
    }
    if (computer.allShipSunk()) {
      gameOver = true;
      alert("You Won");
      setTimeout(() => {
        clearBoard();
        gameLoop();
      }, 1000);
    }
  };

  const renderBoards = (() => {
    renderPlayerBoard(pGameBoard);
    renderComputerBoard(cGameBoard);

    playerBoardContainer.appendChild(playerHead);
    playerBoardContainer.appendChild(pGameBoard);
    computerBoardContainer.appendChild(computerHead);
    computerBoardContainer.appendChild(cGameBoard);
    container.appendChild(playerBoardContainer);
    container.appendChild(computerBoardContainer);
    document.body.appendChild(container);
  })()
};

Game();
