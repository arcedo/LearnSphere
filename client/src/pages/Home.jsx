import React, { useState } from 'react';
import MyButton from '../components/MyButton';
import Header from '../components/Header';
import Skills from '../components/Skills';
import Sidebar from '../components/Sidebar';
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";

import { getLoggedUser } from '../utils/auth';

function Home() {

    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const pullSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const [open, setOpen] = useState(1);
    const handleOpen = (value) => setOpen(open === value ? 0 : value);


    const exampleList = [
        {
            id: 1,
            title: "Project 1",
        },
        {
            id: 2,
            title: "Project 2",
        },
        {
            id: 3,
            title: "Project 3",
        },
        {
            id: 4,
            title: "Project 4",
        },
        {
            id: 5,
            title: "Project 5",
        }
    ]
    return (
        <div> 
        <Header title={'Home'}/>
        <section className="flex w-full h-screen pt-20 text-white bgPrincipal">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} listContent={exampleList} />
            <MyButton onButtonClick={pullSidebar} />
            <div className='w-11/12 mx-auto pl-5 pr-10 py-10'>
                <div className='flex items-center gap-4'>
                    <h4 className='font-sora text-4xl font-extrabold'>Project1</h4>
                </div>
                <div className='flex items-center gap-3 flex-wrap w-1/2 pt-5 pb-5'>
                    <Skills skillName='HTML' globalPercentage='50%' />
                    <Skills skillName='HTML' globalPercentage='50%' />
                </div>
                <Accordion  open={open === 1} className='border-2 border-white rounded-2xl px-5'>
                    <AccordionHeader id='accordion' onClick={() => handleOpen(1)} className='py-5 border-none flex justify-between items-center text-white hover:text-gray-200'>
                        <div className='flex items-center gap-2.5'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 24 24">
                                <path fill="#fefefe" d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6z"/>
                            </svg>
                            <h5 className='text-3xl'>Activitat 1</h5>
                        </div>
                        <div>
                            <strong className='pr-3.5 text-2xl'>N/A</strong>
                        </div>
                    </AccordionHeader>
                    <AccordionBody className='grid grid-cols-2 px-3.5'>
                        <div className='w-1/2'>
                            <p>aaa</p>
                        </div>
                    </AccordionBody>
                </Accordion>
            </div>
        </section>
        </div>
    );
}

export default Home;
