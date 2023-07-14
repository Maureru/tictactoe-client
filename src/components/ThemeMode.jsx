import React from 'react';
import { MdDarkMode } from 'react-icons/md';
import { BsSun } from 'react-icons/bs';

function ThemeMode({ isDarkMode, toogleDark }) {
  return (
    <div
      onClick={toogleDark}
      className={`cursor-pointer z-50 fixed top-3 right-5 rounded-md p-2 ${
        isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-300'
      }`}
    >
      {isDarkMode ? <BsSun className="text-white" /> : <MdDarkMode />}
    </div>
  );
}

export default ThemeMode;
