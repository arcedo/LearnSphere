import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MyButton from '../components/MyButton';
import { getLoggedUser } from '../utils/auth';
import AccountSettings from '../components/AccountSettings';
import StudentsSettings from '../components/StudentsSettings';
import SkillsSettings from '../components/SkillsSettings';

export default function Settings() {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  const exampleList = getLoggedUser().type === 'teacher'
    ? [
        { id: 1, title: "Account" },
        { id: 2, title: "Students" },
        { id: 3, title: "Skills" },
        { id: 4, title: "Log out" },
      ]
    : [
        { id: 1, title: "Account" },
        { id: 2, title: "Log out" },
      ];

  useEffect(() => {
    const defaultItem = "Account";
    setSelectedItem(defaultItem);
  }, []);

  const pullSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item.title);
    if (item.title === "Log out") {
      localStorage.removeItem('loggedUser');
      navigate("/login");
    }
  };

  return (
    <div>
      <Header title={'Settings'} />
      <section className="flex w-full h-screen pt-20 text-white bgPrincipal">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} listContent={exampleList} selectedItem={selectedItem} onItemClick={handleItemClick} />
        <MyButton onButtonClick={pullSidebar} />
        <div className="settings-content w-11/12 mx-auto pl-5 pr-10 py-10 overflow-auto">
          {selectedItem === "Account" && <AccountSettings />}
          {selectedItem === "Students" && <StudentsSettings />}
          {selectedItem === "Skills" && <SkillsSettings />}
        </div>
      </section>
    </div>
  );
}