import React from 'react';

function GameOverPrompt({
  winner,
  resetBoard,
  setIsGameOver,
  players,
  endGame,
  handleRound,
  toogleGameEnd,
}) {
  return (
    /*====================== Prompt if there is a winner and tie ========= */
    <div className="z-10 text-black w-screen h-screen fixed flex justify-center items-center bg-black bg-opacity-25">
      <div className="flex w-[300px] md:w-[400px] shadow-xl h-[250px] flex-col justify-around items-center py-4 px-12 rounded-md bg-white">
        <h1 className="font-extrabold ">Round Over!</h1>
        {winner === 'X' || winner === 'O' ? (
          <div>
            <h1>
              {winner === 'X' ? players.PlayerOne.Name : players.PlayerTwo.Name}{' '}
              ({winner})
            </h1>
            <h2 className="text-center">WINS!</h2>
          </div>
        ) : winner === 'tie' ? (
          <h1>DRAW</h1>
        ) : null}
        <div className="flex justify-center items-center gap-3">
          <h2
            onClick={() => {
              setIsGameOver();
              handleRound();
              resetBoard();
            }}
            className="p-3 uppercase text-green-500 cursor-pointer"
          >
            Continue
          </h2>
          <h2
            onClick={() => {
              setIsGameOver();
              resetBoard();
              endGame();
              toogleGameEnd();
            }}
            className="uppercase cursor-pointer"
          >
            Stop
          </h2>
        </div>
      </div>
    </div>
  );
}

export default GameOverPrompt;
