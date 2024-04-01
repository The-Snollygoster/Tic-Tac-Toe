const board = (function () {
    const board = [[0,0,0],[0,0,0],[0,0,0]];

    const print = () => console.log(board);

    const cellValue = (row, column) => {return board[row-1][column-1]};
    
    const pick = (row, column) => {board[(row-1)].splice((column-1), 1, players.getToken());
        return console.log(board), players.switchTurn();
    };

    return {print, pick, cellValue};
})();

// I need to add the logic to pick that you cannot pick an already selected cell

// I then need to add a win condition and checking after each pick

const players = (function () {
    let playerOne = 'Player One';
    let playerTwo = 'Player Two';
    let token = 0;
    let activePlayer = playerOne;

    console.log(`It is ${activePlayer}'s turn.`)

    const getToken = () => {if (activePlayer === playerOne) {
        token = 1;
    } else if (activePlayer === playerTwo) {
        token = 2;
    }
    return token};
    // this getToken might be moved to gameController together with a getValue function

    const getActivePlayer = () => console.log(activePlayer);
    const switchTurn = () => {activePlayer === playerOne ? activePlayer = playerTwo : activePlayer = playerOne;
        console.log(`It is ${activePlayer}'s turn.`)
        };

    return {getToken, getActivePlayer, switchTurn}
})();

// board.pick(2,2);