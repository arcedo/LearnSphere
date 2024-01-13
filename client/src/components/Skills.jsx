import React, { useState } from 'react';

export default function Skills({ skillName, globalPercentage, image }) {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div
            className={`relative group w-fit px-2.5 font-montserrat font-normal text-md py-1.5 text-md rounded-full border-2 border-white text-white flex justify-center items-center transition-all duration-300`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <strong className='pointer-events-none'> 
                {skillName} | {globalPercentage}
            </strong>
            {isHovered && (
                <div className="absolute bgSidebar text-white p-4 mt-2 top-9 rounded-full z-30 overflow-hidden border-2 border-gray-800">
                    <img src={image} alt={skillName} className="w-16 h-16" />
                </div>
            )}
        </div>
    );
}
