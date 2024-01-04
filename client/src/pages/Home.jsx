import React, { useState, useEffect } from 'react';
import MyButton from '../components/MyButton';
import Header from '../components/Header';
import Skills from '../components/Skills';
import Sidebar from '../components/Sidebar';
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
    button,
} from "@material-tailwind/react";

import { getLoggedUser } from '../utils/auth';

async function getAllProjects() {
    const response = await fetch(`http://localhost:3001/projects`);
    return await response.json();
}

async function getProjectByStudentId(groupId) {
    const response = await fetch(`http://localhost:3001/projects/group/${groupId}`);
    return await response.json();
}
function Home() {

    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const pullSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const [open, setOpen] = useState(1);
    const handleOpen = (value) => setOpen(open === value ? 0 : value);
    let [selectableProjects, setSelectableProjects] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (getLoggedUser().type === 'student') {
                    setSelectableProjects(await getProjectByStudentId(getLoggedUser().group));
                } else {
                    setSelectableProjects(await getAllProjects());
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <Header title={'Home'} />
            <section className="flex w-full h-screen pt-20 text-white bgPrincipal">
                <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} listContent={selectableProjects} />
                <MyButton onButtonClick={pullSidebar} />
                <div className='w-11/12 mx-auto pl-5 pr-10 py-10'>
                    <div className={`${getLoggedUser().type === 'student' ? 'justify-between' : ''} flex items-center gap-4`}>
                        <h4 className='font-sora text-4xl font-extrabold'>Project1</h4>
                        {getLoggedUser().type === 'student' ? <strong className='text-3xl font-sans font-extrabold'>N/A</strong> : <button className='bg-white text-black rounded-2xl px-5 py-2 font-sans font-extrabold'> Set Active</button>}
                    </div>
                    <div className='flex items-center gap-3 flex-wrap w-1/2 pt-5 pb-5'>
                        <Skills skillName='HTML' globalPercentage='50%' />
                        <Skills skillName='HTML' globalPercentage='50%' />
                        {
                            getLoggedUser().type === 'teacher' ?
                                <button className='bg-white text-black rounded-2xl px-5 py-2 font-sans font-extrabold'>Add</button>
                                : null
                        }
                        {
                            getLoggedUser().type === 'teacher' ?
                                <button className='bg-white text-black rounded-2xl px-5 py-2 font-sans font-extrabold'>Modify</button>
                                : null
                        }
                    </div>
                    {getLoggedUser().type === 'teacher' ?
                        <div className='flex justify-end items-center pb-3'>
                            <button className='bg-white text-black rounded-2xl px-5 py-2 font-sans font-extrabold'>Add</button>
                        </div>
                        : null
                    }
                    <Accordion open={open === 1} className='border-2 border-white rounded-2xl px-5'>
                        <AccordionHeader id='accordion' onClick={() => handleOpen(1)} className='py-5 border-none flex justify-between items-center text-white hover:text-gray-200'>
                            <div className='flex items-center gap-2.5'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 24 24">
                                    <path fill="#fefefe" d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6z" />
                                </svg>
                                <h5 className='text-3xl'>Activitat 1</h5>
                            </div>
                            {getLoggedUser().type === 'student' ?
                                <strong className='pr-3.5 text-2xl'>N/A</strong>
                                : <div className='flex items-center gap-2.5'>
                                    <button className='bg-white text-black rounded-2xl px-5 py-2 font-sans font-extrabold'>Modify</button>
                                    <button className='bg-white text-black rounded-2xl px-5 py-2 font-sans font-extrabold'>Delete</button>
                                </div>
                            }
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
