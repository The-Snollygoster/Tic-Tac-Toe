// Factory function to make a game board

function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    // Creates a row as an empty array inside board. Then fills each row with a cell per column.
    // So I would end up with an array (board) with 3 'row' arrays inside, each with 3 cells inside.
    for (let i=0; i<rows; i++) {
        board[i] = [];
        for (let j =0; j<columns; j++) {
            board[i].push(Cell());
        };
    };

    // This is supposedly for our UI to render the board at some point.
    const getBoard = () => board;

    // I think this is the function that will take in which cell was picked and by which player
    // and add their token to it.
    const pickCell = (row, column, player) => {
        board[row][column].addToken(player);
    };

    // This will print the board to the console so I can actually see what's going on
    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
    };

    // This returns our object and our methods to use on it.
    return {getBoard, pickCell, printBoard};
};

// Another factory that creates a Cell object with a starting (closed) value of 0 but with a
// method that will allow me to change the cells value to that of either players value (1 or 2).
function Cell() {
    let value = 0;

    const addToken = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {addToken, getValue};
};

// Factory to create the controller. Responsible for controlling the flow and state of the game turns
// as well as a winner.
function GameController(playerOneName = 'Player One', playerTwoName = 'Player Two') {
    const board = Gameboard();

    const players = [{name: playerOneName, token: 1}, {name: playerTwoName, token: 2}];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`)
    };

    const playRound = (row, column) => {
        console.log(`${getActivePlayer().name} picked row ${row}, column ${column}...`)

        board.pickCell(row, column, getActivePlayer().token);

        switchPlayerTurn();
        printNewRound();
    };
    printNewRound();

    return {playRound, getActivePlayer};
};

const game = GameController();