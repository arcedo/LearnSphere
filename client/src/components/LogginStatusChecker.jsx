// LoginStatusChecker.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import isLogged from '../utils/auth';

const LoginStatusChecker = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const result = await isLogged();
                setIsLoggedIn(result);

                if (result !== true) {
                    navigate('/login');
                }
            } catch (error) {
                console.error('Error checking login status:', error);
            }
        };

        checkLoginStatus();
    }, [navigate]);

    useEffect(() => {
        if (isLoggedIn !== null && isLoggedIn !== true) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    // Return a boolean indicating whether the redirect should happen or not
    return isLoggedIn === true;
};

export default LoginStatusChecker;