import React, { useState } from 'react';
import MyButton from '../components/MyButton';
import Header from '../components/Header';
import Skills from '../components/Skills';
import Sidebar from '../components/Sidebar';

function isLogged() {
  return localStorage.getItem('loggedUser') ? true : false;
}

function Home() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const pullSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  if (!isLogged()) {
    window.location.href = "/login";
  }

  return (
    <div>
      <Header onSidebarToggle={pullSidebar} />
      <section id="home" className="w-full h-full text-white">
      <MyButton onButtonClick={onSidebarToggle} />
        <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className='w-10/12 mx-auto'>
          <h4 className='font-sora text-4xl font-extrabold'>Project1</h4>
          <div className='flex items-center gap-3 flex-wrap w-1/2'>
            <Skills skillName='HTML' globalPercentage='50%' />
            <Skills skillName='HTML' globalPercentage='50%' />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
