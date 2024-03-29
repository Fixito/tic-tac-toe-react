import { useState } from 'react';
import Board from './Board.jsx';

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const [isSorted, setIsSorted] = useState(false);

  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
  };

  const sortMoves = () => {
    setIsSorted(!isSorted);
  };

  const moves = history.map((_squares, move) => {
    let description = null;

    if (move === history.length - 1) {
      description = 'You are at move #' + move;
      return <li key={move}>{description}</li>;
    }

    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className='game'>
      <div className='game-board'>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className='game-info'>
        <button style={{ marginInlineStart: '40px' }} onClick={sortMoves}>
          Sort {isSorted ? 'ascending' : 'descending'}
        </button>
        <ol>{isSorted ? moves.toReversed() : moves}</ol>
      </div>
    </div>
  );
};

export default Game;
