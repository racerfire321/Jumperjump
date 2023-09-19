import React from 'react';

export default function WinComponent({ message, onRestart }) {
  return (
    <div className=" bg-blend-overlay p-5">
      <div className="m-10 p-8 justify-center items-center">
        <p className=' font-bold from-indigo-800 to-lime-400'>{message}</p>
        <button onClick={onRestart} className=' bg-amber-900'>Restart Game</button>
      </div>
    </div>
  );
}
