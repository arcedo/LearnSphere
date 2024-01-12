import React from 'react';
import Settings from '../assets/img/settings.svg';
import User from '../assets/img/user.svg';
import logo from '../assets/img/logo.svg';
import { Link } from 'react-router-dom';

import { getLoggedUser } from '../utils/auth';

function Header({ title }) {
  return (
    <header className="w-full h-20 z-20 fixed border-b-2 border-gray-700 bg-black flex justify-between items-center py-3 px-5">
      <div className='w-fit flex justify-center items-center gap-4'>
        <Link to='/' >
          <img src={logo} alt="" />
        </Link>
        <h2 className="text-white font-sora font-bold text-2xl">{title}</h2>
      </div>
      <div className='w-fit flex justify-center items-center gap-4'>
        {getLoggedUser().type === 'student' ?
          <Link to='/profile'>
            <img className="w-8 h-8" src={User} alt="user" />
          </Link> : ''}
        <Link to='/settings'>
          <img className="w-8 h-8" src={Settings} alt="settings" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
