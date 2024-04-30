const Player = require("./Player/Player");
require("./Game.css");

const Game = () => {
  const main = document.createElement("main");

  const container = document.createElement("div");
  container.classList.add("container");

  const toastContainer = document.createElement("div");
  toastContainer.classList.add("toast-container");

  const toast = document.createElement("p");
  toast.classList.add("toast");

  toast.textContent = "Waiting...";
  toastContainer.appendChild(toast);
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

  const randomize = document.createElement('button')
  randomize.textContent = 'Randomize'

  const players = Player();
  const player = players.player;
  const computer = players.computer;

  const existed = [];
  let gameOver = false;
  let playerTurn = true;

  randomize.style.display = gameOver ? 'none' : 'block'

  const gameLoop = () => {
    const placePlayerShips = () => {
      const lengthOption = [2, 3, 4];
      const lengthIndex = Math.floor(Math.random() * lengthOption.length);
      const length = lengthOption[lengthIndex];

      const vertical = [true, false];
      const index = Math.floor(Math.random() * vertical.length);
      const choice = vertical[index];

      let row, col;
      do {
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 10);
      } while (player.board[row][col]);
      player.placeShip(length, row, col, choice);
    };

    const placeComputerShips = () => {
      const lengthOption = [2, 3, 4];
      const lengthIndex = Math.floor(Math.random() * lengthOption.length);
      const length = lengthOption[lengthIndex];

      const vertical = [true, false];
      const index = Math.floor(Math.random() * vertical.length);
      const choice = vertical[index];

      let row, col;
      do {
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 10);
      } while (computer.board[row][col]);
      computer.placeShip(length, row, col, choice);
    };

    for (let i = 0; i < 4; i++) {
      placeComputerShips();
      placePlayerShips();
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

  const resetBoard = () => {

    for (let i = 0; i < player.board.length; i++) {
      for (let j = 0; j < player.board[i].length; j++) {

        if (player.board[i][j]) {
          player.board[i][j] = null
        }
      }
    }

    for (let i = 0; i < computer.board.length; i++) {
      for (let j = 0; j < computer.board[i].length; j++) {

        if (computer.board[i][j]) {
          computer.board[i][j] = null
        }
      }
    }

    gameLoop()
    // Clear player's board
    gameOver = false;
    pGameBoard.innerHTML = "";
    renderPlayerBoard(pGameBoard);

    cGameBoard.innerHTML = "";
    renderComputerBoard(cGameBoard);
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
            toast.textContent = "Your turn";
          }
        }
      });
    }
    if (player.allShipSunk()) {
      gameOver = true;
      alert("Computer Won");
      setTimeout(() => {
        resetBoard();
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
        toast.textContent = "Opponent turn";
        setTimeout(() => {
          computerAttack();
        }, 1000);
      }
    }
    if (computer.allShipSunk()) {
      gameOver = true;
      alert("You Won");
      playerTurn = true;
      setTimeout(() => {
        resetBoard();
      }, 1000);
    }
  };

  setTimeout(() => {
    const renderBoards = (() => {
      renderPlayerBoard(pGameBoard);
      renderComputerBoard(cGameBoard);

      playerBoardContainer.appendChild(playerHead);
      playerBoardContainer.appendChild(pGameBoard);
      computerBoardContainer.appendChild(computerHead);
      computerBoardContainer.appendChild(cGameBoard);
      container.appendChild(playerBoardContainer);
      container.appendChild(computerBoardContainer);
      toast.textContent = "Your turn";
    })();
  }, 1500);

  randomize.addEventListener('click', (e) => {
    console.log(e.target);
    resetBoard()
  })
  main.appendChild(toastContainer);
  main.appendChild(container);
  main.appendChild(randomize);
  document.body.appendChild(main);
};

Game();
