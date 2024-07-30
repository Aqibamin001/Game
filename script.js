document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('play-button');
    const resetButton = document.getElementById('reset-button');
    const quitButton = document.getElementById('quit-button');
    const newGameButton = document.getElementById('new-game-button');
    const welcomeScreen = document.getElementById('welcome-screen');
    const gameBoard = document.getElementById('game-board');
    const resultScreen = document.getElementById('result-screen');
    const resultMessage = document.getElementById('result-message');
    const cells = document.querySelectorAll('.cell');
    let currentPlayer = 'X';
    let board = Array(9).fill(null);

    playButton.addEventListener('click', () => {
        welcomeScreen.classList.add('hidden');
        gameBoard.classList.remove('hidden');
    });

    resetButton.addEventListener('click', resetGame);
    quitButton.addEventListener('click', quitGame);
    newGameButton.addEventListener('click', startNewGame);

    cells.forEach(cell => {
        cell.addEventListener('click', () => handleCellClick(cell));
    });

    function handleCellClick(cell) {
        const index = cell.getAttribute('data-index');
        if (!board[index] && !checkWinner()) {
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;
            if (checkWinner()) {
                showResultScreen(`Player ${currentPlayer} wins!`);
            } else if (board.every(cell => cell)) {
                showResultScreen('Draw!');
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return board[a] && board[a] === board[b] && board[a] === board[c];
        });
    }

    function resetGame() {
        board.fill(null);
        cells.forEach(cell => (cell.textContent = ''));
        currentPlayer = 'X';
    }

    function quitGame() {
        resetGame();
        gameBoard.classList.add('hidden');
        welcomeScreen.classList.remove('hidden');
    }

    function showResultScreen(message) {
        gameBoard.classList.add('hidden');
        resultMessage.textContent = message;
        resultScreen.classList.remove('hidden');
    }

    function startNewGame() {
        resetGame();
        resultScreen.classList.add('hidden');
        welcomeScreen.classList.remove('hidden');
    }
});
