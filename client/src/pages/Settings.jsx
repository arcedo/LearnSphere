import React, { useState } from 'react';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MyButton from '../components/MyButton';

import { getLoggedUser } from '../utils/auth';

export default function Settings() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const pullSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleItemClick = (item) => {
    if (item.title === "Log out") {
        localStorage.removeItem('loggedUser');
        window.location.href = "/";
    }
  };

  var exampleList = [];
  {getLoggedUser().type === 'teacher' ? 
  exampleList = [
    {
      id: 1,
      title: "Account",
    },
    {
      id: 2,
      title: "Students",
    },
    {
      id: 3,
      title: "Skills",
    },
    {
      id: 4,
      title: "Log out",
    }
  ] :
  exampleList = [
    {
      id: 1,
      title: "Account",
    },
    {
      id: 2,
      title: "Log out",
    }
  ]
  }

  return (
    <div>
      <Header title={'Settings'}/>
      <section className="flex w-full h-screen pt-20 text-white bgPrincipal">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} listContent={exampleList} onItemClick={handleItemClick} />
        <MyButton onButtonClick={pullSidebar} />
      </section>
    </div>
  );
}
