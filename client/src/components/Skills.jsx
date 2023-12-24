import React, { useState } from 'react';

export default function Skills({ skillName, globalPercentage }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
        className="w-fit min-w-20 py-1 text-sm rounded-full border-2 border-white text-white flex justify-center items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >
        <strong className={isHovered ? 'hidden' : ''}>
            {skillName}
        </strong>
        <p className={isHovered ? '' : 'hidden'}>{globalPercentage}</p>
        </div>
    );
}