import Header from '../components/Header';

function isLogged() {
    return localStorage.getItem('loggedUser') ? true : false;
}

function Home() {
    if (!isLogged()) {
        window.location.href = "/login";
    } else {
        return (
            <div>
                <Header />
                <section id="Home" className="w-full">
                    <div>
                        <h4>Project1 - </h4>
                    </div>
                </section>
            </div>
        );
    }
};

export default Home;