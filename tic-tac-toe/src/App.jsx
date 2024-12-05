import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const PLAYERS = { X : 'Player 1', O : 'Player 2' };

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function derivedGameBoard(gameTurns) {

  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for(const turn of gameTurns) {
  
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function derivedWinner(gameBoard, players) {

  let winner = null;

  for(const combination of WINNING_COMBINATIONS) {

    const firstSquare = gameBoard[combination[0].row][combination[0].column];
    const secondSquare = gameBoard[combination[1].row][combination[1].column];
    const thirdSquare = gameBoard[combination[2].row][combination[2].column];

    if(firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare) {
      winner = players[firstSquare];
    }
  }

  return winner;
}

function derivedActivePlayer(gameTurns) {

  let currentPlayer = 'X';

  if(gameTurns.length && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function App() {
  
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);

  const activePlayer = derivedActivePlayer(gameTurns);

  const gameBoard = derivedGameBoard(gameTurns);

  const winner = derivedWinner(gameBoard, players);

  const hasDraw = gameTurns.length === 9 && !winner;

  function handlePlayerChange(rowIndex, colIndex) {

    setGameTurns((prevGameTurns) => {

      let currentPlayer = derivedActivePlayer(prevGameTurns);

      const updatedGameTurns = [{ square: {row: rowIndex, col: colIndex}, player: currentPlayer},...prevGameTurns];

      return updatedGameTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return { ...prevPlayers, [symbol]: newName };
    });
  }

  return (
    <main>

      <div id="game-container">
        
        <ol id="players" className="highlight-player">

          <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} onNameChange={handlePlayerNameChange}/>
          
          <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} onNameChange={handlePlayerNameChange}/>
        </ol>
        
        { (winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}></GameOver> }

        <GameBoard onSelectSquare={handlePlayerChange} board={gameBoard}></GameBoard>
      </div>
      
      <Log turns={gameTurns}></Log>
    </main>
  )
}

export default App
