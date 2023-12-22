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
    <section id="main" className="flex h-full w-full">
      <div>
        {/* Render the page title */}
        <h1>{pageTitle}</h1>

        {/* Render a welcome message */}
        <p>{welcomeMessage}</p>

        {/* You can add more components or elements here */}
        <form action="/login" method="post">
          <input type="text" name="username" placeholder="Username" />
          <input type="password" name="password" placeholder="Password" />
          <input type="submit" value="Login" />
        </form>
      </div>
    </section>
  );
};

// Export the component for use in other parts of the application
export default Login;
