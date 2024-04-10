const playButton = document.querySelector('.play')
const cell = document.querySelectorAll('.cell')

playButton.addEventListener('click', () => {
    game.playRound();
});

// currently trying to figure out how to add array index to each cell so that when a cell is clicked 
// it corresponds to the correct array index on the board and invokes 'pick' with the correct passed index
// pretty sure I can just use index in the forEach methods in the board render (which is always the second param)
// to log the current index of the cell from the array and gift it to the cell as an ID? and then I'll take that 
// ID contents and use it to pass into board.pick.
cell.forEach(addEventListener('click', () => {
    // board.pick(,);
}));

const board = (function () {
    const gameBoard = [[0,0,0],[0,0,0],[0,0,0]];
    const getDiag = () => [[gameBoard[0][0], gameBoard[1][1], gameBoard[2][2]], [gameBoard[0][2], gameBoard[1][1], gameBoard[2][0]]];
    const getColumns = () => [[gameBoard[0][0], gameBoard[1][0], gameBoard[2][0]], [gameBoard[0][1], gameBoard[1][1], gameBoard[2][1]], [gameBoard[0][2], gameBoard[1][2], gameBoard[2][2]]];
    const getBoard = () => gameBoard;
    const print = () => console.log(gameBoard);
    
    const pick = (row, column) => {
        if (gameBoard[row-1][column-1] === 0) {
            gameBoard[(row-1)].splice((column-1), 1, game.getToken());
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

// This will be my function that renders the game into HTML/DOM.
const render = (function () {
    const container = document.querySelector('.container');
    const reset = document.querySelector('.reset');

    const boardRender = () => {
        container.innerHTML = '';
        container.setAttribute('style', 'opacity: 1;');
        reset.setAttribute('style', 'opacity: 1;')
        board.getBoard().forEach(function(row) {
            row.forEach((value, index) => {
                if (value === 1) {
                    const div = document.createElement('div');
                    div.innerHTML = '<img src="./icons/circle.svg" alt="Circle">';
                    div.classList.add('cell');
                    container.appendChild(div);
                } else if (value === 2) {
                    const div = document.createElement('div');
                    div.innerHTML = '<img src="./icons/x.svg" alt="Cross">';
                    div.classList.add('cell');
                    container.appendChild(div);
                } else {
                    const div = document.createElement('div');
                    div.classList.add('cell');
                    container.appendChild(div);
                };
            });
        });
    };
    return {boardRender};
})();

// board.pick(2,2);
// game.playerNameChange(1, '')
// game.winCheck()
// render.boardRender();