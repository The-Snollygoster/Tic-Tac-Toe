const board = (function () {
    const board = [[0,0,0],[0,0,0],[0,0,0]];

    const get = () => console.log(board);

    const pick = (row, column) => {board[(row-1)].splice((column-1), 1, players.getToken());
        return console.log(board);
    };

    return {get, pick};
})();

const players = (function () {
    let playerOne = 'Player One';
    let playerTwo = 'Player Two';

    const activePlayer = playerOne;
    console.log(`It is ${activePlayer}'s turn.`)

    let token = 0;
    if (activePlayer === playerOne) {
        token = 1;
    } else if (activePlayer === playerTwo) {
        token = 2;
    };
    const getToken = () => token;

    const getActivePlayer = () => console.log(activePlayer);
    const switchTurn = () => {activePlayer === playerOne ? activePlayer = playerTwo : activePlayer = playerOne;
        console.log(`It is ${activePlayer}'s turn.`)
        };

    return {getToken, getActivePlayer, switchTurn}
})();