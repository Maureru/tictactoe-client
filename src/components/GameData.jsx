import React from 'react';
import { motion } from 'framer-motion';
import { gameData, gameDataMobile } from '../data/appAnimation';
import { IoMdClose } from 'react-icons/io';

function GameData({
  isGameStart,
  gameDataList,
  isModalClick,
  setIsModalClick,
  isDarkMode,
}) {
  return (
    <>
      <motion.div
        variants={gameData}
        animate={isGameStart ? 'hide' : 'show'}
        className="lg:flex z-40 hidden flex-col justify-center items-center fixed p-2 top-5 left-5 rounded-md w-[320px] h-[400px] shadow-xl bg-black bg-opacity-25"
      >
        <h2 className="text-center font-bold uppercase">Game Data</h2>
        <div className="customScrollBar grow w-full overflow-y-auto">
          {gameDataList.map((item, i) => (
            <div key={i} className="p-2 text-sm flex items-center gap-4">
              <h3>
                {item.Round} ROUND{item.Round > 1 ? 'S' : null} |{' '}
              </h3>
              <h3 className="font-bold">
                {item.PlayerOne.Name}{' '}
                <span
                  className={
                    item.PlayerOne.Score > item.PlayerTwo.Score
                      ? 'text-green-600'
                      : item.PlayerOne.Score === item.PlayerTwo.Score
                      ? 'text-slate-500'
                      : 'text-red-500'
                  }
                >
                  {item.PlayerOne.Score}
                </span>{' '}
                -{' '}
                <span
                  className={
                    item.PlayerTwo.Score > item.PlayerOne.Score
                      ? 'text-green-600'
                      : item.PlayerOne.Score === item.PlayerTwo.Score
                      ? 'text-slate-500'
                      : 'text-red-500'
                  }
                >
                  {item.PlayerTwo.Score}
                </span>{' '}
                {item.PlayerTwo.Name}
              </h3>
            </div>
          ))}
        </div>
        <div className="h-5 w-full flex justify-end items-center">
          <p className="italic text-[8px]">*Previous matches</p>
        </div>
      </motion.div>

      {/* ==============> For Mobile <==================== */}
      {isModalClick ? (
        <div className="w-full h-full bg-black bg-opacity-60 flex justify-center items-center">
          <motion.div
            variants={gameDataMobile}
            animate={isModalClick ? 'show' : 'hide'}
            className={`flex relative z-40 lg:hidden flex-col justify-center items-center  p-2  rounded-md w-[300px] h-[400px] shadow-xl ${
              isDarkMode ? 'bg-gray-900' : 'bg-gray-200'
            }`}
          >
            <h1
              onClick={setIsModalClick}
              className="absolute cursor-pointer top-2 right-4 "
            >
              <IoMdClose />
            </h1>
            <h2 className="text-center font-bold uppercase">Game Data</h2>
            <div className="customScrollBar grow w-full overflow-y-auto">
              {gameDataList.map((item, i) => (
                <div key={i} className="p-2 text-sm flex items-center gap-4">
                  <h3>
                    {item.Round} ROUND{item.Round > 1 ? 'S' : null} |{' '}
                  </h3>
                  <h3 className="font-bold">
                    {item.PlayerOne.Name}{' '}
                    <span
                      className={
                        item.PlayerOne.Score > item.PlayerTwo.Score
                          ? 'text-green-600'
                          : item.PlayerOne.Score === item.PlayerTwo.Score
                          ? 'text-slate-500'
                          : 'text-red-500'
                      }
                    >
                      {item.PlayerOne.Score}
                    </span>{' '}
                    -{' '}
                    <span
                      className={
                        item.PlayerTwo.Score > item.PlayerOne.Score
                          ? 'text-green-600'
                          : item.PlayerOne.Score === item.PlayerTwo.Score
                          ? 'text-slate-500'
                          : 'text-red-500'
                      }
                    >
                      {item.PlayerTwo.Score}
                    </span>{' '}
                    {item.PlayerTwo.Name}
                  </h3>
                </div>
              ))}
            </div>
            <div className="h-5 w-full flex justify-end items-center">
              <p className="italic text-[8px]">*Previous matches</p>
            </div>
          </motion.div>
        </div>
      ) : null}
    </>
  );
}

export default GameData;
