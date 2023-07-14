import React from 'react';
import { motion } from 'framer-motion';
import { playerScore } from '../data/appAnimation';

function PlayerScore({ playerOne, playerTwo, isGameStart }) {
  return (
    <motion.div
      variants={playerScore}
      animate={isGameStart ? 'show' : 'hide'}
      className="fixed flex items-center gap-1 top-14 text-base left-5 font-semibold"
    >
      <div className="w-8 flex justify-center">
        <h1 className="-rotate-90 uppercase text-[1rem]">Scores</h1>
      </div>
      <div>
        <h1>
          {playerOne.Name}: {playerOne.Score}
        </h1>
        <h1 className="mt-2">
          {playerTwo.Name}: {playerTwo.Score}
        </h1>
      </div>
    </motion.div>
  );
}

export default PlayerScore;
