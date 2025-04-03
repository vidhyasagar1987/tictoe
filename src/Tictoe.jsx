import { useEffect, useState } from "react";
import pattern from "./pattern";

function Tictoe() {
  const initialBoard = new Array(9).fill("");

  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [lastMoveIndex, setLastMoveIndex] = useState(-1);
  const [winner, setWinner] = useState(null);

  function handlePlayerMove(index) {
    if (board[index] !== "" || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setLastMoveIndex(index);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }

  const resetGame = () => {
    setBoard(initialBoard);
    setCurrentPlayer("X");
    setLastMoveIndex(-1);
    setWinner(null);
  };

  useEffect(() => {
    if (lastMoveIndex < 0) return;

    const winningPatterns = pattern[lastMoveIndex];
    const prevPlayer = currentPlayer === "X" ? "O" : "X";

    for (const winPattern of winningPatterns) {
      const [a, b, c] = winPattern;
      console.log(a);
      if (
        board[a] === prevPlayer &&
        board[b] === prevPlayer &&
        board[c] === prevPlayer
      ) {
        setWinner(prevPlayer);
        return;
      }
    }
  }, [board]);

  return (
    <div className="game-container">
      <h2>
        {winner ? `${winner} Wins! 🎉` : `Current Player: ${currentPlayer}`}
      </h2>
      <div className="board">
        {board.map((item, index) => (
          <div
            key={index}
            className={`board_tile ${item ? "filled" : ""} ${
              winner ? "disabled" : ""
            }`}
            onClick={() => handlePlayerMove(index)}
          >
            {item}
          </div>
        ))}
      </div>
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
}

export default Tictoe;
