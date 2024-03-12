// game.ts
enum Player {
    X = 'X',
    O = 'O',
}

let board: (Player | null)[][];
let currentPlayer: Player;

function startGame() {
    board = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];
    currentPlayer = Player.X;
    drawBoard();
}

function drawBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const rowElement = document.createElement('div');
        rowElement.className = 'row';
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement('div');
            cell.innerText = board[i][j] || '';
            cell.className = 'cell';
            cell.addEventListener('click', () => handleCellClick(i, j));
            rowElement.appendChild(cell);
        }
        boardElement.appendChild(rowElement);
    }
}

function handleCellClick(row: number, col: number) {
    if (board[row][col] === null) {
        board[row][col] = currentPlayer;
        currentPlayer = currentPlayer === Player.X ? Player.O : Player.X;
        drawBoard();
        if (checkWin()) {
            setTimeout(startGame, 1000);
        }
    }
}

function checkWin(): boolean {
    for (let i = 0; i < 3; i++) {
        if (board[i][0] !== null && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
            return true;
        }
        if (board[0][i] !== null && board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
            return true;
        }
    }
    if (board[0][0] !== null && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
        return true;
    }
    if (board[0][2] !== null && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
        return true;
    }
    return false;
}

startGame();
