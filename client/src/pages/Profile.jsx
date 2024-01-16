import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Skills from '../components/Skills';
import { getLoggedUser } from '../utils/auth';
import { Link, useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();

    if (getLoggedUser().type === 'teacher') {
        navigate('/error');
    }
    if (loginStatus) {
        return (
            <div>
                <Header title={'Profile'} />
                <section className="flex w-full h-screen pt-20 justify-around items-center text-white bgPrincipal gap-4">
                    <div className='w-5/12 py-10'>
                        <img className='rounded-full' src={`http://localhost:5173/${profilePicture}`} alt="Profile Picture" />
                        <h4 className='font-sora text-4xl font-extrabold mt-4'>{`${firstName} ${lastName}`}</h4>
                        <div className='flex font-sora font-light text-gray-500 text-xl gap-2'>
                            <h4>@{getLoggedUser().name}</h4>
                            <p> · </p>
                            <p>{userData.idStudentGroup}</p>
                        </div>
                        <p className='font-montserrat font-normal'>{bio}</p>
                        <Link to='/settings'>
                            <button className='border-l-white border-2 border-radius w-80 mt-3 rounded-md px-4 py-2 hover:bg-white hover:text-black transition-all'>Edit</button>
                        </Link>
                    </div>
                    <div className='5/12 border-2 border-gray-800 rounded-lg'>
                        <div className='w-full'></div>
                    </div>
                </section>
            </div>
        );
    };
}

export default Profile;
