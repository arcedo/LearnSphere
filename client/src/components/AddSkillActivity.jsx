export default function AddSkillActivity({ activityData, selectableSkills, submitAddSkillActivity, addedSkillActivity }) {
    const filteredSkills = selectableSkills.filter(skill =>
        !activityData.skills || !activityData.skills.some(actSkill => actSkill.idSkill === skill.idSkill)
    );
    return (
        <div className='p-8'>
            <h2 className='font-sora text-4xl font-extrabold'>New skill for {activityData.name}</h2>
            <div className='flex flex-col justify-around gap-5 pt-5 mb-5'>
                <div className="flex justify-center items-center gap-5">
                    <div className="flex flex-col gap-2.5 w-1/2 justify-center">
                        <label className="font-bold text-xl" htmlFor="selectedActSkill">Selectable Skills</label>
                        <select name="selectedActSkill" id="selectedActSkill" className="w-full p-2 rounded-md border-2 border-gray-800 bgPrincipal mt-1">
                            {filteredSkills.map((skill) => (
                                <option key={skill.idSkill} value={skill.idSkill}>{skill.skillName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-2.5 justify-center w-1/2">
                        <label className="font-bold text-xl" htmlFor="percentageValueActSkill">Percentage Value</label>
                        <input type="number" id="percentageValueActSkill" name="percentageValueActSkill" className='w-full p-2 rounded-md border-2 border-gray-800 bgPrincipal mt-1' max={100} min={1} defaultValue={1} />
                    </div>
                </div>
            </div>
            <div className='flex gap-3 justify-start items-center'>
                <button onClick={submitAddSkillActivity} className='w-36 border-2 border-white rounded-md px-4 py-2 bgSidebar hover:bg-white hover:text-black transition-all'>
                    Add skill
                </button>
                {addedSkillActivity.status === false ? (
                    <strong className='text-red-800 text-md'>{addedSkillActivity.error}</strong>
                ) : null}
            </div>
        </div>
    );
}