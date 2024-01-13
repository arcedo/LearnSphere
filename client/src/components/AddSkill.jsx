export default function AddSkill({ submitSkillFunction, skillAdded }) {
    const handleImageClick = () => {
        document.getElementById('imageInputSkill').click();
    };
    return (
        <div className='p-8'>
            <h2 className='font-sora text-4xl font-extrabold'>New skill</h2>
            <div className='flex justify-around gap-5 pt-5 mb-5'>
                <div className="w-1/2">
                    <label htmlFor="skillName">Skill name</label>
                    <input type="text" id="skillName" name="skillName" className='w-full p-2 rounded-md border-2 border-gray-800 bgPrincipal mt-1' />
                </div>
                <div className="w-1/3">
                    <label htmlFor="globalPercentage">Value percentage</label>
                    <input type="number" id="globalPercentage" name="globalPercentage" className='w-full p-2 rounded-md border-2 border-gray-800 bgPrincipal mt-1' max={100} min={1} />
                </div>
                <div className="flex items-center mt-7">
                    <label onClick={handleImageClick} className="cursor-pointer w-36 text-center border-2 border-white rounded-md px-4 py-2 bgSidebar bg-white hover:bg-white text-white hover:text-black transition-all">Image</label>
                    <input
                        id='imageInputSkill'
                        type="file"
                        accept="image/*"
                        className='hidden'
                    />
                </div>
            </div>
            <div className='flex gap-3 justify-start items-center'>
                <button onClick={submitSkillFunction} className='w-36 border-2 border-white rounded-md px-4 py-2 bgSidebar hover:bg-white hover:text-black transition-all'>
                    Add skill
                </button>
                {skillAdded.status === false ? (
                    <strong className='text-red-800 text-md'>{skillAdded.error}</strong>
                ) : null}
            </div>
        </div>
    );
}