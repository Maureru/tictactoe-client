import React from 'react';

function Board({ board, handleClickBoard }) {
  return board.map((item, row) => {
    const i = row + 1;
    return item.map((item, col) => {
      return (
        <div
          key={col + row + i}
          onClick={() => handleClickBoard(row, col)}
          className="hover:bg-red-300 text-black hover:shadow-2xl border-2 border-black cursor-pointer w-20 h-20 bg-white rounded-md flex justify-center items-center"
        >
          <h1 className="text-[2.5rem] font-extrabold">{item}</h1>
        </div>
      );
    });
  });
}

export default Board;
