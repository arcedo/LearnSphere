import React, { useState } from 'react';

export default function Skills({ skillName, globalPercentage, image }) {
    return (
        <div
            className={`relative group w-fit px-2.5 font-montserrat font-normal text-md py-1.5 text-md rounded-full border-2 border-white text-white gap-2.5 flex justify-center items-center transition-all duration-300`}
        >
            <img src={image} alt={skillName} className="w-5 h-5 rounded-full" />
            <p className='pointer-events-none'>
                {skillName}
            </p>
            <strong>
                {globalPercentage}
            </strong>
        </div>
    );
}
