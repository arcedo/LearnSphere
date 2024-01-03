import React, { useState, useEffect } from 'react';
import { getLoggedUser } from '../utils/auth';

async function getUserData() {
    try {
        const userId = getLoggedUser().id;
        const response = await fetch(`http://localhost:3001/students/${userId}`);
        
        if (response.ok) {
            const userData = await response.json();
            console.log(userData[0]);
            return userData[0];
        } else {
            console.error('Server returned an error:', response.status);
        }
    } catch (error) {
        console.error('An error occurred during the fetch:', error);
    }
}

export default function AccountSettings() {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        profilePicture: '',
        bio: '',
        password: '',
    });

    useEffect(() => {
        async function fetchUserData() {
            const data = await getUserData();
            setUserData(data);
        }

        fetchUserData();
    }, []);

    const { firstName, lastName, profilePicture, bio, password } = userData;

    const [hovered, setHovered] = useState(false);
    const [newProfilePicture, setNewProfilePicture] = useState(null);

    const handleImageHover = () => {
        setHovered(!hovered);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setNewProfilePicture(URL.createObjectURL(file));
    };

    const handleImageClick = () => {
        document.getElementById('imageInput').click();
    };

    return (
        <div>
            <h2 className='font-sora text-4xl font-extrabold'>Account</h2>
            <div className='grid grid-cols-2'>
                <div className='w-3/4'>
                    <h3 className='font-sora text-xl font-bold mt-4'>Bio</h3>
                    <textarea
                        className='w-full h-32 p-2 rounded-md border-2 border-gray-800 bgPrincipal'
                        style={{ resize: "none" }}
                        value={bio}
                    ></textarea>
                    <h3 className='font-sora text-xl font-bold mt-12'>Current password</h3>
                    <input
                        className='w-full p-2 rounded-md border-2 border-gray-800 bgPrincipal'
                        type="password"
                    />
                    <h3 className='font-sora text-xl font-bold mt-2'>New password</h3>
                    <input
                        className='w-full p-2 rounded-md border-2 border-gray-800 bgPrincipal'
                        type="password"
                    />
                    <h3 className='font-sora text-xl font-bold mt-2'>Confirm new password</h3>
                    <input
                        className='w-full p-2 rounded-md border-2 border-gray-800 bgPrincipal'
                        type="password"
                    />
                    <button
                        className='border-l-white border-2 border-radius rounded-md mt-12 px-4 py-2 hover:bg-white hover:text-black transition-all'
                    >
                        Save changes
                    </button>
                </div>
                <div className='w-auto flex flex-col justify-center items-center'>
                    <label
                        className={`relative rounded-full w-80 h-80 cursor-pointer ${hovered ? 'hovered' : ''}`}
                        onMouseEnter={handleImageHover}
                        onMouseLeave={handleImageHover}
                        onClick={handleImageClick}
                    >
                        <img
                            className='rounded-full w-80 h-80'
                            src={newProfilePicture || `http://localhost:5173/${profilePicture}`}
                            alt="Profile Picture"
                        />
                        {hovered && (
                            <div className='absolute rounded-full inset-0 flex items-center justify-center bg-black bg-opacity-60'>
                                <span className='text-white text-xl text-center'>Choose<br></br> new image</span>
                            </div>
                        )}
                    </label>
                    <input
                        id='imageInput'
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className='hidden'
                    />
                </div>
            </div>
        </div>
    );
}
