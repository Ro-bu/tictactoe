// Gameboard function tracks the X's and O's in the grid
// tracks game state which means if anyone has won or it's a tie

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

const displayController = (() =>{
    const displayGrid = () => {
        for (let i = 0; i<9; i++){
            let gridTile = `[data-index='${i}']`;
            document.querySelector(gridTile).textContent = gameBoard.checkIndex();
        }
    }
    return{
        displayGrid
    }


})();