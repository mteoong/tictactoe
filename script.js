
/*------- Close Pop Up ------*/
const popUpContainer = document.querySelector(".pop-up-container");
const closePopUpButton = document.querySelector(".exit");
closePopUpButton.addEventListener("click", closePopUp);

function closePopUp() {
    popUpContainer.classList.add("hide");
}

const playerSymbol = document.querySelector(".choose-player");
const computerSymbol = document.querySelector(".choose-computer");

/*------- Game Objects ------*/
const tiles = Array.from(document.querySelectorAll("div[data-index]"));
for (let tile of tiles) {
    tile.addEventListener("click", play);
}

class gameBoard {
    player = "circle";
    computer = "cross";
    playerArray = [];
    computerArray = [];

    renderBoard() {
        for (let i of this.playerArray) {
            tiles[i].classList.add(this.player);
        }
        for (let i of this.computerArray) {
            tiles[i].classList.add(this.computer);
        }
    }

    switchSymbols(state) {
        if(!state) {
            playerSymbol.classList.remove(this.player);
            computerSymbol.classList.remove(this.computer);
            playerSymbol.classList.add(this.computer);
            computerSymbol.classList.add(this.player);
    
            let temp = this.player;
            this.player = this.computer;
            this.computer = temp;
        } else {
            alert("You can't change your symbol while a game is running.");
        }
    }
}

let myBoard = new gameBoard();

class gameState {
    state = false;
    playing = false;

    constructor(gameBoard) {
        this.gameBoard = gameBoard;
    }

    gameOver() {
        let player = this.gameBoard.playerArray;
        let computer = this.gameBoard.computerArray;

        if (this.checkWin(player)) {
            return "player";
        } else if (this.checkWin(computer)) {
            return "computer";
        } else if (player.length + computer.length === 9) {
            return "draw";
        }
        return null;
    }

    checkWin(array) {
        if (
            this.contains(array, [0, 1, 2]) ||
            this.contains(array, [3, 4, 5]) ||
            this.contains(array, [6, 7, 8]) ||
            this.contains(array, [0, 3, 6]) ||
            this.contains(array, [1, 4, 7]) ||
            this.contains(array, [2, 5, 8]) ||
            this.contains(array, [0, 4, 8]) ||
            this.contains(array, [2, 4, 6])
        ) {
            return true;
        }
        return false;
    }

    contains(array, nums) {
        return nums.every((val) => array.includes(val))
    }
}

let currState = new gameState(myBoard);

function play(e) {
    if (currState.turn) {
        return;
    }
    currState.turn = true;
    let index = parseInt(e.target.dataset.index);
    let playerArray = myBoard.playerArray;
    let computerArray = myBoard.computerArray;
    currState.state = true;

    if(playerArray.includes(index) || computerArray.includes(index)) {
        currState.turn = false;
        return;
    } else {
        playerArray.push(index);
        myBoard.renderBoard();
    }
    if(currState.gameOver()) {
        currState.turn = false;
        endGame(currState.gameOver());
        return;
    }

    let doComputer = () => computerTurn(playerArray, computerArray);

    setTimeout(doComputer, 1000);
}

function computerTurn(playerArray, computerArray) {
    let computerIndex = Math.floor(Math.random() * 9);

    while(playerArray.includes(computerIndex) || computerArray.includes(computerIndex)) {
        computerIndex = Math.floor(Math.random() * 9);
    }
    computerArray.push(computerIndex);
    myBoard.renderBoard();
    if(currState.gameOver()) {
        currState.turn = false;
        endGame(currState.gameOver());
    }
    currState.turn = false;
}

const resultText = document.querySelector("h1.pop-up");

function endGame(result) {
    popUpContainer.classList.remove("hide");
    currState.state = false;
    switch(result) {
        case "player":
            resultText.innerText = "You win!";
            break;
        case "computer":
            resultText.innerText = "You lose!";
            break;
        case "draw":
            resultText.innerText = "It's a draw";
            break;
    }
}

function restart() {
    popUpContainer.classList.add("hide");
    myBoard.playerArray = [];
    myBoard.computerArray = [];
    for (let tile of tiles) {
        tile.classList.remove("circle", "cross");
    }
}

const playAgain = document.querySelector(".play-again");
playAgain.addEventListener("click", restart)
const restartButton = document.querySelector(".restart");
restartButton.addEventListener("click", restart)

playerSymbol.addEventListener("click", doSwitch);
computerSymbol.addEventListener("click", doSwitch);

/* ------- Switch Symbol -------*/
function doSwitch() {
    myBoard.switchSymbols(currState.state);
}

