import React from 'react';
import {
  Card,
  Typography,
  List,
  ListItem,
} from "@material-tailwind/react";
import currentProject from "../assets/img/currentProject.svg"
import plus from "../assets/img/plus.svg"
import logout from "../assets/img/logout.svg"

export default function Sidebar({ isOpen, onClose, listContent, selectedItem, onItemClick }) {
  const sidebarClassName = `w-80 z-10 ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`;

  return (
    <div className={sidebarClassName}>
      <Card className="h-full w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 rounded-none bgSidebar white font-montserrat">
        <div className="mb-2 p-4">
          <Typography variant="h5" className='font-sora font-extrabold'>
            LearnSphere
          </Typography>
        </div>
        <List className='white overflow-auto'>
          {listContent.map((item) => (
            <ListItem key={item.id} onClick={() => onItemClick(item)}
              className={`flex items-center justify-between w-10/12 mx-auto text-xl bgListItem ${item.title === 'Add Project' || item.title === 'Log out' ? 'mt-20 font-sora font-bold border-2 border-white justify-center gap-2.5' : 'hover:opacity-80'} ${selectedItem === item.title ? 'bg-white text-black hover:opacity-100' : ''}`}
            >
              {item.title === 'Add Project' ? (<img src={plus} alt='Add a new project' />) : null}
              {item.title === 'Log out' ? (<img src={logout} alt='Log out' />) : null}
              {item.title}
              {item.activeProject ? (<img src={currentProject} alt='Current project' />) : null}
            </ListItem>
          ))}
        </List>
      </Card>
    </div >
  );
}