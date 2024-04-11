const board = (function () {
    let gameBoard = [[0,0,0],[0,0,0],[0,0,0]];
    const getDiag = () => [[gameBoard[0][0], gameBoard[1][1], gameBoard[2][2]], [gameBoard[0][2], gameBoard[1][1], gameBoard[2][0]]];
    const getColumns = () => [[gameBoard[0][0], gameBoard[1][0], gameBoard[2][0]], [gameBoard[0][1], gameBoard[1][1], gameBoard[2][1]], [gameBoard[0][2], gameBoard[1][2], gameBoard[2][2]]];
    const getBoard = () => gameBoard;
    const print = () => console.log(gameBoard);
    const resetBoard = () => gameBoard = [[0,0,0],[0,0,0],[0,0,0]];
    
    const pick = (row, column) => {
        if (gameBoard[row][column] === 0) {
            gameBoard[(row)].splice((column), 1, game.getToken());
            let win = game.winCheck()
            if (win === 'P1' || win === 'P2') {
                render.boardRender();
            } else {
                render.boardRender();
                game.switchTurn();
            };
        } else {
            console.log('Space already taken, please choose another!');
        };
        return console.log(gameBoard);
    };

    return {getBoard, print, pick, getDiag, getColumns, resetBoard};
})();

const game = (function () {
    const players = [{name: 'Player One', token: 1}, {name: 'Player Two', token: 2}];
    let activePlayer = players[0];
    const dialog = document.querySelector('dialog');
    const winner = document.getElementById('winner');
    const getActivePlayer = () => console.log(activePlayer.name);
    const getToken = () => activePlayer === players[0] ? players[0].token : players[1].token;
    const switchTurn = () => {activePlayer === players[0] ? activePlayer = players[1] : activePlayer = players[0]; console.log(`It is ${activePlayer.name}'s turn.`)};
    const playRound = () => { return render.boardRender(), console.log(board.print()), console.log(`It is ${activePlayer.name}'s turn.`)};
    const playerNameChange = (playerIndex, name) => {players[playerIndex].name = name, document.getElementById(`${playerIndex}`).textContent = name;}

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
            dialog.showModal();
            winner.textContent = `Congratulations ${players[0].name}, you won!`
        } else if (winningPlayer == 'P2') {
            console.log(`Congratulations ${players[1].name} has won the game!`);
            dialog.showModal();
            winner.textContent = `Congratulations ${players[1].name}, you won!`
        } else {
            console.log('No Winner Yet!');
        };

        return winningPlayer;
    };

    return {playerNameChange, getToken, getActivePlayer, switchTurn, playRound, winCheck};
})();

const render = (function () {
    const container = document.querySelector('.container');

    const boardRender = () => {
        container.innerHTML = '';
        container.setAttribute('style', 'opacity: 1;');
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

const playButton = document.querySelector('.play');
const p1NameChange = document.getElementById('p1');
const p2NameChange = document.getElementById('p2');
const dialog = document.querySelector('dialog');
const newGame = document.querySelector('dialog #newGame');
const closeButton = document.querySelector('dialog #close');

playButton.addEventListener('click', () => {
    board.resetBoard();
    game.playRound();
});

p1NameChange.addEventListener('click', () => {
    let name = prompt('What is player ones name?', '')
    game.playerNameChange(0, `${name}`)
});

p2NameChange.addEventListener('click', () => {
    let name = prompt('What is player twos name?', '')
    game.playerNameChange(1, `${name}`)
});

newGame.addEventListener('click', () => {
    board.resetBoard();
    game.playRound();
    dialog.close();
});

closeButton.addEventListener('click', () => {
    dialog.close();
});