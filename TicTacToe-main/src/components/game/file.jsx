import React, { useState } from 'react';
import './file.css';

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

function win(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export const TicTacToe = () => {


  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  const handleClick = (index) => {
    if (squares[index] || win(squares)) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[index] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const winner = win(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  
  let statusClassName = "status"; 

  if (winner) {
    statusClassName += " winner-status"; 
  }

  return (
    <div className="main">
      <h1 className="heading">
        TicTac<span className="toe">Toe</span>
      </h1>
      <div className="container">
        <div className="status">{status}</div>
        <div className="board">
          {[0, 1, 2].map((row) => (
            <div key={row} className="board-row">
              {[0, 1, 2].map((col) => (
                <Square className="hello"
                  key={col}
                  value={squares[row * 3 + col]}
                  onClick={() => handleClick(row * 3 + col)}
                />
              ))}
            </div>
          ))}
        </div>
        <button className="reset-btn" onClick={resetGame}>Reset </button>
      </div>
    </div>
  );
};

export default TicTacToe;
