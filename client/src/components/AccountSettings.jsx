import React, { useState, useEffect } from 'react';
import { getLoggedUser } from '../utils/auth';

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

async function updateUserData(userId, updatedUserData) {
    try {
        const response = await fetch(`http://localhost:3001/students/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUserData),
        });

        if (response.ok) {
            console.log('User data updated successfully');
        } else {
            console.error('Server returned an error:', response.status);
        }
    } catch (error) {
        console.error('An error occurred during the fetch:', error);
    }
}

function reloadPage() {
    setTimeout(() => {
        window.location.reload();
    }, 1000);
}

export default function AccountSettings() {
    const [userData, setUserData] = useState({
        idStudent: '',
        dni: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        userName: '',
        userPassword: '',
        profilePicture: '',
        bio: '',
        idStudentGroup: '',
    });

    useEffect(() => {
        async function fetchUserData() {
            const data = await getUserData();
            setUserData(data);
            setNewBio(data.bio);
        }

        fetchUserData();
    }, []);

    const {
        idStudent,
        dni,
        firstName,
        lastName,
        phoneNumber,
        email,
        userName,
        userPassword,
        profilePicture,
        bio,
        idStudentGroup,
    } = userData;

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [passwordUpdateMessage, setPasswordUpdateMessage] = useState('');

    const [newBio, setNewBio] = useState('');
    const handleSaveChanges = async () => {
        const userId = getLoggedUser().id;

        // Validate that new password and confirm new password match
        if (newPassword !== confirmNewPassword) {
            setPasswordUpdateMessage('Password confirmation does not match');
            return;
        }

        // If a new password is provided, validate the old password
        if (newPassword && oldPassword !== userPassword) {
            setPasswordUpdateMessage('Current password is incorrect');
            return;
        }

        // Create an object with updated user data excluding profilePicture
        const updatedUserData = {
            idStudent,
            dni,
            firstName,
            lastName,
            phoneNumber,
            email,
            userName,
            userPassword: newPassword || userPassword,
            bio: newBio,
            idStudentGroup,
        };

        setUserData((prevUserData) => ({ ...prevUserData, bio: newBio }));

        console.log('Updated User Data:', updatedUserData);
        console.log('Profile Picture:', newProfilePicture);

        try {
            // Make a fetch request with the updated user data
            await updateUserData(userId, updatedUserData);

            // Create a FormData object to handle file uploads
            const formData = new FormData();

            // // Append userName to the FormData object
            // formData.append('userName', userName);

            // Append other fields to the FormData object
            Object.entries(updatedUserData).forEach(([key, value]) => {
                formData.append(key, value);
            });

            // Append profilePicture as a file to the FormData object
            formData.append('profilePicture', newProfilePicture);

            // Make a fetch request with the FormData object to update only the profile picture
            const response = await fetch(`http://localhost:3001/students/${userId}`, {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                console.log('Profile picture updated successfully');
            } else {
                console.error('Server returned an error:', response.status);
            }
        } catch (error) {
            console.error('An error occurred during the fetch:', error);
        }

        setPasswordUpdateMessage('Changes saved successfully!');
    };


    const [hovered, setHovered] = useState(false);
    const [newProfilePicture, setNewProfilePicture] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    const handleImageHover = () => {
        setHovered(!hovered);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setNewProfilePicture(file);
        const previewURL = URL.createObjectURL(file);
        setImagePreview(previewURL);
    };

    const handleImageClick = () => {
        document.getElementById('imageInput').click();
    };

    return (
        <div>
            <h2 className='font-sora text-4xl font-extrabold'>Account</h2>
            <div className='grid grid-cols-2'>
                <div className='w-3/4'>
                    {getLoggedUser().type === 'student' ?
                        <div>
                            <h3 className='font-sora text-xl font-bold mt-4'>Bio</h3>
                            <textarea
                                className='w-full h-32 p-2 rounded-md border-2 border-gray-800 bgPrincipal'
                                style={{ resize: 'none' }}
                                placeholder="Write something about yourself..."
                                value={newBio}
                                onChange={(e) => setNewBio(e.target.value)}
                            ></textarea>
                        </div> : ''}
                    <h3 className='font-sora text-xl font-bold mt-12'>Current password</h3>
                    <input
                        className='w-full p-2 rounded-md border-2 border-gray-800 bgPrincipal'
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <h3 className='font-sora text-xl font-bold mt-2'>New password</h3>
                    <input
                        className='w-full p-2 rounded-md border-2 border-gray-800 bgPrincipal'
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <h3 className='font-sora text-xl font-bold mt-2'>Confirm new password</h3>
                    <input
                        className='w-full p-2 rounded-md border-2 border-gray-800 bgPrincipal'
                        type="password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                    <div className='flex gap-3 justify-start items-center'>
                        <button
                            className='border-l-white border-2 border-radius rounded-md mt-4 px-4 py-2 hover:bg-white hover:text-black transition-all'
                            onClick={handleSaveChanges}
                        >
                            Save changes
                        </button>
                        {passwordUpdateMessage && (
                            passwordUpdateMessage === 'Changes saved successfully!' ?
                                <p className='text-green-500 mt-4'>{passwordUpdateMessage}{reloadPage()}</p> :
                                <p className='text-red-500 mt-4'>{passwordUpdateMessage}</p>
                        )}
                    </div>
                </div>
                {getLoggedUser().type === 'student' ?
                    <div className='w-auto flex flex-col justify-center items-center' id='imageDiv'>
                        <label
                            className={`relative rounded-full w-80 h-80 cursor-pointer ${hovered ? 'hovered' : ''}`}
                            onMouseEnter={handleImageHover}
                            onMouseLeave={handleImageHover}
                            onClick={handleImageClick}
                        >
                            <img
                                className='rounded-full w-80 h-80'
                                src={imagePreview || `http://localhost:5173/${profilePicture}`}
                                alt="Profile Picture"
                            />
                            {hovered && (
                                <div className='absolute flex-col rounded-full inset-0 flex items-center justify-center bg-black bg-opacity-60'>
                                    <span className='text-white text-xl text-center mb-1'>Choose<br></br> new image</span>
                                    <hr></hr>
                                    <span className='text-gray-400 text-center mt-1'>Square picture<br></br>is recommended</span>
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
                    </div> : ''}
            </div>
        </div>
    );
}
