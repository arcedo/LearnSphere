import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Skills from '../components/Skills';
import { getLoggedUser } from '../utils/auth';
import { Link } from 'react-router-dom';
import LoginStatusChecker from '../components/LogginStatusChecker';

async function getUserData() {
    try {
        const userId = getLoggedUser().id;
        const response = await fetch(`http://localhost:3001/students/${userId}`);

        if (response.ok) {
            const userData = await response.json();
            return userData[0];
        } else {
            console.error('Server returned an error:', response.status);
        }
    } catch (error) {
        console.error('An error occurred during the fetch:', error);
    }
}

function Profile() {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        profilePicture: '',
        bio: '',
    });

    useEffect(() => {
        async function fetchUserData() {
            const data = await getUserData();
            setUserData(data);
        }

        fetchUserData();
    }, []);

    const { firstName, lastName, profilePicture, bio } = userData;
    const loginStatus = LoginStatusChecker();
    if (loginStatus) {
        return (
            <div>
                <Header title={'Profile'} />
                <section className="flex w-full h-screen pt-20 text-white bgPrincipal">
                    <div className='w-11/12 mx-auto pl-5 pr-10 py-10'>
                        <img src={`http://localhost:5173/${profilePicture}`} alt="Profile Picture" />
                        <h4 className='font-sora text-4xl font-extrabold'>{`${firstName} ${lastName}`}</h4>
                        <h4>@{getLoggedUser().name}</h4>
                        <p>{bio}</p>
                        <Link to='/settings'>
                            <button className='border-l-white border-2 border-radius rounded-md px-4 py-2 hover:bg-white hover:text-black transition-all'>Edit</button>
                        </Link>
                    </div>
                </section>
            </div>
        );
    };
}

export default Profile;
