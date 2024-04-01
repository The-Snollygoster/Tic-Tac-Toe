const board = (function () {
    const gameBoard = [[0,0,0],[0,0,0],[0,0,0]];
    const getBoard = () => gameBoard;
    const print = () => console.log(gameBoard);
    const cell = (row, column) => {return gameBoard[row-1][column-1]};
    
    const pick = (row, column) => 
        {if (cell(row,column) === 0) {
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
    const players = [{name: 'Player One', token: 1}, {name: 'Player Two', token: 2}];
    let activePlayer = players[0];

    const playerNameChange = (playerIndex, name) => players[(playerIndex-1)].name = name;

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

    const playRound = () => { return console.log(board.print()), console.log(`It is ${activePlayer.name}'s turn.`)};

    return {playerNameChange, getToken, getActivePlayer, switchTurn, playRound}
})();

// board.pick(2,2);
// game.playerNameChange(1, '')