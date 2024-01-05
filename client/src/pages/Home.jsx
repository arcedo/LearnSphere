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

async function getSkillsByProjectId(idProject) {
    const response = await fetch(`http://localhost:3001/projects/${idProject}/skills`);
    return await response.json();
}

async function getActivitiesByProjectId(idProject) {
    const response = await fetch(`http://localhost:3001/activities/${idProject}`);
    return await response.json();
}

function Home() {

    //Sidebar open/closed
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const pullSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    //Accordion
    const [openIndex, setOpenIndex] = useState(null);
    const handleOpen = (index) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    //Displayed project
    const [displayedProject, setDisplayedProject] = useState({ skills: [], activities: [] });

    //Selected item in sidebar (onClick)
    const [selectedItem, setSelectedItem] = useState(null);
    const handleSidebarItemClick = (item) => {
        setSelectedItem(item.title);
        const fetchData = async () => {
            setDisplayedProject({
                ...item,
                skills: await getSkillsByProjectId(item.id),
                activities: await getActivitiesByProjectId(item.id)
            });
        }
        fetchData();
    };

    //Get selectable projects
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

    // Default selected sidebar
    useEffect(() => {
        // This effect runs when selectableProjects changes
        const defaultItem = selectableProjects.find(project => project.activeProject);
        if (defaultItem) {
            setSelectedItem(defaultItem.title);
            const fetchData = async () => {
                setDisplayedProject({
                    ...defaultItem,
                    skills: await getSkillsByProjectId(defaultItem.id),
                    activities: await getActivitiesByProjectId(defaultItem.id)
                });
            }
            fetchData();
        }
    }, [selectableProjects]);

    console.log(displayedProject);
    return (
        <div>
            <Header title={'Home'} />
            <section className="flex w-full h-screen pt-20 text-white bgPrincipal">
                <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} listContent={selectableProjects} selectedItem={selectedItem} onItemClick={handleSidebarItemClick} />
                <MyButton onButtonClick={pullSidebar} />
                <div className='w-11/12 mx-auto pl-5 pr-10 py-10'>
                    <div className={`${getLoggedUser().type === 'student' ? 'justify-between' : ''} flex items-center gap-4`}>
                        <h4 className='font-sora text-4xl font-extrabold'>{displayedProject.title}</h4>
                        {getLoggedUser().type === 'student' ? <strong className='text-3xl font-sans font-extrabold'>N/A</strong> : <button className='bg-white text-black rounded-2xl px-5 py-2 font-sans font-extrabold'> Set Active</button>}
                    </div>
                    <p className='pb-2.5 pt-1.5'>{displayedProject.description}</p>
                    <div className='flex items-center gap-3 flex-wrap w-1/2 pt-5 pb-5'>
                        {displayedProject.skills.map((item) => (
                            <Skills skillName={item.skillName} globalPercentage={item.globalPercentage + '%'} />
                        ))}
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
                    {displayedProject.activities.map((item, index) => (
                        <Accordion key={index} open={openIndex === index} className='border-2 border-white rounded-2xl px-5 mt-2.5'>
                            <AccordionHeader id='accordion' onClick={() => handleOpen(index)} className='py-2.5 border-none flex justify-between items-center text-white hover:text-gray-200'>
                                <div className='flex items-center gap-2.5'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 24 24">
                                        <path fill="#fefefe" d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6z" />
                                    </svg>
                                    <h5 className='text-3xl'>{item.name}</h5>
                                </div>
                                {getLoggedUser().type === 'student' ?
                                    <strong className='pr-3.5 text-2xl'>N/A</strong>
                                    : null
                                }
                            </AccordionHeader>
                            <AccordionBody className='px-3.5 pb-10'>
                                <div className='grid grid-cols-2 px-3.5 py-0'>
                                    <div className='text-xl text-gray-100 py-0'>
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                                {getLoggedUser().type === 'teacher' ?
                                    <div className='flex justify-end items-center gap-2.5'>
                                        <button className='bg-white text-black rounded-2xl px-5 py-2 font-sans font-extrabold'>Modify</button>
                                        <button className='bg-white text-black rounded-2xl px-5 py-2 font-sans font-extrabold'>Delete</button>
                                    </div>
                                    : null
                                }
                            </AccordionBody>
                        </Accordion>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Home;
