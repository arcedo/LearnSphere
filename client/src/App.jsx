import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Error from './pages/Error';
import Settings from './pages/Settings';
import Profile from './pages/Profile';

import isLogged from './utils/auth';
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const result = await isLogged();
      setIsLoggedIn(result);
    };

    checkLoginStatus();
  }, []);

  if (isLoggedIn === null) {
    // Waiting for the asynchronous check to complete
    return null;
  }
  return (
    <Router>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
          </>
        ) : (
          <Route path="/*" element={<Navigate to="/login" />} />
        )}
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  )
}