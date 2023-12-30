import React from 'react';
import Settings from '../assets/img/settings.svg';
import User from '../assets/img/user.svg';
import logo from '../assets/img/logo.svg';
import { Link } from 'react-router-dom';

function Header({title}) {
  return (
    <header className="w-full h-20 fixed bg-black flex justify-between items-center py-3 px-5">
      <Link to='/' className='w-fit flex justify-center items-center gap-4'>
        <img src={logo} alt="" />
        <h2 className="text-white font-sora font-bold text-2xl">{title}</h2>
      </Link>
      <div className='w-fit flex justify-center items-center gap-4'>
        <Link to='/settings'>
          <img className="w-8 h-8" src={Settings} alt="settings" />
        </Link>
        <Link to='/account'>
          <img className="w-8 h-8" src={User} alt="user" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
