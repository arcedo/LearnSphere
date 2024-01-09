import React, { useState, useEffect } from 'react';
import MyButton from '../components/MyButton';
import Header from '../components/Header';
import Skills from '../components/Skills';
import Sidebar from '../components/Sidebar';
import AddProject from '../components/AddProject';
import LoginStatusChecker from '../components/LogginStatusChecker';
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
    const [displayedProject, setDisplayedProject] = useState({ id: 0, activeProject: 0, skills: [], activities: [] });

    //Selected item in sidebar (onClick)
    const [selectedItem, setSelectedItem] = useState(null);
    const [isAddProjectDivVisible, setAddProjectDivVisible] = useState(false);
    const handleSidebarItemClick = (item) => {
        if (item.title === 'Add Project') {
            setAddProjectDivVisible(true);
            setTimeout(() => {
                const addProjectDiv = document.getElementById('addProjectDiv');
                addProjectDiv.classList.add('animate-fadeIn');
                addProjectDiv.classList.remove('hidden');  // Remove 'hidden' class
            }, 20);
        } else {
            setSelectedItem(item.title);
            const fetchData = async () => {
                setDisplayedProject({
                    ...item,
                    skills: await getSkillsByProjectId(item.id),
                    activities: await getActivitiesByProjectId(item.id),
                });
            };
            fetchData();
        }
    };

    //Get selectable projects
    const [selectableProjects, setSelectableProjects] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (getLoggedUser().type === 'student') {
                    setSelectableProjects([...await getProjectByStudentId(getLoggedUser().group)]);
                } else {
                    setSelectableProjects([...await getAllProjects(), { id: 0, title: 'Add Project' }]);
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

    async function setProjectActive(idProject) {
        try {
            const response = await fetch(`http://localhost:3001/projects/${idProject}/activate`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status !== 200) {
                console.error(`Failed to activate project. Status: ${response.status}`);
                // Handle the error or show a user-friendly message
            }
            setSelectableProjects([...await getAllProjects(), { id: 0, title: 'Add Project' }]);
            const currentSelected = selectableProjects.find(project => project.id === idProject);
            setDisplayedProject({ ...currentSelected, skills: displayedProject.skills, activities: displayedProject.activities });
        } catch (error) {
            console.error('Error while activating project:', error);
            // Handle the error or show a user-friendly message
        }
    }
    // console.log(selectableProjects);
    // console.log(displayedProject);
    const loginStatus = LoginStatusChecker();
    if (loginStatus) {
        return (
            <div>
                <Header title={'Home'} />
                <section className="flex w-full h-screen pt-20 text-white bgPrincipal relative">
                    {isAddProjectDivVisible && (
                        <div className="overlay fixed top-0 left-0 w-full h-full bg-black opacity-70 z-30" onClick={() => setAddProjectDivVisible(false)}></div>
                    )}
                    <div id='addProjectDiv' className={`w-5/12 h-4/6 z-30 bgSidebar rounded-xl border-2 border-gray-800 hidden overflow-auto ${isAddProjectDivVisible ? 'absolute' : ''} inset-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
                        <AddProject />
                    </div>
                    <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} listContent={selectableProjects} selectedItem={selectedItem} onItemClick={handleSidebarItemClick} />
                    <MyButton onButtonClick={pullSidebar} />
                    <div className='w-11/12 mx-auto pl-5 pr-10 py-10 overflow-auto'>
                        <div className={`${getLoggedUser().type === 'student' ? 'justify-between' : ''} flex items-center gap-4`}>
                            <div className='flex gap-2'>
                                <h4 className='font-sora text-4xl font-extrabold'>{displayedProject.title}</h4>
                                {getLoggedUser().type === 'teacher' && !displayedProject.activeProject ? <button className='hover:bg-white hover:text-black border-2 border-white rounded-full transition-colors duration-500 px-5 py-1 font-sans font-bold' onClick={() => setProjectActive(displayedProject.id)}> Set Active</button> : ""}
                                {displayedProject.activeProject ? <p className='font-bold mt-3'>Currently active</p> : ""}

                            </div>
                            {getLoggedUser().type === 'student' ? <strong className='text-3xl font-sans font-extrabold'>N/A</strong> : null}
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
}

export default Home;
