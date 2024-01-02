export const isLogged = async () => {
    const loggedUser = getLoggedUser();
    try {
        const userValidationResponse = await fetch(`http://localhost:3001/${loggedUser.type}s/${loggedUser.id}`);
        const userValidation = await userValidationResponse.json();
        if (!loggedUser || userValidation[0].userName !== loggedUser.name) {
            console.log('User not logged in');
            return false;
        } else {
            console.log('User logged in');
            return true;
        }
    } catch (error) {
        return false;
    }
};

export const getLoggedUser = () => {
    return JSON.parse(localStorage.getItem('loggedUser'));
};

export default isLogged;