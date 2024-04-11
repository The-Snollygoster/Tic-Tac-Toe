const board = (function () {
    const gameBoard = [[0,0,0],[0,0,0],[0,0,0]];
    const getDiag = () => [[gameBoard[0][0], gameBoard[1][1], gameBoard[2][2]], [gameBoard[0][2], gameBoard[1][1], gameBoard[2][0]]];
    const getColumns = () => [[gameBoard[0][0], gameBoard[1][0], gameBoard[2][0]], [gameBoard[0][1], gameBoard[1][1], gameBoard[2][1]], [gameBoard[0][2], gameBoard[1][2], gameBoard[2][2]]];
    const getBoard = () => gameBoard;
    const print = () => console.log(gameBoard);
    
    const pick = (row, column) => {
        if (gameBoard[row][column] === 0) {
            gameBoard[(row)].splice((column), 1, game.getToken());
            if (game.winCheck() === '') {
                render.boardRender();
                game.switchTurn();
            };            
        } else {
            console.log('Space already taken, please choose another!');
        };
        return console.log(gameBoard);
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
    const playRound = () => { return render.boardRender(), console.log(board.print()), console.log(`It is ${activePlayer.name}'s turn.`)};

    const winCheck = () => {
        let winningPlayer = '';
        const winArray = board.getBoard().concat(board.getColumns(),board.getDiag());

        winArray.forEach(function(subarray) {
            if (subarray.every((value) => value === 1)) {
                winningPlayer = 'P1';
            } else if (subarray.every((value) => value === 2)) {
                winningPlayer = 'P2';
            };
        });

        if (winningPlayer == 'P1') {
            console.log(`Congratulations ${players[0].name} has won the game!`);
        } else if (winningPlayer == 'P2') {
            console.log(`Congratulations ${players[1].name} has won the game!`);
        } else {
            console.log('No Winner Yet!');
        };

        return winningPlayer;
    };

    return {playerNameChange, getToken, getActivePlayer, switchTurn, playRound, winCheck};
})();

const render = (function () {
    const container = document.querySelector('.container');
    const reset = document.querySelector('.reset');

    const boardRender = () => {
        container.innerHTML = '';
        container.setAttribute('style', 'opacity: 1;');
        reset.setAttribute('style', 'opacity: 1;')
        board.getBoard().forEach((row, rowIndex) => {
            row.forEach((value, cellIndex) => {
                if (value === 1) {
                    const div = document.createElement('div');
                    div.innerHTML = '<img src="./icons/circle.svg" alt="Circle">';
                    div.classList.add('cell');
                    div.setAttribute('id', `${rowIndex},${cellIndex}`)
                    container.appendChild(div);
                } else if (value === 2) {
                    const div = document.createElement('div');
                    div.innerHTML = '<img src="./icons/x.svg" alt="Cross">';
                    div.classList.add('cell');
                    div.setAttribute('id', `${rowIndex},${cellIndex}`)
                    container.appendChild(div);
                } else {
                    const div = document.createElement('div');
                    div.classList.add('cell');
                    div.setAttribute('id', `${rowIndex},${cellIndex}`)
                    container.appendChild(div);
                };
            });
        });
        const cell = document.querySelectorAll('.cell')
        cell.forEach((square) => {
            square.addEventListener('click', () => {
                let index = square.id.split(',').map((x) => Number(x));
                board.pick(index[0], index[1]);
            });
        });
    };
    return {boardRender};
})();

const playButton = document.querySelector('.play')

playButton.addEventListener('click', () => {
    game.playRound();
});

// board.pick(2,2);
// game.playerNameChange(1, '')
// game.winCheck()
// render.boardRender();