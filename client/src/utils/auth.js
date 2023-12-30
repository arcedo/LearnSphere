export const isLogged = () => {
    if (!localStorage.getItem('loggedUser')) {
        return false;
    } else {
        return true;
    }
};

export const getLoggedUser = () => {
    return JSON.parse(localStorage.getItem('loggedUser'));
};

export default isLogged;