// Import the necessary React library
import React from 'react';
import './login.css';

// Define a functional component called "ExamplePage"
const Login = () => {
  // Define some data or state if needed
  const pageTitle = 'LearnSphere';
  const welcomeMessage = 'Welcome to my React Example Page!';

  // Return the JSX to be rendered
  return (
    <div>
      {/* Render the page title */}
      <h1>{pageTitle}</h1>

      {/* Render a welcome message */}
      <p>{welcomeMessage}</p>

      {/* You can add more components or elements here */}
    </div>
  );
};

// Export the component for use in other parts of the application
export default Login;
