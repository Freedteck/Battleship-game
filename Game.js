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

  const randomize = document.createElement("button");
  randomize.textContent = "Randomize";

  const players = Player();
  const player = players.player;
  const computer = players.computer;

  const existed = [];
  let playerTurn = true;
  randomize.style.display = "none";

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
    // Clear both player's and computer's boards
    for (let i = 0; i < player.board.length; i++) {
      for (let j = 0; j < player.board[i].length; j++) {
        player.board[i][j] = null;
        computer.board[i][j] = null;
      }
    }

    // Reinitialize the game
    gameLoop();

    // Clear and render player's board
    pGameBoard.innerHTML = "";
    renderPlayerBoard(pGameBoard);

    // Clear and render computer's board
    cGameBoard.innerHTML = "";
    renderComputerBoard(cGameBoard);
  };

  const gameOverModal = (player) => {
    const dialogContainer = document.createElement("dialog");
    const dialogText = document.createElement("p");
    dialogText.textContent =
      player === "Computer"
        ? "This is not a joke! The computer WIN!!"
        : "WOW!! Congratulations! You WIn the Challenge";
    const okay = document.createElement("button");
    okay.textContent = "Okay";
    dialogContainer.appendChild(dialogText);
    dialogContainer.appendChild(okay);
    main.appendChild(dialogContainer);

    okay.addEventListener("click", () => {
      setTimeout(() => {
        resetBoard();
      }, 1000);
      dialogContainer.close();
      main.removeChild(dialogContainer);
    });
    return dialogContainer;
  };

  const computerAttack = (row, col) => {
    // let row, col;

    if (!row && !col) {
      // Generate random coordinates until finding an unattacked position
      do {
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 10);
      } while (existed.some((coord) => coord[0] === row && coord[1] === col));
    }

    // if (!gameOver) {
    // Attack player's ships
    players.attackShip(player, row, col);

    // Record the attacked position
    existed.push([row, col]);

    // Update the UI to reflect the attack
    const cells = pGameBoard.querySelectorAll(".cell");
    cells.forEach((cell) => {
      if (cell.dataset.id === row.toString() && cell.id === col.toString()) {
        cell.classList.add("clicked");
        if (
          player.board[row] &&
          player.board[row][col] &&
          player.board[row][col].isSunk()
        ) {
          cell.textContent = "X";
          cell.classList.remove("ship");
          cell.classList.add("hit");
          player.board[row][col] = null;
          playerTurn = false
          if (player.allShipSunk()) {
            playerTurn = true;
            gameOverModal(computerHead.textContent).showModal();
          }
          setTimeout(() => {
            if (row > 0 && row < 9) {
              if (
                player.board[row - 1][col] &&
                !player.board[row - 1][col].isSunk()
              ) {
                computerAttack(row - 1, col);
              } else if (
                player.board[row + 1][col] &&
                !player.board[row + 1][col].isSunk()
              ) {
                computerAttack(row + 1, col);
              } else if (
                player.board[row][col - 1] &&
                !player.board[row][col - 1].isSunk()
              ) {
                computerAttack(row, col - 1);
              } else if (
                player.board[row][col + 1] &&
                !player.board[row][col + 1].isSunk()
              ) {
                computerAttack(row, col + 1);
              } else {
                computerAttack();
              }
            } else {
              computerAttack();
            }
          }, 1000);
        } else {
          cell.style.backgroundColor = "grey";
          playerTurn = true;
          toast.textContent = "Your turn";
        }
      }
    });
  };

  const playerAttack = (cell, row, col) => {
    const cells = pGameBoard.querySelectorAll(".cell");
    // if (!gameOver) {
    players.attackShip(computer, row, col);
    cell.classList.add("clicked");
    if (computer.board[row][col] && computer.board[row][col].isSunk()) {
      cell.textContent = "X";
      cell.classList.remove("ship");
      cell.classList.add("hit");
    } else {
      cell.style.backgroundColor = "grey";
      toast.textContent = "Opponent turn";
      playerTurn = false
      setTimeout(() => {
        computerAttack();
      }, 1000);
    }
    // }
    if (computer.allShipSunk()) {
      playerTurn = true;
      gameOverModal(playerHead.textContent).showModal();
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
    randomize.style.display = "flex";
  }, 1500);

  randomize.addEventListener("click", (e) => {
    console.log(e.target);
    resetBoard();
  });
  main.appendChild(toastContainer);
  main.appendChild(container);
  main.appendChild(randomize);
  document.body.appendChild(main);
};

const createGameModal = () => {
  const modal = document.createElement("div");
  modal.classList.add("modal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const greetings = document.createElement("h1");
  greetings.textContent = "Welcome to Battleship!";
  const rules = document.createElement("p");
  rules.innerHTML = `<ul>
  <li>
  The objective of the game is to sink all of your opponent's ships before
  they sink yours.
</li>
<li>Each player places their ships on their board,</li>
<li>
  And then takes turns attacking the opponent's board by guessing the
  coordinates of their ships.
</li>
</ul>`;

  const startButton = document.createElement("button");
  startButton.textContent = "Start";

  startButton.addEventListener("click", () => {
    modal.style.display = "none"; // Hide modal
    Game(); // Start the game
  });

  modalContent.appendChild(greetings);
  modalContent.appendChild(rules);
  modalContent.appendChild(startButton);
  modal.appendChild(modalContent);

  document.body.appendChild(modal);

  return modal;
};
createGameModal();
