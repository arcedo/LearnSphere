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
          <svg className='logo' xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 125 136.29991015954744">
            <defs id="SvgjsDefs2063"></defs>
            <g id="SvgjsG2064" featurekey="symbolFeature-0"
              transform="matrix(1.709775787074475,0,0,1.709775787074475,-23.268339038499487,-17.491005519098636)">
              <g xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd"
                  d="M80.11,49.695c0.003,5.951,1.481,10.771,3.303,10.771   c1.823,0,3.302-4.824,3.305-10.768c-0.003-5.951-1.479-10.773-3.303-10.773C81.591,38.926,80.107,43.748,80.11,49.695z"></path>
                <path fillRule="evenodd" clipRule="evenodd"
                  d="M39.138,14.154c-15.075,6.26-25.529,19.93-25.529,35.779   c-0.004,15.852,10.454,29.52,25.536,35.777C30.504,78.232,24.764,65,24.764,49.934S30.508,21.637,39.138,14.154z"></path>
                <path fillRule="evenodd" clipRule="evenodd"
                  d="M49.349,10.23c-7.066,0-12.803,17.854-12.803,39.857   c0,22.016,5.736,39.859,12.808,39.861c3.491-0.002,6.66-4.367,8.969-11.438c1.954,4.756,4.414,7.598,7.084,7.598   c6.367,0.002,11.532-16.066,11.527-35.883c0.005-19.816-5.156-35.887-11.521-35.879c-2.651,0-5.093,2.797-7.041,7.484   C56.057,14.668,52.871,10.234,49.349,10.23z M75.225,50.227c0.005,11.121-2.764,20.143-6.174,20.143   c-3.412,0-6.176-9.023-6.176-20.139c0-11.127,2.764-20.146,6.176-20.15C72.465,30.084,75.229,39.102,75.225,50.227z M57.792,23.318   c-2.395,6.576-3.907,16.191-3.907,26.908c-0.001,10.623,1.484,20.166,3.841,26.736c-1.15,1.559-2.418,2.424-3.748,2.424   c-5.202-0.004-9.414-13.117-9.414-29.299c0-16.174,4.212-29.293,9.407-29.293C55.333,20.797,56.626,21.701,57.792,23.318z"></path>
              </g>
            </g>
            <g id="SvgjsG2065" featurekey="nameFeature-0" transform="matrix(1,0,0,1,145,68)" >
              <path d=""></path>
            </g>
          </svg>
        </Link>
        <h2 className="text-white font-sora font-bold text-2xl">/ {title}</h2>
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
