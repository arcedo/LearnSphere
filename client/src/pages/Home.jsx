import Header from '../components/Header';
import Skills from '../components/Skills';

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
                <section id="home" className="w-full text-white">
                    <div className='w-10/12 mx-auto'>
                        <h4 className='font-sora text-4xl font-extrabold'>Project1</h4>
                        <div className='flex items-center gap-3 flex-wrap w-1/2'>
                            <Skills skillName='HTML' globalPercentage='50%' />
                            <Skills skillName='HTML' globalPercentage='50%' />
                        </div>
                    </div>
                </section>
            </div>
        );
    }
};

export default Home;