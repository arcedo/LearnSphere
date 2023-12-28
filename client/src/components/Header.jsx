import React from 'react';
import MyButton from './MyButton';
import Settings from '../assets/img/settings.svg';
import User from '../assets/img/user.svg';

function Header({ onSidebarToggle }) {
  return (
    <header className="w-screen h-20 bg-black flex justify-between items-center py-3 px-5">
      <div className='w-fit flex justify-center items-center gap-4'>
        <MyButton onButtonClick={onSidebarToggle} />
        <h2 className="text-white font-bold text-2xl">Header</h2>
      </div>
      <div className='w-fit flex justify-center items-center gap-4'>
        <img className="w-8 h-8" src={Settings} alt="settings" />
        <img className="w-8 h-8" src={User} alt="user" />
      </div>
    </header>
  );
}

export default Header;
