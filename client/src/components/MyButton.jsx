import React, { useState } from 'react';

const MyButton = ({ onButtonClick }) => {
  const [isHovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleClick = (event) => {
    event.stopPropagation();
    onButtonClick();
  };

  return (
    <button onClick={handleClick}>
      <span
        className=""
        data-state="closed"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex items-center justify-center" style={{ opacity: 1 }}>
          <div className="flex h-6 w-6 flex-col items-center">
            <div className={`h-5 w-1 rounded-tl-full rounded-tr-full rounded-br-full bg-red-800 ${isHovered ? 'rotate-hover-1' : 'rotate-unhover-1'}`}></div>
            <div className={`h-5 w-1 rounded-bl-full rounded-br-full rounded-tr-full bg-red-800 ${isHovered ? 'rotate-hover-2' : 'rotate-unhover-2'}`}></div>
          </div>
        </div>
      </span>
    </button>
  );
};

export default MyButton;
