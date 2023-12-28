import React from 'react';
import MyButton from './MyButton';

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

export default Sidebar;
