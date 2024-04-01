const board = (function () {
    const gameBoard = [[0,0,0],[0,0,0],[0,0,0]];
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

    return {getBoard, print, pick};
})();

const game = (function () {
    const players = [{name: 'Player One', token: 1}, {name: 'Player Two', token: 2}];
    let activePlayer = players[0];
    const getActivePlayer = () => console.log(activePlayer.name);
    const playerNameChange = (playerIndex, name) => players[(playerIndex-1)].name = name;
    const getToken = () => activePlayer === players[0] ? players[0].token : players[1].token;
    const switchTurn = () => {activePlayer === players[0] ? activePlayer = players[1] : activePlayer = players[0]; console.log(`It is ${activePlayer.name}'s turn.`)};
    const playRound = () => { return console.log(board.print()), console.log(`It is ${activePlayer.name}'s turn.`)};

    // Win Checking (only checked for winning rows so far)
    const winCheck = () => {
        let current = board.getBoard();
        if (current[0].every((value) => value === 1) || current[1].every((value) => value === 1) || current[2].every((value) => value === 1)) {
            console.log(`We have a winner! Congratulations ${players[0].name}`)
        } else if (current[0].every((value) => value === 2) || current[1].every((value) => value === 2) || current[2].every((value) => value === 2)) {
            console.log(`We have a winner! Congratulations ${players[1].name}`)
        } else {
            console.log('No winner yet!')
        };
    };

    return {playerNameChange, getToken, getActivePlayer, switchTurn, playRound, winCheck}
})();

game.playRound();

// This will be my function that renders the game into HTML/DOM.
const render = (function () {

})();

// board.pick(2,2);
// game.playerNameChange(1, '')
// game.winCheck()