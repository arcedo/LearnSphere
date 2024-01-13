import React, { useState, useEffect } from 'react';
import MyButton from '../components/MyButton';
import Header from '../components/Header';
import Skills from '../components/Skills';
import Sidebar from '../components/Sidebar';
import AddProject from '../components/AddProject';
import DeleteProject from '../components/DeleteProject';
import ModifyProject from '../components/ModifyProject';
import AddSkill from '../components/AddSkill';
import ModifySkill from '../components/ModifySkill';
import DeleteSkill from '../components/DeleteSkill';
import AddActivity from '../components/AddActivity';
import ModifyActivity from '../components/ModifyActivity';
import DeleteActivity from '../components/DeleteActivity';
import LoginStatusChecker from '../components/LogginStatusChecker';
import currentProject from "../assets/img/currentProject.svg"
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

async function addProject() {
    const project = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        idTeacher: getLoggedUser().id,
        idStudentGroup: document.getElementById('idGroup').options[document.getElementById('idGroup').selectedIndex].value,
    }
    if (!project.title || !project.description || !project.idStudentGroup) {
        return { status: false, error: 'Missing fields' };
    } else {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(project)
            }
            const response = await fetch(`http://localhost:3001/projects`, options);
            if (response.status === 200) {
                return await response.json();
            } else return { status: false, error: 'Error adding project' }
        } catch (error) {
            console.error('Error adding project:', error);
            return { status: false, error: 'Error adding project' };
        }
    }
};

async function deleteProject(idProject) {
    const response = await fetch(`http://localhost:3001/projects/${idProject}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    });
    return await response.json();
}

async function modifyProject(idProject) {
    const project = {
        title: document.getElementById('modTitle').value,
        description: document.getElementById('modDescription').value,
        idTeacher: getLoggedUser().id,
        idStudentGroup: document.getElementById('modIdGroup').options[document.getElementById('modIdGroup').selectedIndex].value,
    }
    if (!project.title || !project.description || !project.idStudentGroup) {
        return { status: false, error: 'Missing fields' };
    } else {
        try {
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(project)
            }
            const response = await fetch(`http://localhost:3001/projects/${idProject}`, options);
            if (response.status === 200) {
                return await response.json();
            } else return { status: false, error: 'Error modifying project' }
        } catch (error) {
            console.error('Error modifying project:', error);
            return { status: false, error: 'Error modifying project' };
        }
    }
};

async function addSkill(idProject) {
    const skill = {
        skillName: document.getElementById('skillName').value,
        globalPercentage: document.getElementById('globalPercentage').value,
        idProject: idProject
    }
    if (!skill.skillName || !skill.globalPercentage) {
        return { status: false, error: 'Missing fields' };
    } else {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(skill)
            }
            const response = await fetch(`http://localhost:3001/skills`, options);
            if (response.status === 200) {
                return await response.json();
            } else return { status: false, error: 'Error adding skill' }
        } catch (error) {
            console.error('Error adding skill:', error);
            return { status: false, error: 'Error adding skill' };
        }
    }
}

async function modifySkill(idSkill) {
    const skill = {
        skillName: document.getElementById('modSkillName').value,
        globalPercentage: document.getElementById('modGlobalPercentage').value,
    }
    if (!skill.skillName || !skill.globalPercentage) {
        return { status: false, error: 'Missing fields' };
    } else {
        try {
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(skill)
            }
            const response = await fetch(`http://localhost:3001/skills/${idSkill}`, options);
            if (response.status === 200) {
                return await response.json();
            } else return { status: false, error: 'Error modifying skill' }
        } catch (error) {
            console.error('Error modifying skill:', error);
            return { status: false, error: 'Error modifying skill' };
        }
    }
}

async function deleteSkill(idSkill) {
    try {
        const response = await fetch(`http://localhost:3001/skills/${idSkill}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });
        return await response.json();
    } catch (error) {
        console.error('Error deleting skill:', error);
        return { status: false, error: 'Error deleting skill' };
    }
}

async function addActivity(idProject) {
    const activity = {
        idProject: idProject,
        name: document.getElementById('titleActivity').value,
        description: document.getElementById('descriptionActivity').value,
    }
    if (!activity.idProject || !activity.name || !activity.description) {
        return { status: false, error: 'Missing fields' };
    } else {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(activity)
            }
            const response = await fetch(`http://localhost:3001/activities`, options);
            if (response.status === 200) {
                return await response.json();
            } else return { status: false, error: 'Error adding project' }
        } catch (error) {
            console.error('Error adding activity:', error);
            return { status: false, error: 'Error adding activity' };
        }
    }
}

async function modifyActivity(idProject, idActivity) {
    const activity = {
        idProject: idProject,
        name: document.getElementById('modTitleActivity').value,
        description: document.getElementById('modDescriptionActivity').value,
    }
    if (!activity.idProject || !activity.name || !activity.description) {
        return { status: false, error: 'Missing fields' };
    } else {
        try {
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(activity)
            }
            const response = await fetch(`http://localhost:3001/activities/${idActivity}`, options);
            if (response.status === 200) {
                return await response.json();
            } else return { status: false, error: 'Error modifying activity' }
        } catch (error) {
            console.error('Error modifying activity:', error);
            return { status: false, error: 'Error modifying activity' };
        }
    }
}

async function deleteActivity(idActivity) {
    try {
        const response = await fetch(`http://localhost:3001/activities/${idActivity}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });
        return await response.json();
    } catch (error) {
        console.error('Error deleting activity:', error);
        return { status: false, error: 'Error deleting activity' };
    }
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
                console.error(error);
            }
        };
        fetchData();
    }, []);

    // Default selected sidebar
    useEffect(() => {
        // This effect runs when selectableProjects changes
        //const defaultItem = selectedItem ? null : selectableProjects.find(project => project.activeProject);
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

    // Add project div visible or not
    const [isAddProjectDivVisible, setAddProjectDivVisible] = useState(false);
    //Add Project
    const [projectAdded, setProjectAdded] = useState({});

    //Handle click on add project 
    const handleAddProjectClick = async () => {
        try {
            const result = await addProject();
            setProjectAdded(result);
            if (result.status !== false) {
                setAddProjectDivVisible(false);
                try {
                    setSelectableProjects([...await getAllProjects(), { id: 0, title: 'Add Project' }]);
                } catch (error) {
                    console.error(error);
                }
                document.getElementById('title').value = '';
                document.getElementById('description').value = '';
                document.getElementById('idGroup').value = '';
            }
        } catch (error) {
            console.error(error);
        }
    }

    // Delete project div visible or not
    const [isDeleteProjectDivVisible, setDeleteProjectDivVisible] = useState(false);
    const handleDeleteProjectDivVisible = () => {
        setDeleteProjectDivVisible(true);
        setTimeout(() => {
            const deleteProjectDiv = document.getElementById('deleteProjectDiv');
            deleteProjectDiv.classList.add('animate-fadeIn');
            deleteProjectDiv.classList.remove('hidden');  // Remove 'hidden' class
        }, 20);
    }
    const closeDeleteProjectDivVisible = () => {
        setDeleteProjectDivVisible(false);
    }
    const handleDeleteProjectClick = async () => {
        try {
            const result = await deleteProject(displayedProject.id);
            if (result.affectedRows > 0) {
                setDeleteProjectDivVisible(false);
                try {
                    setSelectableProjects([...await getAllProjects(), { id: 0, title: 'Add Project' }]);
                    setSelectedItem(selectableProjects[0].title);
                    setDisplayedProject({
                        ...selectableProjects[0],
                        skills: await getSkillsByProjectId(selectableProjects[0].id),
                        activities: await getActivitiesByProjectId(selectableProjects[0].id),
                    });
                } catch (error) {
                    console.error(error);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    // Modify project div visible or not
    const [isModifyProjectDivVisible, setModifyProjectDivVisible] = useState(false);
    const [projectModified, setProjectModified] = useState({});
    const handleModifyProjectDivVisible = () => {
        setModifyProjectDivVisible(true);
        setTimeout(() => {
            const modifyProjectDiv = document.getElementById('modifyProjectDiv');
            modifyProjectDiv.classList.add('animate-fadeIn');
            modifyProjectDiv.classList.remove('hidden');  // Remove 'hidden' class
        }, 20);
    }
    const handleModifyProjectClick = async () => {
        try {
            const result = await modifyProject(displayedProject.id);
            setProjectModified(result);
            if (result.status !== false) {
                setModifyProjectDivVisible(false);
                const currentProjectIndex = selectableProjects.findIndex(project => project.id === displayedProject.id)
                setSelectableProjects([...await getAllProjects(), { id: 0, title: 'Add Project' }]);
                setSelectedItem(selectableProjects[currentProjectIndex].title);
                setDisplayedProject({
                    ...selectableProjects[currentProjectIndex],
                    skills: await getSkillsByProjectId(selectableProjects[currentProjectIndex].id),
                    activities: await getActivitiesByProjectId(selectableProjects[currentProjectIndex].id),
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Add skill div visible or not
    const [isAddSkillDivVisible, setAddSkillDivVisible] = useState(false);
    //Add skill
    const [skillAdded, setSkillAdded] = useState({});

    const handleAddSkillDivVisible = () => {
        setAddSkillDivVisible(true);
        setTimeout(() => {
            const deleteProjectDiv = document.getElementById('addSkillDiv');
            deleteProjectDiv.classList.add('animate-fadeIn');
            deleteProjectDiv.classList.remove('hidden');  // Remove 'hidden' class
        }, 20);
    }

    const handleAddSkillClick = async () => {
        try {
            const result = await addSkill(displayedProject.id);
            setSkillAdded(result);
            if (result.status !== false) {
                setAddSkillDivVisible(false);
                setDisplayedProject({
                    ...displayedProject,
                    skills: await getSkillsByProjectId(displayedProject.id),
                    activities: await getActivitiesByProjectId(displayedProject.id),
                });
                document.getElementById('skillName').value = '';
                document.getElementById('globalPercentage').value = '';
            }
        } catch (error) {
            console.error(error);
        }
    }

    // Modify skill div visible or not
    const [isModifySkillDivVisible, setModifySkillDivVisible] = useState(false);
    const handleModifySkillDivVisible = () => {
        setModifySkillDivVisible(true);
        setTimeout(() => {
            const modifySkillDiv = document.getElementById('modifySkillDiv');
            modifySkillDiv.classList.add('animate-fadeIn');
            modifySkillDiv.classList.remove('hidden');  // Remove 'hidden' class
        }, 20);
    }

    const handleModifySkillClick = async () => {
        try {
            const result = await modifySkill(displayedProject.id);
            setSkillAdded(result);
            if (result.status !== false) {
                setModifySkillDivVisible(false);
                setDisplayedProject({
                    ...displayedProject,
                    skills: await getSkillsByProjectId(displayedProject.id),
                    activities: await getActivitiesByProjectId(displayedProject.id),
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    // Delete skill div visible or not
    const [isDeleteSkillDivVisible, setDeleteSkillDivVisible] = useState(false);
    const handleDeleteSkillDivVisible = () => {
        setDeleteSkillDivVisible(true);
        setTimeout(() => {
            const deleteProjectDiv = document.getElementById('deleteSkillDiv');
            deleteProjectDiv.classList.add('animate-fadeIn');
            deleteProjectDiv.classList.remove('hidden');  // Remove 'hidden' class
        }, 20);
    }
    const closeDeleteSkillDivVisible = () => {
        setDeleteSkillDivVisible(false);
    }
    const handleDeleteSkillClick = async () => {
        try {
            const result = await deleteSkill(document.getElementById('selectableSkillsDelete').options[document.getElementById('selectableSkillsDelete').selectedIndex].value);
            if (result.affectedRows > 0) {
                setDeleteSkillDivVisible(false);
                setDisplayedProject({
                    ...displayedProject,
                    skills: await getSkillsByProjectId(displayedProject.id),
                    activities: await getActivitiesByProjectId(displayedProject.id),
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    // Add activity div visible or not
    const [isAddActivityDivVisible, setAddActivityDivVisible] = useState(false);
    const [activityAdded, setActivityAdded] = useState({});
    const handleAddActivityDivVisible = () => {
        setAddActivityDivVisible(true);
        setTimeout(() => {
            const addActivityDiv = document.getElementById('addActivityDiv');
            addActivityDiv.classList.add('animate-fadeIn');
            addActivityDiv.classList.remove('hidden');  // Remove 'hidden' class
        }, 20);
    }
    const handleAddActivityClick = async () => {
        try {
            const result = await addActivity(displayedProject.id);
            setActivityAdded(result);
            if (result.status !== false) {
                setAddActivityDivVisible(false);
                setDisplayedProject({
                    ...displayedProject,
                    skills: await getSkillsByProjectId(displayedProject.id),
                    activities: await getActivitiesByProjectId(displayedProject.id),
                });
                document.getElementById('titleActivity').value = '';
                document.getElementById('descriptionActivity').value = '';
            }
        } catch (error) {
            console.error(error);
        }
    }

    // Modify activity div visible or not
    const [isModifyActivityDivVisible, setModifyActivityDivVisible] = useState(false);
    const [activityModified, setActivityModified] = useState({});
    const [activityToModify, setActivityToModify] = useState({});
    const handleModifyActivityDivVisible = (activityData) => {
        setActivityToModify({ ...activityData });
        setModifyActivityDivVisible(true);
        setTimeout(() => {
            const modifyActivityDiv = document.getElementById('modifyActivityDiv');
            modifyActivityDiv.classList.add('animate-fadeIn');
            modifyActivityDiv.classList.remove('hidden');  // Remove 'hidden' class
        }, 20);
    }
    const handleModifyActivityClick = async () => {
        try {
            const result = await modifyActivity(displayedProject.id, activityToModify.idActivity);
            setActivityModified(result);
            if (result.status !== false) {
                setModifyActivityDivVisible(false);
                setDisplayedProject({
                    ...displayedProject,
                    skills: await getSkillsByProjectId(displayedProject.id),
                    activities: await getActivitiesByProjectId(displayedProject.id),
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Delete activity div visible or not
    const [isDeleteActivityDivVisible, setDeleteActivityDivVisible] = useState(false);
    const [activityDeleted, setActivityDeleted] = useState({});
    const [activityToDelete, setActivityToDelete] = useState({});
    const handleDeleteActivityDivVisible = (activityToDelete) => {
        setDeleteActivityDivVisible(true);
        setActivityToDelete({ ...activityToDelete });
        setTimeout(() => {
            const deleteActivityDiv = document.getElementById('deleteActivityDiv');
            deleteActivityDiv.classList.add('animate-fadeIn');
            deleteActivityDiv.classList.remove('hidden');  // Remove 'hidden' class
        }, 20);
    }

    const closeDeleteActivityDivVisible = () => {
        setDeleteActivityDivVisible(false);
    }

    const handleDeleteActivityClick = async () => {
        try {
            const result = await deleteActivity(activityToDelete.idActivity);
            setActivityDeleted(result);
            if (result.status !== false) {
                setDeleteActivityDivVisible(false);
                setDisplayedProject({
                    ...displayedProject,
                    skills: await getSkillsByProjectId(displayedProject.id),
                    activities: await getActivitiesByProjectId(displayedProject.id),
                });
            }
        } catch (error) {
            console.error(error);
        }
    };


    // Set project active
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
    async function setActivityActive(idProject, idActivity) {
        try {
            const response = await fetch(`http://localhost:3001/activities/${idProject}/activate/${idActivity}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status !== 200) {
                console.error(`Failed to activate activity. Status: ${response.status}`);
                // Handle the error or show a user-friendly message
            }
            setDisplayedProject({ ...displayedProject, skills: displayedProject.skills, activities: await getActivitiesByProjectId(displayedProject.id) });
        } catch (error) {
            console.error('Error while activating activity:', error);
            // Handle the error or show a user-friendly message
        }
    }
    //console.log(selectableProjects);
    //console.log(displayedProject);
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
                        <AddProject submitProjectFunction={handleAddProjectClick} projectAdded={projectAdded} />
                    </div>
                    {isDeleteProjectDivVisible && (
                        <div className="overlay fixed top-0 left-0 w-full h-full bg-black opacity-70 z-30" onClick={() => setDeleteProjectDivVisible(false)}></div>
                    )}
                    <div id='deleteProjectDiv' className={`w-5/12 h-fit z-30 bgSidebar rounded-xl border-2 border-gray-800 hidden overflow-auto ${isDeleteProjectDivVisible ? 'absolute' : ''} inset-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
                        <DeleteProject projectName={displayedProject.title} submitFunction={handleDeleteProjectClick} setNotVisible={closeDeleteProjectDivVisible} />
                    </div>
                    {isModifyProjectDivVisible && (
                        <div className="overlay fixed top-0 left-0 w-full h-full bg-black opacity-70 z-30" onClick={() => setModifyProjectDivVisible(false)}></div>
                    )}
                    <div id='modifyProjectDiv' className={`w-5/12 h-4/6 z-30 bgSidebar rounded-xl border-2 border-gray-800 hidden overflow-auto ${isModifyProjectDivVisible ? 'absolute' : ''} inset-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
                        <ModifyProject submitProjectFunction={handleModifyProjectClick} projectModified={projectModified} currentData={{ title: displayedProject.title, description: displayedProject.description, idStudentGroup: displayedProject.idStudentGroup }} />
                    </div>
                    {isAddSkillDivVisible && (
                        <div className="overlay fixed top-0 left-0 w-full h-full bg-black opacity-70 z-30" onClick={() => setAddSkillDivVisible(false)}></div>
                    )}
                    <div id='addSkillDiv' className={`w-5/12 h-fit z-30 bgSidebar rounded-xl border-2 border-gray-800 hidden overflow-auto ${isAddSkillDivVisible ? 'absolute' : ''} inset-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
                        <AddSkill submitSkillFunction={handleAddSkillClick} skillAdded={skillAdded} />
                    </div>
                    {isModifySkillDivVisible && (
                        <div className="overlay fixed top-0 left-0 w-full h-full bg-black opacity-70 z-30" onClick={() => setModifySkillDivVisible(false)}></div>
                    )}
                    <div id='modifySkillDiv' className={`w-5/12 h-fit z-30 bgSidebar rounded-xl border-2 border-gray-800 hidden overflow-auto ${isModifySkillDivVisible ? 'absolute' : ''} inset-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
                        <ModifySkill submitFunction={handleModifySkillClick} skills={displayedProject.skills}/>
                    </div>
                    {isDeleteSkillDivVisible && (
                        <div className="overlay fixed top-0 left-0 w-full h-full bg-black opacity-70 z-30" onClick={() => setDeleteSkillDivVisible(false)}></div>
                    )}
                    <div id='deleteSkillDiv' className={`w-5/12 h-fit z-30 bgSidebar rounded-xl border-2 border-gray-800 hidden overflow-auto ${isDeleteSkillDivVisible ? 'absolute' : ''} inset-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
                        <DeleteSkill setNotVisible={closeDeleteSkillDivVisible} submitFunction={handleDeleteSkillClick} skills={displayedProject.skills} />
                    </div>
                    {isAddActivityDivVisible && (
                        <div className="overlay fixed top-0 left-0 w-full h-full bg-black opacity-70 z-30" onClick={() => setAddActivityDivVisible(false)}></div>
                    )}
                    <div id='addActivityDiv' className={`w-5/12 h-fit z-30 bgSidebar rounded-xl border-2 border-gray-800 hidden overflow-auto ${isAddActivityDivVisible ? 'absolute' : ''} inset-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
                        <AddActivity activityAdded={activityAdded} submitActivity={handleAddActivityClick} />
                    </div>
                    {isModifyActivityDivVisible && (
                        <div className="overlay fixed top-0 left-0 w-full h-full bg-black opacity-70 z-30" onClick={() => setModifyActivityDivVisible(false)}></div>
                    )}
                    <div id='modifyActivityDiv' className={`w-5/12 h-fit z-30 bgSidebar rounded-xl border-2 border-gray-800 hidden overflow-auto ${isModifyActivityDivVisible ? 'absolute' : ''} inset-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
                        <ModifyActivity activityModified={activityModified} submitModActivity={handleModifyActivityClick} currentData={activityToModify} />
                    </div>
                    {isDeleteActivityDivVisible && (
                        <div className="overlay fixed top-0 left-0 w-full h-full bg-black opacity-70 z-30" onClick={() => setDeleteActivityDivVisible(false)}></div>
                    )}
                    <div id='deleteActivityDiv' className={`w-5/12 h-fit z-30 bgSidebar rounded-xl border-2 border-gray-800 hidden overflow-auto ${isDeleteActivityDivVisible ? 'absolute' : ''} inset-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
                        <DeleteActivity submitDeleteActivity={handleDeleteActivityClick} closeDeleteActivity={closeDeleteActivityDivVisible} activityDeleted={activityDeleted} />
                    </div>
                    <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} listContent={selectableProjects} selectedItem={selectedItem} onItemClick={handleSidebarItemClick} />
                    <MyButton onButtonClick={pullSidebar} />
                    <div className='w-11/12 mx-auto pl-5 pr-10 py-10 overflow-auto font-montserrat font-medium'>
                        <div className={`flex flex-wrap items-center gap-4 justify-between`}>
                            <div className='flex gap-2'>
                                <h4 className='font-sora text-4xl font-extrabold'>{displayedProject.title}</h4>
                                {getLoggedUser().type === 'teacher' && !displayedProject.activeProject ?
                                    <button className='hover:bg-white hover:text-black border-2 border-white rounded-full transition-colors duration-500 px-5 py-1 font-sans font-bold'
                                        onClick={() => setProjectActive(displayedProject.id)}
                                    >
                                        Set Active
                                    </button> : ""
                                }
                                {displayedProject.activeProject ?
                                    <p className='font-bold text-lg mt-3'>Currently active</p> : ""
                                }
                            </div>
                            {getLoggedUser().type === 'student' ?
                                <strong className='text-3xl font-sans font-extrabold'>N/A</strong>
                                : <div className='flex items-center gap-3.5'>
                                    <button onClick={handleModifyProjectDivVisible}
                                        className='border-2 border-white bg-white text-black hover:bg-black hover:text-white rounded-2xl px-5 py-2 font-sans transition-colors duration-300 font-extrabold'
                                    >
                                        Modify
                                    </button>
                                    <button onClick={handleDeleteProjectDivVisible}
                                        className='border-2 border-white bg-white text-black hover:bg-red-800 hover:border-red-800 hover:text-white transition-colors duration-300 rounded-2xl px-5 py-2 font-sans font-extrabold'
                                    >
                                        Delete
                                    </button>
                                </div>
                            }
                        </div>
                        <p className='pb-2.5 font-montserrat font-semibold text-lg pt-1.5'>{displayedProject.description}</p>
                        <div className='flex items-center gap-3 flex-wrap pt-5 pb-5'>
                            {displayedProject.skills.length === 0 ? (
                                getLoggedUser().type === 'teacher' ? (
                                    <button
                                        onClick={handleAddSkillDivVisible}
                                        className='bg-white text-black rounded-full px-4 py-2 font-sans font-extrabold border-2 border-white hover:bg-black hover:text-white transition-colors duration-300'>
                                        Add
                                    </button>
                                ) : null
                            ) : (
                                <>
                                    {displayedProject.skills.map((item) => (
                                        <Skills key={item.idSkill} skillName={item.skillName} globalPercentage={item.globalPercentage + '%'} />
                                    ))}
                                    {getLoggedUser().type === 'teacher' && (
                                        <>
                                            <button
                                                onClick={handleAddSkillDivVisible}
                                                className='bg-white text-black rounded-full px-4 py-2 font-sans font-extrabold border-2 border-white hover:bg-black hover:text-white transition-colors duration-300'>
                                                Add
                                            </button>
                                            <button
                                                onClick={handleModifySkillDivVisible}
                                                className='border-2 border-white bg-white text-black hover:bg-black hover:text-white rounded-full px-5 py-2 font-sans font-extrabold transition-colors duration-300'>
                                                Modify
                                            </button>
                                            <button
                                                onClick={handleDeleteSkillDivVisible}
                                                className='border-2 border-white bg-white text-black hover:bg-red-800 hover:border-red-800 rounded-full hover:text-white transition-colors duration-300 px-5 py-2 font-sans font-extrabold'>
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </>
                            )
                            }
                        </div>
                        {getLoggedUser().type === 'teacher' ?
                            <div className='flex justify-end items-center pb-3'>
                                <button onClick={handleAddActivityDivVisible} className='bg-white text-black rounded-2xl px-5 py-2 font-sans font-extrabold border-2 border-white hover:bg-black hover:text-white transition-colors duration-300'>Add</button>
                            </div>
                            : null
                        }
                        {displayedProject.activities.map((item, index) => (
                            <Accordion key={index} open={openIndex === index} className='border-2 border-white rounded-2xl px-5 mt-2.5'>
                                <AccordionHeader id='accordion' onClick={() => handleOpen(index)} className='py-2.5 border-none font-sora font-extrabold text-lg flex justify-between items-center text-white hover:text-gray-200'>
                                    <div className='flex items-center gap-2.5'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 24 24">
                                            <path fill="#fefefe" d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6z" />
                                        </svg>
                                        <h5 className='text-3xl'>{item.name}</h5>
                                        {item.activeActivity ? <img src={currentProject} alt='Current project' /> : null}
                                    </div>
                                    {getLoggedUser().type === 'student' ?
                                        <strong className='pr-3.5 text-2xl'>N/A</strong>
                                        : null
                                    }
                                </AccordionHeader>
                                <AccordionBody className='px-3.5 pb-10 font-montserrat font-semibold text-lg'>
                                    <div className='grid grid-cols-2 px-3.5 py-0'>
                                        <div className='text-xl text-gray-100 py-0'>
                                            <p>{item.description}</p>
                                        </div>
                                    </div>
                                    {getLoggedUser().type === 'teacher' ?
                                        <div className='flex justify-end items-center gap-2.5'>
                                            {!item.activeActivity ? <button className='bg-white text-black rounded-2xl px-4 py-2 font-sans font-extrabold border-2 border-white hover:bg-black hover:text-white transition-colors duration-300'
                                                onClick={() => setActivityActive(item.idProject, item.idActivity)}>Set Active</button> : null
                                            }
                                            <button onClick={() => handleModifyActivityDivVisible(item)} className='bg-white text-black rounded-2xl px-4 py-2 font-sans font-extrabold border-2 border-white hover:bg-black hover:text-white transition-colors duration-300'>Modify</button>
                                            <button onClick={() => handleDeleteActivityDivVisible} className='bg-white text-black rounded-2xl px-4 py-2 font-sans font-extrabold border-2 border-white hover:bg-red-800 hover:border-red-800 hover:text-white transition-colors duration-300'>Delete</button>
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