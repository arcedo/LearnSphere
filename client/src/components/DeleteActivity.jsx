export default function deleteProject({ submitDeleteActivity, activityDeleted, closeDeleteActivity, activityToDelete }) {
    return (
        <div className='p-8'>
            <h2 className='font-sora text-4xl font-extrabold'>Delete {activityToDelete.name}</h2>
            <div className='flex flex-col mt-8'>
                <strong className='font-sora text-xl font-bold'>Are you sure you want to delete {activityToDelete.name}?</strong>
                <div className='flex gap-3 justify-start items-center'>
                    <button onClick={submitDeleteActivity} className='w-36 border-2 border-red-800 text-red-500 rounded-md px-4 py-2 bgSidebar mt-8 hover:bg-red-800 hover:text-white transition-all'>
                        Yes
                    </button>
                    <button onClick={closeDeleteActivity} className='w-36 border-2 border-white rounded-md px-4 py-2 bgSidebar mt-8 hover:bg-white hover:text-black transition-all'>
                        No
                    </button>
                </div>
                {activityDeleted.status === false ? (
                    <strong className='text-red-800 text-md'>{activityDeleted.error}</strong>
                ) : null}
            </div>
        </div>
    );
}