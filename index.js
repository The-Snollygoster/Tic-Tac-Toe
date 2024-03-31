// Ok. I'm using a factory function to create an object that holds the board as well as methods I can us on the board.
// I've also wrapped the factory in an IIFE to stop it from being called again.
(function Gameboard() {
    const board = [[0,0,0],[0,0,0],[0,0,0]];
    console.log(board);

    // Now I need functions that operate on this board
    
})();