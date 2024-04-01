const board = (function () {
    const gameBoard = [[1,2,3],[4,5,6],[7,8,9]];
    const getBoard = () => gameBoard;
    const print = () => console.log(gameBoard);
    const cell = (row, column) => {return gameBoard[row-1][column-1]};
    
    const pick = (row, column) => {
        if (cell(row,column) === 0) {
            gameBoard[(row-1)].splice((column-1), 1, game.getToken());
            game.switchTurn();
        } else {
            console.log('Space already taken, please choose another!');
        }
        return console.log(gameBoard)
    };

    return {getBoard, print, pick, cell};
})();

// I then need to add a win condition and checking after each pick

const game = (function () {
    const players = [{name: 'Player One', token: 'X', winArray: []}, {name: 'Player Two', token: 'O', winArray: []}];
    let activePlayer = players[0];
    const getActivePlayer = () => console.log(activePlayer.name);
    const playerNameChange = (playerIndex, name) => players[(playerIndex-1)].name = name;

    const getToken = () => {
        if (activePlayer === players[0]) {
            return players[0].token;
        } else if (activePlayer === players[1]) {
            return players[1].token;
        }
    };

    const switchTurn = () => {activePlayer === players[0] ? activePlayer = players[1] : activePlayer = players[0];
        console.log(`It is ${activePlayer.name}'s turn.`)
        };

    const playRound = () => { return console.log(board.print()), console.log(`It is ${activePlayer.name}'s turn.`)};

    function sameCheck (value) {
        return value === 1;
    };

    const winCheck = () => {
        let current = board.getBoard();
        if (current[1].every(sameCheck)) {
            console.log('We have a winner!')
        } else {
            console.log('No winner yet')
        }
    };

    return {playerNameChange, getToken, getActivePlayer, switchTurn, playRound, winCheck}
})();

// This will be my function that renders the game into HTML/DOM.
const render = (function () {

})();

// board.pick(2,2);
// game.playerNameChange(1, '')

// I could number every cell on the board. Then take the spliced number from the pick function and push it into an array each player has. Then, check if the 
// combination of numbers the player has equals one of the winning combination of cells.