export const isLogged = async () => {
    const loggedUser = getLoggedUser();

    if (!loggedUser) {
        return false;  // Handle the case when there's no logged user
    }

    try {
        const userValidationResponse = await fetch(`http://localhost:3001/${loggedUser.type}s/${loggedUser.id}`);
        const userValidation = await userValidationResponse.json();
        if (!userValidationResponse.ok || userValidation[0].userName !== loggedUser.name) {
            return false;
        } else {
            return true;
        }
    } catch (error) {
        console.error('Error validating user:', error);
        return false;
    }
};

export const getLoggedUser = () => {
    try {
        const userJson = localStorage.getItem('loggedUser');

        if (!userJson) {
            return null;  // No logged-in user found
        }

        return JSON.parse(userJson);
    } catch (error) {
        console.error('Error parsing logged user:', error);
        return null;
    }
};

export default isLogged;