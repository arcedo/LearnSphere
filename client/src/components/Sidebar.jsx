import React from 'react';
import {
  Card,
  Typography,
  List,
  ListItem,
} from "@material-tailwind/react";
import currentProject from "../assets/img/currentProject.svg"

export default function Sidebar({ isOpen, onClose, listContent, selectedItem, onItemClick }) {
  const sidebarClassName = `w-80 z-20 ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`;

  return (
    <div className={sidebarClassName}>
      <Card className="h-full w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 rounded-none bgSidebar white">
        <div className="mb-2 p-4">
          <Typography variant="h5" className='font-sora font-extrabold'>
            LearnSphere
          </Typography>
        </div>
        <List className='white'>
          {listContent.map((item) => (
            <ListItem key={item.id} onClick={() => onItemClick(item)} className={`${selectedItem === item.title ? 'bg-white text-black' : ''} flex items-center justify-between w-10/12 mx-auto text-xl bgListItem`} >
              {item.title}
              {item.activeProject ? (<img src={currentProject} alt='Current project' />) : null}
            </ListItem>
          ))}
        </List>
      </Card>
    </div >
  );
}