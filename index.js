const Board = (function () {
    const board = [[0,0,0],[0,0,0],[0,0,0]];
    const getBoard = () => board;
    const print = () => console.log(board);
    const cell = (row, column) => {return board[row-1][column-1]};
    
    const pick = (row, column) => 
        {if (cell(row,column) === 0) {
            board[(row-1)].splice((column-1), 1, Controller.getToken());
            Controller.switchTurn();
        } else {
            console.log('Space already taken, please choose another!');
        }
        return console.log(board)
    };

    return {getBoard, print, pick, cell};
})();

// I need to add the logic to pick that you cannot pick an already selected cell

// I then need to add a win condition and checking after each pick

const Controller = (function () {
    const players = [{name: 'Player One', token: 1}, {name: 'Player Two', token: 2}];
    let activePlayer = players[0];

    console.log(`It is ${activePlayer.name}'s turn.`)

    const getToken = () => 
        {if (activePlayer === players[0]) {
            return players[0].token;
        } else if (activePlayer === players[1]) {
            return players[1].token;
        }
    };

    const getActivePlayer = () => console.log(activePlayer.name);

    const switchTurn = () => {activePlayer === players[0] ? activePlayer = players[1] : activePlayer = players[0];
        console.log(`It is ${activePlayer.name}'s turn.`)
        };

    return {getToken, getActivePlayer, switchTurn}
})();

// Board.pick(2,2);