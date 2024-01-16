import React, { useState, useEffect } from 'react';

export default function GroupSettings({handleAddGroupDivVisible, setGroups, groups}) {
    useEffect(() => {
        // Fetch data from the API
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/groups');
                const data = await response.json();
                setGroups(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }; fetchData();
    }, []);

    return (
        <div>
            <div className='flex items-center w-full mx-auto justify-between'>
                <h2 className='font-sora text-4xl font-extrabold'>Groups</h2>
                <button onClick={handleAddGroupDivVisible} className='bg-white text-black hover:bg-black hover:text-white border-2 border-white transition-colors duration-300 rounded-2xl px-5 py-2 font-sora font-extrabold'>
                    Add group
                </button>
            </div>
            <div className='flex flex-wrap justify-between md:justify-normal gap-4 mt-8'>
                {groups.map((group, index) => (
                    <div key={index} className='flex flex-col justify-center items-center w-36 py-6 border-white border-2 rounded-xl'>                        
                        <h3 className='font-sora text-2xl font-bold'>{group.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}