import React, { useState, useEffect } from 'react';

//TODO: add non repeatable project name

async function getAllGroups() {
    const response = await fetch(`http://localhost:3001/groups`);
    return await response.json();
};

export default function AddProject({ submitProjectFunction, projectAdded }) {
    const [groups, setGroups] = useState([]);
    const [selectedGroupId, setSelectedGroupId] = useState('');
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
            <h2 className='font-sora text-4xl font-extrabold'>New project</h2>
            <div className='flex flex-col mt-8'>
                <label htmlFor="title" className='font-sora font-bold text-xl'>Project name</label>
                <input type="text" id="title" name="title" className='w-full p-2 rounded-md border-2 border-gray-800 bgPrincipal mt-1' />
                <label htmlFor="description" className='font-sora font-bold text-xl mt-4'>Project description</label>
                <textarea name='description' id='description' className='w-full h-28 p-2 rounded-md border-2 border-gray-800 bgPrincipal mt-1' type="text" style={{ resize: 'none' }} />
                <label htmlFor="idGroup" className='font-sora font-bold text-xl mt-4'>Which group is it for?</label>
                <div>
                    <select
                        name='idGroup'
                        id='idGroup'
                        className='w-full p-2 rounded-md border-2 border-gray-800 bgPrincipal mt-1'
                        value={selectedGroupId}
                        onChange={(e) => setSelectedGroupId(e.target.value)}
                    >
                        <option value="" disabled>Select a group</option>
                        {groups.map((group, index) => (
                            <option key={index} value={group.name}>{group.name}</option>
                        ))}
                    </select>
                </div>
                <div className='flex gap-3 justify-start items-center'>
                    <button onClick={submitProjectFunction} className='w-36 border-2 border-white rounded-md px-4 py-2 bgSidebar mt-8 hover:bg-white hover:text-black transition-all'>
                        Add project
                    </button>
                    {projectAdded.status === false ? (
                        <strong className='text-red-800 text-md'>{projectAdded.error}</strong>
                    ) : null}
                </div>
            </div>
        </div>
    );
}