import React, { useState, useEffect } from 'react';

async function getAllGroups() {
    const response = await fetch(`http://localhost:3001/groups`);
    return await response.json();
};

export default function AddProject({ submitProjectFunction, projectModified, currentData }) {
    const [groups, setGroups] = useState([]);
    useEffect(() => {
        async function fetchGroups() {
            try {
                const fetchedGroups = await getAllGroups();
                // console.log('Fetched Groups:', fetchedGroups);
                setGroups(fetchedGroups);
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        }

        fetchGroups();
    }, []);
    return (
        <div className='p-8'>
            <h2 className='font-sora text-4xl font-extrabold'>Modify project</h2>
            <div className='flex flex-col mt-8'>
                <label htmlFor="modTitle" className='font-sora font-bold text-xl'>Project name</label>
                <input type="text" id="modTitle" defaultValue={currentData.title || ''} name="modTitle" className='w-full p-2 rounded-md border-2 border-gray-800 bgPrincipal mt-1' />
                <label htmlFor="modDescription" className='font-sora font-bold text-xl mt-4'>Project description</label>
                <textarea name='modDescription' id='modDescription' className='w-full h-28 p-2 rounded-md border-2 border-gray-800 bgPrincipal mt-1' type="text" style={{ resize: 'none' }} defaultValue={currentData.description || ''} />
                <label htmlFor="modIdGroup" className='font-sora font-bold text-xl mt-4'>Which group is it for?</label>
                <div>
                    <select
                        name='modIdGroup'
                        id='modIdGroup'
                        defaultValue={currentData.idStudentGroup}
                        className='w-full p-2 rounded-md border-2 border-gray-800 bgPrincipal mt-1'
                    >
                        <option value="" disabled>Select a group</option>
                        {groups.map((group, index) => (
                            <option key={index} value={group.name}>{group.name}</option>
                        ))}
                    </select>
                </div>
                <div className='flex gap-3 justify-start items-center'>
                    <button onClick={submitProjectFunction} className='w-36 border-2 border-white rounded-md px-4 py-2 bgSidebar mt-8 hover:bg-white hover:text-black transition-all'>
                        Modify project
                    </button>
                    {projectModified.status === false ? (
                        <strong className='text-red-800 text-md'>{projectModified.error}</strong>
                    ) : null}
                </div>
            </div>
        </div>
    );
}