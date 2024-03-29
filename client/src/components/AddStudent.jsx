import React, { useState, useEffect } from 'react';

async function getAllGroups() {
    const response = await fetch(`http://localhost:3001/groups`);
    return await response.json();
}

export default function AddStudent({ submitStudentFunction, studentAdded, groups}) {
    const [selectedGroupId, setSelectedGroupId] = useState('');

    return (
        <div className='px-8 py-5'>
            <h2 className='font-sora text-4xl font-extrabold'>New student</h2>
            <div className='flex flex-col mt-8 gap-2'>
                <div className="flex flex-wrap gap-3.5">
                    <div className="w-full md:w-5/12">
                        <label htmlFor="firstName" className='font-sora font-bold text-xl'>First name</label>
                        <input type="text" id="addFirstName" name="firstName" className='w-full p-2 rounded-md border-2 border-gray-800 bgPrincipal mt-1' />
                    </div>
                    <div className="w-full md:w-5/12">
                        <label htmlFor="lastName" className='font-sora font-bold text-xl mt-4'>Last name</label>
                        <input type="text" id="addLastName" name="lastName" className='w-full p-2 rounded-md border-2 border-gray-800 bgPrincipal mt-1' />
                    </div>
                    <div className="w-full md:w-5/12">
                        <label htmlFor="dni" className='font-sora font-bold text-xl mt-4'>DNI</label>
                        <input type="text" id="addDni" name="dni" className='w-full p-2 rounded-md border-2 border-gray-800 bgPrincipal mt-1' />
                    </div>
                    <div className="w-full md:w-5/12">
                        <label htmlFor="phoneNumber" className='font-sora font-bold text-xl mt-4'>Phone number</label>
                        <input type="tel" id="addPhoneNumber" name="phoneNumber" pattern='[0-9]{9}' className='w-full p-2 rounded-md border-2 border-gray-800 bgPrincipal mt-1' />
                    </div>
                    <div className="w-full md:w-5/12">
                        <label htmlFor="password" className='font-sora font-bold text-xl mt-4'>Starter password</label>
                        <input type="password" id="addPassword" name="password" className='w-full p-2 rounded-md border-2 border-gray-800 bgPrincipal mt-1' />
                    </div>
                    <div className="w-full md:w-5/12">
                        <label htmlFor="idGroup" className='font-sora font-bold text-xl mt-4'>Group</label>
                        <div>
                            <select
                                name='idGroup'
                                id='addIdGroup'
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
                    </div>
                </div>
                
                <div className='flex gap-3 justify-start items-center'>
                    <button
                        onClick={submitStudentFunction}
                        className='w-36 border-2 border-white rounded-md px-4 py-2 bgSidebar mt-8 hover:bg-white hover:text-black transition-all'
                    >
                        Add student
                    </button>
                    {studentAdded.status === false ? (
                        <strong className='text-red-800 text-md'>{studentAdded.error}</strong>
                    ) : null}
                </div>
            </div>
        </div>
    );
}