import React, { useState } from 'react';

export default function Skills({ skillName, globalPercentage }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="w-fit min-w-36 py-1.5 text-md rounded-full border-2 border-white text-white flex justify-center items-center transition-all duration-300"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <strong className={isHovered ? 'hidden' : ''}>
                {skillName + ' - ' + globalPercentage}
            </strong>
            <p className={isHovered ? '' : 'hidden'}>{globalPercentage}</p>
        </div>
    );
}