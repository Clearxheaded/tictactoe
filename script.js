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

const Player = (name, marker) => {
    return {
        getName: () => name,
        getMarker: () => marker,
    };
};

const GameController = (() => {
    let player1, player2;
    let currentPlayer;
    let gameOver = false;

    const initializeGame = (name1, name2) => {
        player1 = Player(name1, 'X');
        player2 = Player(name2, 'O');
        currentPlayer = player1;
        gameOver = false;
        Gameboard.resetBoard();
    };

    const playTurn = (index) => {
        if (gameOver || !Gameboard.updateBoard(index, currentPlayer.getMarker())) {
            return;
        }

        if (checkWinner()) {
            gameOver = true;
            console.log(`${currentPlayer.getName()} wins!`);
        } else if (checkTie()) {
            gameOver = true;
            console.log("It's a tie!");
        } else {
            switchTurn();
        }
    };

    const switchTurn = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const checkWinner = () => {
        return false;
    };

    const checkTie = () => {
        return Gameboard.getBoard().every(cell => cell !== '');
    };

    return { initializeGame, playTurn };
})();
