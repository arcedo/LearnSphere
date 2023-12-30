import React from 'react';
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";

export default function Sidebar({ isOpen, onClose, listContent }) {
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
          <ListItem key={item.id}>
            {item.title}
          </ListItem>
        ))}
      </List>
    </Card>
    </div>
  );
};
