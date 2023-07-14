import React from 'react';
import { motion } from 'framer-motion';
import { playersModal } from '../data/appAnimation';
import { IoMdClose } from 'react-icons/io';
import Cookies from 'js-cookie';

function InputPlayers({
  toogleModal,
  toogleGameStart,
  players,
  handlePlayers,
  savePlayers,
  resetPlayers,
  resetScore,
}) {
  return (
    <div className="z-10 text-black w-screen h-screen fixed flex justify-center items-center bg-black bg-opacity-50">
      {Cookies.get('playerOne') && Cookies.get('playerTwo') ? (
        <motion.div
          variants={playersModal}
          initial="initial"
          animate="animate"
          exit="initial"
          className="flex relative min-w-[350px] shadow-xl flex-col py-4 px-4 rounded-md bg-white bg-opacity-90"
        >
          <h1
            onClick={toogleModal}
            className="absolute top-2 right-2 cursor-pointer"
          >
            <IoMdClose />
          </h1>
          <h1 className="text-center">Game Players</h1>
          <div className="flex gap-2 mt-2 justify-between items-center">
            <div>
              <h2>
                <span className="font-bold">PLAYER X: </span>
                {players.PlayerOne.Name}
              </h2>
              <h2>
                <span className="font-bold">PLAYER O: </span>
                {players.PlayerTwo.Name}
              </h2>
            </div>
            <div className="">
              <button
                onClick={resetPlayers}
                className="bg-orange-700 p-2 text-white rounded-lg w-full h-full"
              >
                CHANGE PLAYERS
              </button>
            </div>
          </div>
          <button
            onClick={() => {
              if (players.PlayerOne.Name && players.PlayerTwo.Name) {
                toogleGameStart();
                savePlayers();
                resetScore();
              } else {
                console.log('Enter both players');
              }
            }}
            className="bg-green-600 mt-4 rounded-lg text-white uppercase p-2"
          >
            Start
          </button>
        </motion.div>
      ) : (
        <motion.div
          variants={playersModal}
          initial="initial"
          animate="animate"
          exit="initial"
          className="flex relative min-w-[350px] shadow-xl flex-col py-4 px-4 rounded-md bg-white bg-opacity-90"
        >
          <h1
            onClick={toogleModal}
            className="absolute top-2 right-2 cursor-pointer"
          >
            <IoMdClose />
          </h1>
          <h1 className="text-center">Enter Player Names</h1>
          <div className="flex mt-3 items-end gap-2">
            <input
              name="PlayerOne"
              onChange={handlePlayers}
              placeholder="Player X"
              className="grow bg-transparent p-1 outline-none border-b-2 border-gray-400"
            />
          </div>
          <div className="flex mt-3 items-end gap-2">
            <input
              name="PlayerTwo"
              onChange={handlePlayers}
              placeholder="Player O"
              className="grow bg-transparent p-1 outline-none border-b-2 border-gray-400"
            />
          </div>
          <h1
            onClick={() => {
              if (players.PlayerOne.Name && players.PlayerTwo.Name) {
                toogleGameStart();
                savePlayers();
              } else {
                console.log('Enter both players');
              }
            }}
            className="uppercase text-center font-bold mt-4 text-green-700 cursor-pointer"
          >
            Start
          </h1>
        </motion.div>
      )}
    </div>
  );
}

export default InputPlayers;
