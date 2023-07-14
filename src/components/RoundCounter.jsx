import React from 'react';

function RoundCounter({ round }) {
  return (
    <div className="">
      <h1 className="font-semibold">
        Round: <span>{round}</span>
      </h1>
    </div>
  );
}

export default RoundCounter;
