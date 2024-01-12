import React, { useState, useEffect } from 'react';

async function getAllGroups() {
    const response = await fetch(`http://localhost:3001/groups`);
    return await response.json();
}

export default function AddGroup({ submitGroupFunction, groupAdded}) {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        async function fetchGroups() {
            try {
                const fetchedGroups = await getAllGroups();
                setGroups(fetchedGroups);
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        }

        fetchGroups();
    }, []);

    return (
        <div className='px-8 py-5'>
            <h2 className='font-sora text-4xl font-extrabold'>New group</h2>
            <div className='flex flex-col mt-8'>
                <label htmlFor="name" className='font-sora font-bold text-xl'>Name</label>
                <input type="text" id="addName" name="name" className='w-full p-2 rounded-md border-2 border-gray-800 bgPrincipal' />
                <div className='flex gap-3 justify-start items-center'>
                    <button onClick={submitGroupFunction} className='w-32 border-l-white border-2 border-radius rounded-md mt-8 px-4 py-2 hover:bg-white hover:text-black transition-all'>
                        Add group
                    </button>
                    {groupAdded.status === false ? (
                        <strong className='text-red-800 text-md'>{groupAdded.error}</strong>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
