import React, { useState, useEffect } from 'react';
import Settings from '../assets/img/settings.svg';
import User from '../assets/img/user.svg';

const MyButton = ({ onButtonClick }) => {
  const [isHovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleClick = (event) => {
    // Stop the propagation of the click event
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
            <div className={`h-5 w-1 rounded-tl-full rounded-tr-full rounded-br-full bg-white ${isHovered ? 'rotate-hover-1' : 'rotate-unhover-1'}`}></div>
            <div className={`h-5 w-1 rounded-bl-full rounded-br-full rounded-tr-full bg-white ${isHovered ? 'rotate-hover-2' : 'rotate-unhover-2'}`}></div>
          </div>
        </div>
      </span>
    </button>
  );
};

const Sidebar = ({ isOpen, onClose }) => {
  const sidebarClassName = `sidebar absolute h-screen w-80 bgSidebar text-white z-20 ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`;

  return (
    <div className={sidebarClassName}>
      <div className='flex items-center justify-center gap-5'>
        <div>
          <h1 className="text-white font-bold text-2xl">LearnSphere</h1>

        </div>
        <MyButton onButtonClick={onClose} />
      </div>
    </div>
  );
};

function Header() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const pullSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isSidebarOpen && !event.target.closest('.sidebar')) {
        closeSidebar();
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isSidebarOpen]);

  return (
    <div>
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <header className="w-screen h-20 bg-black flex justify-between items-center py-3 px-5">
        <div className='w-fit flex justify-center items-center gap-4'>
          <MyButton onButtonClick={pullSidebar} />
          <h2 className="text-white font-bold text-2xl">Header</h2>
        </div>
        <div className='w-fit flex justify-center items-center gap-4'>
          <img className="w-8 h-8" src={Settings} alt="settings" />
          <img className="w-8 h-8" src={User} alt="user" />
        </div>
      </header>
    </div>
  );
}

export default Header;
