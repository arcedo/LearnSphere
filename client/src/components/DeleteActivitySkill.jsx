export default function deleteActivitySkill({ setNotVisible, submitFunction, skills, actSkills }) {
    const skillsAvailable = skills.filter(skill =>
        !actSkills || actSkills.some(actSkill => actSkill.idSkill === skill.idSkill)
    );
    return (
        <div className='p-8'>
            <h2 className='font-sora text-4xl font-extrabold'>Delete skill</h2>
            <div className='flex flex-col mt-8 gap-3'>
                <label htmlFor="selectableActSkills">Select skill to delete:</label>
                <select name="selectableActSkills" id="selectableActSkillsDelete" className='w-full p-2 rounded-md border-2 border-gray-800 bgPrincipal'>
                    {skills ? skillsAvailable.map((skill, index) => {
                        return (
                            <option key={index} value={skill.idSkill}>{skill.skillName}</option>
                        );
                    }) : null}
                </select>
                <strong className='font-sora text-xl font-bold mt-3'>Are you sure?</strong>
                <div className='flex gap-3 justify-start items-center'>
                    <button onClick={submitFunction} className='w-36 border-2 border-red-800 text-red-500 rounded-md px-4 py-2 bgSidebar hover:bg-red-800 hover:text-white transition-all'>
                        Yes
                    </button>
                    <button onClick={setNotVisible} className='w-36 border-2 border-white rounded-md px-4 py-2 bgSidebar hover:bg-white hover:text-black transition-all'>
                        No
                    </button>
                </div>
            </div>
        </div>
    );
}