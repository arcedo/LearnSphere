import React, { useState } from 'react';

export default function ModifySkill({ submitFunction, skills, skillModified }) {
    const [selectedSkill, setSelectedSkill] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = () => {
        document.getElementById('imageInputSkill').click();
    };

    const handleSkillChange = () => {
        const skillNameInput = document.getElementById('modSkillName');
        const skillId = document.getElementById('selectableSkills').value;
        const skill = skills.find((skill) => skill.idSkill === parseInt(skillId, 10));

        setSelectedSkill(skill || {});
        skillNameInput.value = skill.skillName;

        // Set the selected image name
        setSelectedImage(null);  // Clear the selected image when skill changes
    };

    const handleImageChange = (event) => {
        const fileInput = event.target;
        const fileName = fileInput.files[0] ? fileInput.files[0].name : null;
        setSelectedImage(fileName);
    };
    const [error, setError] = useState({ status: true, error: '' });
    function submitValidation() {
        setError({ status: true, error: '' });
        submitFunction();
    }

    return (
        <div className='p-8'>
            <h2 className='font-sora text-4xl font-extrabold mb-4'>Modify skill</h2>
            <label htmlFor="selectableSkills">Select skill to modify:</label>
            <select
                name="selectableSkills"
                id="selectableSkills"
                className='w-full p-2 rounded-md border-2 border-gray-800 bgPrincipal mt-1'
                onChange={handleSkillChange}
                value={selectedSkill.idSkill || ''}
            >
                <option value="">---</option>
                {skills.map((skill, index) => (
                    <option key={index} value={skill.idSkill}>
                        {skill.skillName}
                    </option>
                ))}
            </select>
            <div className='flex items-center flex-wrap gap-x-2.5 gap-y-2 pt-5 mb-5'>
                <div className="w-full md:w-1/3">
                    <label htmlFor="skillName">Skill name</label>
                    <input
                        type="text"
                        id="modSkillName"
                        name="skillName"
                        className='w-full p-2 rounded-md border-2 border-gray-800 bgPrincipal mt-1'
                    />
                </div>
                <div className='flex items-center w-full md:w-1/3 mt-2 md:mt-7'>
                    <label
                        onClick={handleImageClick}
                        className='cursor-pointer w-full md:w-36 text-center border-2 border-white rounded-md px-4 py-2 overflow-hidden bgSidebar bg-white hover:bg-white text-white hover:text-black transition-all'
                    >
                        {selectedImage ? selectedImage : 'Image'}
                    </label>
                    <input
                        id='imageInputSkill'
                        type='file'
                        accept='image/*'
                        className='hidden'
                        onChange={handleImageChange}
                    />
                </div>
            </div>
            <div className='flex gap-3 justify-start items-center'>
                <button
                    onClick={submitValidation}
                    className='w-36 border-2 border-white rounded-md px-4 py-2 bgSidebar hover:bg-white hover:text-black transition-all'
                >
                    Modify skill
                </button>
                {skillModified.status === false || error.status === false ? (
                    <strong className='text-red-800 text-md'>{skillModified.error || error.error}</strong>
                ) : null}
            </div>
        </div>
    );
}
