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
        updateUI();
    };

    const playTurn = (index) => {
        if (gameOver || !Gameboard.updateBoard(index, currentPlayer.getMarker())) {
            return;
        }

        updateUI();

        if (checkWinner()) {
            gameOver = true;
            document.getElementById('gameStatus').textContent = `${currentPlayer.getName()} wins!`;
            document.getElementById('gameStatus').style.color = currentPlayer.getMarker() === 'X' ? '#FF6B6B' : '#4ECDC4';
        } else if (checkTie()) {
            gameOver = true;
            document.getElementById('gameStatus').textContent = "It's a tie!";
            document.getElementById('gameStatus').style.color = '#333';
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

    const updateUI = () => {
        const cells = document.querySelectorAll('.cell');
        const board = Gameboard.getBoard();

        cells.forEach((cell, index) => {
            cell.textContent = board[index];
            cell.classList.remove('x', 'o');
            if (board[index] === 'X') {
                cell.classList.add('x');
            } else if (board[index] === 'O') {
                cell.classList.add('o');
            }
        });
    };

    return { initializeGame, playTurn };
})();

function startGame() {
    const player1Name = document.getElementById('player1Name').value || 'Player 1';
    const player2Name = document.getElementById('player2Name').value || 'Player 2';

    GameController.initializeGame(player1Name, player2Name);

    document.getElementById('gameStatus').textContent = '';
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
}

document.getElementById('gameBoard').addEventListener('click', (event) => {
    if (event.target.classList.contains('cell')) {
        const index = event.target.getAttribute('data-index');
        GameController.playTurn(parseInt(index));
    }
});