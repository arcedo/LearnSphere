import React from 'react';
import Settings from '../assets/img/settings.svg';
import User from '../assets/img/user.svg';

function Header() {
  return (
    <header className="w-full h-20 fixed bg-black flex justify-between items-center py-3 px-5">
      <div className='w-fit flex justify-center items-center gap-4'>
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
