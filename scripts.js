// Gameboard function tracks the X's and O's in the grid
// tracks game state which means if anyone has won or it's a tie
// tracks whos turn it is

const gameBoard = (() =>{
    const gameGrid = ["", "", "", "", "", "", "", "", ""];

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
        gameGrid[a] = playerIcon();
        counter++;
    }

    const playerIcon = () => {
        if (counter % 2 == 0){
            return "O"
        } else {
            return "X"
        }
    }
    return {
        reset,
        checkIndex,
        setIndex,
        playerIcon
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
        messageBox.textContent = `Player ${gameBoard.playerIcon()}'s turn`
    }
    return{
        initialize
    }
})();
displayController.initialize();