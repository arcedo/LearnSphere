import React, { useState, useEffect } from 'react';
import MyButton from '../components/MyButton';
import Header from '../components/Header';
import Skills from '../components/Skills';

import { getLoggedUser } from '../utils/auth';

async function getFullName() {
    try {
        let response = await fetch("http://localhost:3001/students/" + getLoggedUser().id);
        if (response.ok) {
            let responseData = await response.json();
            return responseData[0].firstName + ' ' + responseData[0].lastName;
        } else {
            console.error('Server returned an error:', response.status);
        }
    } catch (error) {
        console.error('An error occurred during the fetch:', error);
    }
}

function Profile() {
    const [userFullName, setUserFullName] = useState('');

    useEffect(() => {
        async function fetchFullName() {
            const fullName = await getFullName();
            setUserFullName(fullName);
        }

        fetchFullName();
    }, []);

    return (
        <div>
            <Header title={'Profile'}/>
            <section className="flex w-full h-screen pt-20 text-white bgPrincipal">
                <div className='w-11/12 mx-auto pl-5 pr-10 py-10'> 
                    <h4 className='font-sora text-4xl font-extrabold'>{userFullName}</h4>
                    <h4>@{getLoggedUser().name}</h4>
                </div>
            </section>
        </div>
    );
}

export default Profile;
