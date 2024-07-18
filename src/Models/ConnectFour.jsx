import { useState } from "react";
import "../Styles/ConnectFour.css";

const GridValues = Object.freeze({
  Red: "redButton",
  Black: "blackButton",
  None: "freeButton",
});

function checkHorizontal(board) {
  for (let row = 0; row < 6; row++) {
    let currVal = null;
    let count = 0;
    for (let col = 0; col < 7; col++) {
      let val = board[row + col * 6];
      if (val && val === currVal) {
        count++;
        if (count === 4) {
          return true;
        }
      } else {
        currVal = val;
        count = 1;
      }
    }
  }
  return false;
}

function checkVertical(board) {
  for (let col = 0; col < 7; col++) {
    let currVal = null;
    let count = 0;
    for (let row = 0; row < 6; row++) {
      let val = board[row + col * 6];
      if (val && val === currVal) {
        count++;
        if (count === 4) {
          return true;
        }
      } else {
        currVal = val;
        count = 1;
      }
    }
  }
  return false;
}

function checkUpperDiagonal(board) {
  const startPos = [0, 1, 2, 3, 4, 5, 11, 17, 23, 29, 35, 41];
  const startSet = new Set(startPos);
  let ret = false;
  startPos.forEach((el, _) => {
    let curr = el;
    let currVal = null;
    let count = 0;
    console.log();
    do {
      console.log(curr);
      let val = board[curr];
      if (val && val === currVal) {
        count++;
        if (count === 4) {
          ret = true;
        }
      } else {
        currVal = val;
        count = 1;
      }
      curr = curr + 6 - 1;
    } while (curr < 42 && !(curr in startSet) && !ret);
  });
  return ret;
}

function checkLowerDiagonal(board) {
  const startPos = [0, 1, 2, 3, 4, 5, 6, 12, 18, 24, 30, 36];
  const startSet = new Set(startPos);
  let ret = false;
  startPos.forEach((el, _) => {
    let curr = el;
    let currVal = null;
    let count = 0;
    console.log();
    do {
      console.log(curr);
      let val = board[curr];
      if (val && val === currVal) {
        count++;
        if (count === 4) {
          ret = true;
        }
      } else {
        currVal = val;
        count = 1;
      }
      curr = curr + 7;
    } while (curr < 42 && !(curr in startSet) && !ret);
  });
  return ret;
}

function isWinner(board) {
  return (
    checkHorizontal(board) ||
    checkVertical(board) ||
    checkUpperDiagonal(board) ||
    checkLowerDiagonal(board)
  );
}

function Square({ onColumnClick, value }) {
  return (
    <div className="connectFourSquare">
      <button
        className={value ? value : GridValues.None}
        onClick={() => onColumnClick()}
      />
    </div>
  );
}

function GridColumn({ columnValues, startIndex, onColumnClick }) {
  const column = columnValues
    ? columnValues
        .slice(startIndex, startIndex + 6)
        .map((val, i) => (
          <Square
            key={i + startIndex}
            value={val}
            onColumnClick={() => onColumnClick(startIndex)}
          />
        ))
    : null;
  return <div className="gridCol">{column}</div>;
}

function Board({ currentBoard, handlePlay, nextVal }) {
  function handleColumnClick(startIndex) {
    if (isWinner(currentBoard)) {
      return;
    }

    const newBoard = currentBoard.slice();
    let hasSpace = false;
    for (let i = startIndex + 5; i >= startIndex; i--) {
      if (!newBoard[i]) {
        newBoard[i] = nextVal;
        hasSpace = true;
        break;
      }
    }
    if (!hasSpace) {
      return;
    }

    handlePlay(newBoard);
  }

  const columns = [];
  for (let i = 0; i < 7; i++) {
    columns.push(
      <GridColumn
        key={i}
        columnValues={currentBoard}
        startIndex={i * 6}
        onColumnClick={handleColumnClick}
      />
    );
  }
  return <div className="connectFourBoard">{columns}</div>;
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

function calculateStatus(setStatus, currentBoard, moveNum) {
  console.log("HI");
  if (isWinner(currentBoard)) {
    let winner = (moveNum + 1) % 2 === 0 ? "Red" : "Black";
    setStatus("Winner: " + winner);
  } else if (isTie(currentBoard)) {
    setStatus("Tie Game");
  } else {
    let nextPlayer = moveNum % 2 === 0 ? "Red" : "Black";
    setStatus("Next player: " + nextPlayer);
  }
}

export default function ConnectFour() {
  const [history, setHistory] = useState([Array(42).fill(null)]);
  const [moveNum, setMoveNum] = useState(0);
  const [status, setStatus] = useState("Next player: Red");
  const currentBoard = history[moveNum];
  const nextVal = moveNum % 2 === 0 ? GridValues.Red : GridValues.Black;
  function handlePlay(newBoard) {
    setHistory([...history.slice(0, moveNum + 1), newBoard]);
    calculateStatus(setStatus, newBoard, moveNum + 1);
    setMoveNum(moveNum + 1);
  }
  function changeHistory(direction) {
    if (moveNum + direction < 0 || moveNum + direction >= history.length) {
      return;
    }
    calculateStatus(
      setStatus,
      history[moveNum + direction],
      moveNum + direction
    );
    setMoveNum(moveNum + direction);
  }

  return (
    <div>
      <div>{status}</div>
      <Board
        currentBoard={currentBoard}
        handlePlay={handlePlay}
        nextVal={nextVal}
      />
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
    </div>
  );
}
