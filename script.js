const Gameboard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];

    return {
        getBoard: () => board,

        updateBoard: (index, marker) => {
            if (index >= 0 && index < 9 && board[index] === '') {
                board[index] = marker;
                return true;
            }
            return false; // Invalid move
        },

        resetBoard: () => {
            board = ['', '', '', '', '', '', '', '', ''];
        }
    };
})();

const Player = (name, marker) => ({
    getName: () => name,
    getMarker: () => marker,
});

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
        const board = Gameboard.getBoard();
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return true; // Winner found
            }
        }
        return false;
    };

    const checkTie = () => {
        return Gameboard.getBoard().every(cell => cell !== '');
    };

    return { initializeGame, playTurn };
})();
