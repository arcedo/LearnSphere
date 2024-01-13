export default function deleteProject({ projectName, setNotVisible, submitFunction }) {
    return (
        <div className='p-8'>
            <h2 className='font-sora text-4xl font-extrabold'>Delete {projectName}</h2>
            <div className='flex flex-col mt-8'>
                <strong className='font-sora text-xl font-bold'>Are you sure you want to delete {projectName}?</strong>
                <div className='flex gap-3 justify-start items-center'>
                    <button onClick={submitFunction} className='w-36 border-2 border-red-800 text-red-500 rounded-md px-4 py-2 bgSidebar mt-8 hover:bg-red-800 hover:text-white transition-all'>
                        Yes
                    </button>
                    <button onClick={setNotVisible} className='w-36 border-2 border-white rounded-md px-4 py-2 bgSidebar mt-8 hover:bg-white hover:text-black transition-all'>
                        No
                    </button>
                </div>
            </div>
        </div>
    );
}