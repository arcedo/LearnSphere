import React from 'react';
import uploadCSV from '../assets/img/uploadCSV.png';

export default function ImportCSV({ submitCsvFunction, csvAdded }) {
    return (
        <div className='px-8 py-5'>
            <h2 className='font-sora text-4xl font-extrabold'>Import CSV</h2>
            <div className='flex flex-col justify-center mt-4'>
                <h3 className='font-sora font-bold text-xl'>Format</h3>
                <img src={uploadCSV} alt="upload csv" className='w-full rounded-md border-2 border-gray-800' />
                <p className='font-sora text-sm mt-2'>It's important that the file follows this format, otherwise it <span className='text-red-800'>will not work</span>.</p>
            </div>
            <div className='flex flex-col mt-4'>
                <label htmlFor="csv" className='font-sora font-bold text-xl'>CSV file</label>
                <input type="file" id="csv" accept=".csv" className='w-full p-2 rounded-md border-2 border-gray-800 bgPrincipal' />
                <div className='flex gap-3 justify-start items-center'>
                    <button onClick={submitCsvFunction} className='w-40 border-l-white border-2 border-radius rounded-md mt-4 px-4 py-2 hover:bg-white hover:text-black transition-all'>
                        Import students
                    </button>
                    {csvAdded.status === false ? (
                        <strong className='text-red-800 text-md'>{csvAdded.error}</strong>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
