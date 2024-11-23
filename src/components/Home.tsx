import React, { useState, useCallback } from 'react';
import './Home.css';

// Constants for the game
const ROWS = 6;
const COLS = 7;
const EMPTY = 0;
const PLAYER1 = 1;
const PLAYER2 = 2;

interface GameState {
  board: number[][];
  currentPlayer: number;
  winner: number | null;
  isDraw: boolean;
}

export const Home: React.FC = () => {
  // Initialize empty board
  const createEmptyBoard = () => Array(ROWS).fill(null).map(() => Array(COLS).fill(EMPTY));

  // Game state
  const [gameState, setGameState] = useState<GameState>({
    board: createEmptyBoard(),
    currentPlayer: PLAYER1,
    winner: null,
    isDraw: false
  });

  // Check if move is valid
  const isValidMove = (col: number) => {
    return gameState.board[0][col] === EMPTY;
  };

  // Find the lowest empty row in a column
  const findLowestEmptyRow = (col: number) => {
    for (let row = ROWS - 1; row >= 0; row--) {
      if (gameState.board[row][col] === EMPTY) {
        return row;
      }
    }
    return -1;
  };

  // Check for a win
  const checkWin = (row: number, col: number, player: number, newGameBoard: number[][]): boolean => {
    const board = newGameBoard;

    // Check horizontal
    for (let c = 0; c <= COLS - 4; c++) {
      if (board[row][c] === player &&
          board[row][c + 1] === player &&
          board[row][c + 2] === player &&
          board[row][c + 3] === player) {
        return true;
      }
    }

    // Check vertical
    for (let r = 0; r <= ROWS - 4; r++) {
      if (board[r][col] === player &&
          board[r + 1][col] === player &&
          board[r + 2][col] === player &&
          board[r + 3][col] === player) {
        return true;
      }
    }

    // Check diagonal (positive slope)
    for (let r = 3; r < ROWS; r++) {
      for (let c = 0; c <= COLS - 4; c++) {
        if (board[r][c] === player &&
            board[r - 1][c + 1] === player &&
            board[r - 2][c + 2] === player &&
            board[r - 3][c + 3] === player) {
          return true;
        }
      }
    }

    // Check diagonal (negative slope)
    for (let r = 0; r <= ROWS - 4; r++) {
      for (let c = 0; c <= COLS - 4; c++) {
        if (board[r][c] === player &&
            board[r + 1][c + 1] === player &&
            board[r + 2][c + 2] === player &&
            board[r + 3][c + 3] === player) {
          return true;
        }
      }
    }

    return false;
  };

  // Check for a draw
  const checkDraw = (): boolean => {
    return gameState.board[0].every(cell => cell !== EMPTY);
  };

  // Handle player move
  const handleMove = useCallback((col: number) => {
    if (gameState.winner || gameState.isDraw || !isValidMove(col)) {
      return;
    }

    const row = findLowestEmptyRow(col);
    if (row === -1) return;

    const newBoard = gameState.board.map(row => [...row]);
    newBoard[row][col] = gameState.currentPlayer;

    const isWinner = checkWin(row, col, gameState.currentPlayer, newBoard);
    const isDraw = !isWinner && checkDraw();

    setGameState({
      board: newBoard,
      currentPlayer: gameState.currentPlayer === PLAYER1 ? PLAYER2 : PLAYER1,
      winner: isWinner ? gameState.currentPlayer : null,
      isDraw
    });
  }, [gameState]);

  // Reset game
  const resetGame = () => {
    setGameState({
      board: createEmptyBoard(),
      currentPlayer: PLAYER1,
      winner: null,
      isDraw: false
    });
  };

  return (
    <div className="game-container">
      <div className="game-board">
        {gameState.board.map((row, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`cell player${cell}`}
                onClick={() => handleMove(colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="game-info">
        {gameState.winner ? (
          <div>Player {gameState.winner} wins!</div>
        ) : gameState.isDraw ? (
          <div>Game is a draw!</div>
        ) : (
          <div>Current player: {gameState.currentPlayer}</div>
        )}
        <button onClick={resetGame}>Reset Game</button>
      </div>
    </div>
  );
};

export default Home;
