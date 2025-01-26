const Gameboard = (() => {
    // Private variable to store the gameboard state
    let board = ['', '', '', '', '', '', '', '', ''];

    return {
        getBoard: () => board,

        updateBoard: (index, marker) => {
            if (index >= 0 && index < 9 && board[index] === '') {
                board[index] = marker;
                return true;
            }
            return false; // For invalid move
        },

        // Reset the board for a new game
        resetBoard: () => {
            board = ['', '', '', '', '', '', '', '', ''];
        }
    };
})();

