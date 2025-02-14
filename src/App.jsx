import React, { useState } from 'react';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(square => square !== null);

  const getGameStatus = () => {
    if (winner) {
      return (
        <div className="text-2xl font-bold text-green-500">
          Player {winner} Wins!
        </div>
      );
    }
    if (isDraw) {
      return (
        <div className="text-2xl font-bold text-yellow-500">
          It's a Draw!
        </div>
      );
    }
    return (
      <div className="text-xl text-blue-500">
        Next Player: <span className="font-bold">{xIsNext ? 'X' : 'O'}</span>
      </div>
    );
  };

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;
    
    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const Square = ({ value, onClick }) => (
    <button 
      className="w-16 h-16 border-2 border-blue-500 text-2xl font-bold bg-black text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      onClick={onClick}
    >
      {value}
    </button>
  );

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-black border-2 border-blue-500 rounded-lg shadow-[0_0_50px_rgba(59,130,246,0.5)] p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-center text-white mb-2">Tic Tac Toe</h1>
          <div className="text-center">{getGameStatus()}</div>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-3 w-fit mx-auto mb-4">
            {board.map((square, index) => (
              <Square 
                key={index}
                value={square}
                onClick={() => handleClick(index)}
              />
            ))}
          </div>
          
          <button 
            onClick={resetGame}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Reset Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;