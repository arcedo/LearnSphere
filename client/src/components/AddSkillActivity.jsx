import React, { useState } from 'react';
export default function AddSkillActivity({ activityData, selectableSkills, submitAddSkillActivity, addedSkillActivity }) {
    const filteredSkills = selectableSkills.filter(skill =>
        !activityData.skills || !activityData.skills.some(actSkill => actSkill.idSkill === skill.idSkill)
    );
    const maxValue = activityData.skills ? 100 - activityData.skills.reduce((accumulator, currentValue) => accumulator + currentValue.globalPercentage, 0) : 100;
    const [error, setError] = useState({ status: true, error: '' });
    function submitValidation() {
        setError({ status: true, error: '' });
        const globalPercentage = document.getElementById('percentageValueActSkill').value;
        if (globalPercentage < 1 || globalPercentage > maxValue) {
            setError({ status: false, error: `The value percentage must be between 1 and ${maxValue}.` });
        } else {
            submitAddSkillActivity();
        }
    }
    return (
        <div className='p-8'>
            <h2 className='font-sora text-4xl font-extrabold'>New skill for {activityData.name}</h2>
            <div className='flex flex-col justify-around gap-5 pt-5 mb-5'>
                <div className="flex flex-wrap items-center gap-5">
                    <div className="flex flex-col gap-2.5 justify-center">
                        <label className="" htmlFor="selectedActSkill">Selectable skills</label>
                        <select name="selectedActSkill" id="selectedActSkill" className="w-36 p-2 rounded-md border-2 border-gray-800 bgPrincipal">
                            {filteredSkills.map((skill) => (
                                <option key={skill.idSkill} value={skill.idSkill}>{skill.skillName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-2.5 justify-center">
                        <label className="w-full" htmlFor="percentageValueActSkill">Percentage value <span>(Min: 1 / Max: {maxValue})</span></label>
                        <input type="number" id="percentageValueActSkill" name="percentageValueActSkill" className='w-full p-2 rounded-md border-2 border-gray-800 bgPrincipal' max={maxValue} min={1} defaultValue={1} />
                    </div>
                </div>
            </div>
            <div className='flex gap-3 justify-start items-center'>
                <button onClick={submitValidation} className='w-36 border-2 border-white rounded-md px-4 py-2 bgSidebar hover:bg-white hover:text-black transition-all'>
                    Add skill
                </button>
                {addedSkillActivity.status === false || error.status === false ? (
                    <strong className='text-red-800 text-md'>{addedSkillActivity.error || error.error}</strong>
                ) : null}
            </div>
        </div>
    );
}