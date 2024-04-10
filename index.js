const board = (function () {
    const gameBoard = [[0,0,0],[0,0,0],[0,0,0]];
    const getDiag = () => [[gameBoard[0][0], gameBoard[1][1], gameBoard[2][2]], [gameBoard[0][2], gameBoard[1][1], gameBoard[2][0]]];
    const getColumns = () => [[gameBoard[0][0], gameBoard[1][0], gameBoard[2][0]], [gameBoard[0][1], gameBoard[1][1], gameBoard[2][1]], [gameBoard[0][2], gameBoard[1][2], gameBoard[2][2]]];
    const getBoard = () => gameBoard;
    const print = () => console.log(gameBoard);
    
    const pick = (row, column) => {
        if (gameBoard[row-1][column-1] === 0) {
            gameBoard[(row-1)].splice((column-1), 1, game.getToken());
            // game.winCheck();
            game.switchTurn();
        } else {
            console.log('Space already taken, please choose another!');
        };
        return console.log(gameBoard)
    };

    return {getBoard, print, pick, getDiag, getColumns};
})();

const game = (function () {
    const players = [{name: 'Player One', token: 1}, {name: 'Player Two', token: 2}];
    let activePlayer = players[0];
    const getActivePlayer = () => console.log(activePlayer.name);
    const playerNameChange = (playerIndex, name) => players[(playerIndex-1)].name = name;
    const getToken = () => activePlayer === players[0] ? players[0].token : players[1].token;
    const switchTurn = () => {activePlayer === players[0] ? activePlayer = players[1] : activePlayer = players[0]; console.log(`It is ${activePlayer.name}'s turn.`)};
    const playRound = () => { return console.log(board.print()), console.log(`It is ${activePlayer.name}'s turn.`)};

    const winCheck = () => {
        const winArray = board.getBoard().concat(board.getColumns(),board.getDiag())

        winArray.forEach(function(subarray) {
            if (subarray.every((value) => value === 1)) {
                return console.log(`We have a winner! Congratulations ${players[0].name}`)
            } else if (subarray.every((value) => value === 2)) {
                return console.log(`We have a winner! Congratulations ${players[1].name}`)
            }
        });
    };

    return {playerNameChange, getToken, getActivePlayer, switchTurn, playRound, winCheck}
})();

// This will be my function that renders the game into HTML/DOM.
const render = (function () {

})();

game.playRound();
// board.pick(2,2);
// game.playerNameChange(1, '')
// game.winCheck()