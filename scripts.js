// Gameboard function tracks the X's and O's in the grid
// tracks game state which means if anyone has won or it's a tie
// tracks whos turn it is

const gameBoard = (() =>{
    let gameGrid = ["", "", "", "", "", "", "", "", ""];

    let counter = 1;
    
    const reset = () => {
        for(let i = 0; i<9; i++){
            gameGrid[i] = "";
        };
        counter = 1;
    }

    const checkIndex = (a) => {
        return gameGrid[a];
    }

    const setIndex = (a) => {
        if(! checkWinner()){
            gameGrid[a] = playerIcon();
            if(! checkWinner()){
                counter++;
            }
        }
    }

    const playerIcon = () => {
        if (counter % 2 == 0){
            return "O"
        } else {
            return "X"
        }
    }

    const checkTie = () =>{
        if(counter === 10){
            return true;
        } else {
            return false;
        }
    }
//  for each winning combination
// check if the gameGrid array contains X's at those indexes
    const winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
                                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                                [0, 4, 8], [2, 4, 6]];
    const checkWinner = () => {
        let winnerKnown = false;
        for (let i = 0; i < winningCombinations.length; i++){
            let currentCondition = winningCombinations[i];
            let a = gameGrid[currentCondition[0]];
            let b = gameGrid[currentCondition[1]];
            let c = gameGrid[currentCondition[2]];
            if ( a === b && b === c && a !== "" && b!== "" && c !== ""){
                winnerKnown = true;
                break;
            }
        }
        return winnerKnown;
    }
    return {
        reset,
        checkIndex,
        setIndex,
        playerIcon,
        checkWinner,
        checkTie
    }
})();
// displays the contents of the grid array
// adds events on the grid boxes which allow players to write X's O's, and the restart button
// Controls text content above game grid
// Initializes the game

const displayController = (() =>{
    const displayGrid = () => {
        for (let i = 0; i<9; i++){
            let gridTile = `[data-index='${i}']`;
            document.querySelector(gridTile).textContent = gameBoard.checkIndex(i);
        }
    }
    const playerTurn = (a) => {
        if (gameBoard.checkIndex(a) == ""){
            gameBoard.setIndex(a);
            displayGrid();
            messageHandler();
        }
    }

    const initialize = () => {
        gameBoard.reset();
        displayGrid();
        messageHandler();

        let gridTile = document.querySelectorAll(".game-grid")
        gridTile.forEach(grid => {
            grid.addEventListener("click", () => {
                playerTurn(grid.dataset.index)
            })
        })

        const restartButton = document.querySelector("#restart");
        restartButton.addEventListener("click", ()=>{
            initialize();
        })
    }
    const messageBox = document.querySelector(".game-messages");
    const messageHandler = () => {
        if(gameBoard.checkWinner()){
            messageBox.textContent = `Player ${gameBoard.playerIcon()} has won the game!`
        }
        else if(gameBoard.checkTie()){
            messageBox.textContent = "It's a tie!"
    }   else {
            messageBox.textContent = `Player ${gameBoard.playerIcon()}'s turn`
        }
    }
    return{
        initialize
    }
})();
displayController.initialize();