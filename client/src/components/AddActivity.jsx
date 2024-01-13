import React, { useState, useEffect } from 'react';

export default function AddActivity({ activityAdded, submitActivity }) {
    return (
        <div className='px-8 py-5'>
            <h2 className='font-sora text-4xl font-extrabold'>New activity</h2>
            <div className='flex flex-col mt-8'>
                <label htmlFor="titleActivity" className='font-sora font-bold text-xl'>Activity name</label>
                <input type="text" id="titleActivity" name="titleActivity" className='w-full p-2 rounded-md border-2 border-gray-800 bgPrincipal mt-1' />
                <label htmlFor="descriptionActivity" className='font-sora font-bold text-xl mt-4'>Activity description</label>
                <textarea name='descriptionActivity' id='descriptionActivity' className='w-full h-28 p-2 rounded-md border-2 border-gray-800 bgPrincipal mt-1' type="text" style={{ resize: 'none' }} />
                <div className='flex gap-3 justify-start items-center'>
                    <button onClick={submitActivity} className='w-36 border-2 border-white rounded-md px-4 py-2 bgSidebar mt-8 hover:bg-white hover:text-black transition-all'>
                        Add project
                    </button>
                    {activityAdded.status === false ? (
                        <strong className='text-red-800 text-md'>{activityAdded.error}</strong>
                    ) : null}
                </div>
            </div>
        </div>
    );
}