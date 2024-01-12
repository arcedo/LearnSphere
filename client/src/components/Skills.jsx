import React, { useState } from 'react';

export default function Skills({ skillName, globalPercentage }) {
    return (
        <div
            className="w-fit px-2.5 font-montserrat font-normal text-md py-1.5 text-md rounded-full border-2 border-white text-white flex justify-center items-center transition-all duration-300"
        >
            <strong>
                {skillName} | {globalPercentage}
            </strong>
        </div>
    );
}