// Ok. I'm using a factory function to create an object that holds the board as well as methods I can us on the board.
// I've also wrapped the factory in an IIFE so it isn't global or reusable.
const board = (function () {
    const board = [[0,0,0],[0,0,0],[0,0,0]];
    // console.log(board);

    const playerToken = 1;

    const get = () => console.log(board);

    const pick = (row, column) => board[(row-1)].splice((column-1), 1, playerToken);

    return {get, pick};
})();

// const playerOne = '1';
// const playerTwo = '2';

// function Players() {

// };
// I'll need players and a way of discerning who's turn it is and switching turns, also a 'game controller' 