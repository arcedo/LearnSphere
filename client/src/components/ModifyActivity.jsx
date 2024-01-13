import React, { useState, useEffect } from 'react';

export default function ModifyActivity({ activityModified, submitModActivity, currentData }) {
    return (
        <div className='px-8 py-5'>
            <h2 className='font-sora text-4xl font-extrabold'>Modify activity</h2>
            <div className='flex flex-col mt-8'>
                <label htmlFor="modTitleActivity" className='font-sora font-bold text-xl'>Activity name</label>
                <input type="text" id="modTitleActivity" name="modTitleActivity" defaultValue={currentData.name} className='w-full p-2 rounded-md border-2 border-gray-800 bgPrincipal mt-1' />
                <label htmlFor="modDescriptionActivity" className='font-sora font-bold text-xl mt-4'>Activity description</label>
                <textarea name='modDescriptionActivity' id='modDescriptionActivity' className='w-full h-28 p-2 rounded-md border-2 border-gray-800 bgPrincipal mt-1' type="text" style={{ resize: 'none' }} defaultValue={currentData.description} />
                <div className='flex gap-3 justify-start items-center'>
                    <button onClick={submitModActivity} className='w-36 border-2 border-white rounded-md px-4 py-2 bgSidebar mt-8 hover:bg-white hover:text-black transition-all'>
                        Modify project
                    </button>
                    {activityModified.status === false ? (
                        <strong className='text-red-800 text-md'>{activityModified.error}</strong>
                    ) : null}
                </div>
            </div>
        </div>
    );
}