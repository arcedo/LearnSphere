function isLogged() {
    return localStorage.getItem('loggedUser') ? true : false;
}

function Home() {
    if (!isLogged()) {
        window.location.href = "/login";
    } else {
        return (
            <section id="Home" className="w-full">
                <div>
                    <h4>Project1 - </h4>
                </div>
            </section>
        );
    }
};

export default Home;