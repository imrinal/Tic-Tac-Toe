const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const resetButton = document.querySelector('.reset');
const gif = document.querySelector('.gif img');
const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let xTurn;
let gameActive;

startGame();

resetButton.addEventListener('click', startGame);

function startGame() {
    xTurn = true;
    gameActive = true;
    gif.style.display = 'none';
    cells.forEach(cell => {
        cell.textContent = ''; // Clear the cell content
        cell.style.color = ''; // Reset the color
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setStatusText();
}

function handleClick(e) {
    if (!gameActive) return;
    const cell = e.target;
    const currentClass = xTurn ? X_CLASS : O_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setStatusText();
    }
}

function placeMark(cell, currentClass) {
    cell.textContent = currentClass.toUpperCase();
    cell.style.color = currentClass === X_CLASS ? '#bd4631' : '#1c5685';
}

function swapTurns() {
    xTurn = !xTurn;
}

function setStatusText() {
    statusText.textContent = `Player ${xTurn ? 'X' : 'O'}'s turn`;
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentClass.toUpperCase();
        });
    });
}

function endGame(draw) {
    gameActive = false;
    if (draw) {
        statusText.textContent = "Draw!";
    } else {
        statusText.textContent = `Player ${xTurn ? 'X' : 'O'} Wins!`;
        gif.style.display = 'block';
    }
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.textContent === 'X' || cell.textContent === 'O';
    });
}