import React, { useState } from 'react';
import { PiPersonFill } from 'react-icons/pi';
import { motion } from 'framer-motion';
import { developerInfo } from '../data/developerInfo';
import Icon from './Icon';
import { developer } from '../data/appAnimation';

function Developer() {
  const [isDevClick, setIsDevClick] = useState(false);

  const toogleClick = () => {
    setIsDevClick((prev) => !prev);
  };

  return (
    <>
      <div
        onClick={toogleClick}
        className="hover:bg-slate-200 hover:text-black flex gap-2 items-center p-2 z-50 rounded-lg cursor-pointer fixed bottom-2 right-2"
      >
        <h1>
          <PiPersonFill />
        </h1>
        <h3>{developerInfo.name}</h3>
      </div>
      <motion.div
        variants={developer}
        animate={isDevClick ? 'show' : 'hide'}
        className="fixed z-50 bottom-2 left-[50%] -translate-x-[50%] flex gap-4 text-[2rem]"
      >
        {developerInfo.socials.map((item, i) => (
          <a target="_blank" key={i} href={item.link} rel="noreferrer">
            <Icon as={item.icon} />
          </a>
        ))}
      </motion.div>
    </>
  );
}

export default Developer;
