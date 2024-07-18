import { useState } from "react";
import "../Styles/TicTacToe.css";

const GridValues = Object.freeze({
  X: "X",
  O: "O",
  None: null,
});

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={() => onSquareClick()}>
      {value}
    </button>
  );
}

function GridRow({ startIndex, squares, onSquareClick }) {
  if (squares === null) {
    return <div> No Value </div>;
  }
  const row = squares
    ? squares
        .slice(startIndex, startIndex + 3)
        .map((val, i) => (
          <Square
            key={i + startIndex}
            value={val}
            onSquareClick={() => onSquareClick(i + startIndex)}
          />
        ))
    : null;
  return <div className="gridRow">{row}</div>;
}

function Board({ squares, onPlay, moveNum }) {
  function handleClick(index) {
    if (squares[index] || calculateWinner(squares)) {
      return;
    }
    let turnSymbol = moveNum % 2 === 0 ? GridValues.X : GridValues.O;

    const newSquares = squares.slice();
    newSquares[index] = turnSymbol;
    onPlay(newSquares);
  }

  return (
    <div className="ticTacToeBoard">
      <GridRow startIndex={0} squares={squares} onSquareClick={handleClick} />
      <GridRow startIndex={3} squares={squares} onSquareClick={handleClick} />
      <GridRow startIndex={6} squares={squares} onSquareClick={handleClick} />
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function isTie(squares) {
  let ret = true;
  squares.forEach((el, _) => {
    if (!el) {
      ret = false;
    }
  });
  return ret;
}

function calculateStatus(setStatus, moveNum, nextSquares) {
  const winner = calculateWinner(nextSquares);
  if (winner) {
    setStatus("Winner: " + winner);
  } else if (isTie(nextSquares)) {
    setStatus("Tie Game");
  } else {
    let nextPlayer = moveNum % 2 === 0 ? "X" : "O";
    setStatus("Next player: " + nextPlayer);
  }
}

export default function TicTacToe() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [moveNum, setMoveNum] = useState(0);
  const [status, setStatus] = useState("Next player: X");
  const currentSquares = history[moveNum];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, moveNum + 1), nextSquares];
    setHistory(nextHistory);
    setMoveNum(nextHistory.length - 1);
    calculateStatus(setStatus, moveNum + 1, nextSquares);
  }

  function changeHistory(direction) {
    if (moveNum + direction < 0 || moveNum + direction >= history.length) {
      return;
    }
    calculateStatus(
      setStatus,
      moveNum + direction,
      history[moveNum + direction]
    );
    setMoveNum(moveNum + direction);
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="ticTacToeBoardContainer">
        <Board squares={currentSquares} onPlay={handlePlay} moveNum={moveNum} />
      </div>
      <div className="history">
        <button disabled={moveNum === 0} onClick={() => changeHistory(-1)}>
          Backward
        </button>
        <button
          disabled={moveNum + 1 >= history.length}
          onClick={() => changeHistory(1)}
        >
          Forward
        </button>
      </div>
    </>
  );
}
