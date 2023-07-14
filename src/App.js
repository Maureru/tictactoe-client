import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';
import Cookies from 'js-cookie';
import GameOverPrompt from './components/GameOverPrompt';
import Board from './components/Board';
import RoundCounter from './components/RoundCounter';
import PlayerScore from './components/PlayerScore';
import GameData from './components/GameData';

import { FaGamepad } from 'react-icons/fa';
import { RiFileList3Fill } from 'react-icons/ri';
import ThemeMode from './components/ThemeMode';
import { gameHero, homeHero } from './data/appAnimation';
import InputPlayers from './components/InputPlayers';
import axios from 'axios';
import Developer from './components/Developer';

function App() {
  const [gameDataList, setGameDataList] = useState([]);

  const [isDarkMode, setIsDarkMode] = useState(
    Cookies.get('darkMode')
      ? Cookies.get('darkMode') === 'true'
        ? true
        : false
      : false
  );

  // Toogle DarkMode
  const toogleDark = () => {
    setIsDarkMode((prevMode) => !prevMode);
    Cookies.set('darkMode', !isDarkMode);
  };

  const [board, setBoard] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);

  const resetBoard = () => {
    setBoard([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);

    setCurrentPlayer('X');
  };

  // End the game
  const endGame = async () => {
    // Save session data
    await axios.post(`${process.env.REACT_APP_API_URL}/game`, {
      Round: round,
      PlayerOne: {
        Name: players.PlayerOne.Name,
        Score: players.PlayerOne.Score,
      },
      PlayerTwo: {
        Name: players.PlayerTwo.Name,
        Score: players.PlayerTwo.Score,
      },
    });
  };

  const [players, setPlayers] = useState({
    PlayerOne: {
      value: 'X',
      Name: Cookies.get('playerOne') ? Cookies.get('playerOne') : '',
      Score: 0,
    },
    PlayerTwo: {
      value: 'O',
      Name: Cookies.get('playerTwo') ? Cookies.get('playerTwo') : '',
      Score: 0,
    },
  });

  const resetPlayers = () => {
    Cookies.remove('playerOne');
    Cookies.remove('playerTwo');
    setPlayers({
      PlayerOne: {
        ...players.PlayerOne,
        Name: '',
      },
      PlayerTwo: {
        ...players.PlayerTwo,
        Name: '',
      },
    });
  };

  const resetScore = () => {
    setPlayers({
      PlayerOne: {
        ...players.PlayerOne,
        Score: 0,
      },
      PlayerTwo: {
        ...players.PlayerTwo,
        Score: 0,
      },
    });
  };

  const savePlayers = () => {
    Cookies.set('playerOne', players.PlayerOne.Name);
    Cookies.set('playerTwo', players.PlayerTwo.Name);
  };

  const handlePlayers = (e) => {
    setPlayers({
      ...players,
      [e.target.name]: { ...players[e.target.name], Name: e.target.value },
    });
  };

  const [round, setRound] = useState(1);

  const handleRound = () => {
    setRound((prev) => prev + 1);
  };

  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [scoreUpdater, setScoreUpdater] = useState(1);
  const [winner, setWinner] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameStart, setIsGameStart] = useState(false);
  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);
  const [isModalClick, setIsModalClick] = useState(false);

  const handleModalClick = () => {
    setIsModalClick((prev) => !prev);
  };

  const toogleGameStart = () => {
    setIsGameStart(true);
    setIsPlayerModalOpen((prev) => !prev);
  };

  const toogleGameEnd = () => {
    setIsGameStart(false);
  };

  const toogleModal = () => {
    setIsPlayerModalOpen((prev) => !prev);
  };

  // Update Board
  const handleClickBoard = (row, col) => {
    setBoard((prevBoard) => {
      const updatedBoard = [...prevBoard];
      if (updatedBoard[row][col] === '') {
        updatedBoard[row][col] = currentPlayer;
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      }
      return updatedBoard;
    });
  };

  useEffect(() => {
    const array = async () => {
      await axios.get(`${process.env.REACT_APP_API_URL}/game`).then((res) => {
        setGameDataList(res.data.reverse());
      });
    };

    array();
  }, [isGameStart]);

  /* Check If there is a Winner or Tie */
  useEffect(() => {
    // Checking if Tie
    if (board.flat().every((element) => element !== '')) {
      setWinner('tie');
      setIsGameOver(true);
      setScoreUpdater((prev) => prev + 1);
    }

    // Checking rows
    const rows = board.map((row) => row.join(''));
    const rowWinner = rows.find((row) => row === 'XXX' || row === 'OOO');
    if (rowWinner) {
      setWinner(rowWinner[0]);
      setIsGameOver(true);
      setScoreUpdater((prev) => prev + 1);
    }

    // Checking colums
    const transposedBoard = board[0].map((_, col) =>
      board.map((row) => row[col])
    );
    const column = transposedBoard.map((_, col) =>
      board.map((row) => row[col])
    );
    const columns = column.map((row) => row.join(''));
    const columnWinner = columns.find((col) => col === 'XXX' || col === 'OOO');
    if (columnWinner) {
      console.log(columnWinner);

      setWinner(columnWinner[0]);
      setIsGameOver(true);
      setScoreUpdater((prev) => prev + 1);
    }

    // Checking diagonals
    const diagonal1 = [board[0][0], board[1][1], board[2][2]].join('');
    const diagonal2 = [board[0][2], board[1][1], board[2][0]].join('');
    const diagonalWinner = [diagonal1, diagonal2].find(
      (diagonal) => diagonal === 'XXX' || diagonal === 'OOO'
    );
    if (diagonalWinner) {
      setWinner(diagonalWinner[0]);
      setIsGameOver(true);
      setScoreUpdater((prev) => prev + 1);
    }
  }, [board]);

  //Update the player score
  useEffect(() => {
    if (winner === players.PlayerOne.value) {
      setPlayers((prev) => ({
        ...prev,
        PlayerOne: { ...prev.PlayerOne, Score: prev.PlayerOne.Score + 1 },
      }));
    } else if (winner === players.PlayerTwo.value) {
      setPlayers((prev) => ({
        ...prev,
        PlayerTwo: { ...prev.PlayerTwo, Score: prev.PlayerTwo.Score + 1 },
      }));
    }
  }, [winner, scoreUpdater]);

  return (
    <AnimatePresence>
      <div
        className={`${
          isDarkMode ? 'bg-gray-800 dark' : 'bg-white'
        } h-screen w-screen overflow-hidden flex flex-col justify-center items-center`}
      >
        <Developer />
        <GameData
          isModalClick={isModalClick}
          gameDataList={gameDataList}
          isGameStart={isGameStart}
          setIsModalClick={handleModalClick}
          isDarkMode={isDarkMode}
        />
        {isPlayerModalOpen ? (
          <InputPlayers
            toogleGameStart={toogleGameStart}
            toogleModal={toogleModal}
            players={players}
            handlePlayers={handlePlayers}
            savePlayers={savePlayers}
            resetPlayers={resetPlayers}
            resetScore={resetScore}
          />
        ) : null}
        <PlayerScore
          isGameStart={isGameStart}
          playerOne={players.PlayerOne}
          playerTwo={players.PlayerTwo}
        />
        {isGameOver ? (
          <GameOverPrompt
            winner={winner}
            players={players}
            handleRound={handleRound}
            resetBoard={resetBoard}
            endGame={endGame}
            setIsGameOver={() => setIsGameOver(false)}
            toogleGameEnd={toogleGameEnd}
          />
        ) : null}
        <ThemeMode isDarkMode={isDarkMode} toogleDark={toogleDark} />

        {/* ========= Main Game Screen ========== */}
        <motion.div
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center"
          variants={gameHero}
          animate={isGameStart ? 'show' : 'hide'}
        >
          <div className="flex flex-col gap-2 justify-center items-center">
            <RoundCounter round={round} />
            <h1 className="text-[1.5rem] font-extrabold">Tic Tac Toe</h1>
            <div className="grid grid-cols-3 gap-2">
              <Board board={board} handleClickBoard={handleClickBoard} />
            </div>
          </div>
        </motion.div>

        {/*  ============ Home Screen ====================== */}
        <motion.div
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center"
          variants={homeHero}
          animate={isGameStart ? 'hide' : 'show'}
        >
          <div className="">
            <button
              onClick={() => {
                setIsModalClick((prev) => !prev);
              }}
              className={`p-2 m-auto flex lg:hidden justify-center items-center gap-3 rounded-md bg-gray-600 text-white`}
            >
              Previous Game Data <RiFileList3Fill />
            </button>
            <h1 className="mt-2 text-center font-extrabold">Tic Tac Toe</h1>
            <img
              alt="logo"
              className="w-[300px] md:w-[400px]"
              src={require('./assets/tic.png')}
            />
            <button
              onClick={toogleModal}
              className="hover:scale-105 transition-all w-full mt-2 flex gap-4 justify-center items-center bg-green-500 rounded-md p-2 text-white font-sans uppercase"
            >
              New Game <FaGamepad className="text-xl" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default App;
