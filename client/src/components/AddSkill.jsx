import React, { useState } from 'react';

export default function AddSkill({ submitSkillFunction, skillAdded, maxPercentage }) {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = () => {
        document.getElementById('imageInputSkill').click();
    };
    const [error, setError] = useState({ status: true, error: '' });
    const handleImageChange = (event) => {
        const fileInput = event.target;
        const fileName = fileInput.files[0] ? fileInput.files[0].name : null;
        setSelectedImage(fileName);
    };
    function submitValidation() {
        setError({ status: true, error: '' });
        const globalPercentage = document.getElementById('globalPercentage').value;
        if (globalPercentage < 1 || globalPercentage > maxPercentage) {
            setError({ status: false, error: `The value percentage must be between 1 and ${maxPercentage}.` });
        } else {
            submitSkillFunction();
        }
    }
    return (
        <div className='p-8'>
            <h2 className='font-sora text-4xl font-extrabold'>New skill</h2>
            <div className='flex items-end flex-wrap gap-x-5 gap-y-2.5 pt-5 mt-4 mb-5'>
                <div className="w-1/3">
                    <label htmlFor="skillName">Skill name</label>
                    <input type="text" id="skillName" name="skillName" className='w-full p-2 rounded-md border-2 border-gray-800 bgPrincipal mt-1' />
                </div>
                <div className="w-fit flex flex-col">
                    <label htmlFor="globalPercentage">Value percentage <span>(min:1 max:{maxPercentage})</span></label>
                    <input type="number" id="globalPercentage" name="globalPercentage" className='p-2 rounded-md border-2 border-gray-800 bgPrincipal mt-1' max={maxPercentage} min={1} />
                </div>
                <div className="flex items-center">
                    <label onClick={handleImageClick} id='imageInputLabel' className="cursor-pointer w-36 text-center border-2 border-white overflow-hidden rounded-md px-4 py-2 bgSidebar bg-white hover:bg-white text-white hover:text-black transition-all">
                        {selectedImage ? selectedImage : 'Image'}
                    </label>
                    <input
                        id='imageInputSkill'
                        type="file"
                        accept="image/*"
                        className='hidden'
                        onChange={handleImageChange}
                    />
                </div>
            </div>
            <div className='flex gap-3 justify-start items-center'>
                <button onClick={submitValidation} className='w-36 border-2 border-white rounded-md px-4 py-2 bgSidebar hover:bg-white hover:text-black transition-all'>
                    Add skill
                </button>
                {skillAdded.status === false || error.status === false ? (
                    <strong className='text-red-800 text-md'>{skillAdded.error || error.error}</strong>
                ) : null}
            </div>
        </div>
    );
}