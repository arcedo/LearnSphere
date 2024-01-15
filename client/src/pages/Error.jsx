import Header from '../components/Header';
import LoginStatusChecker from '../components/LogginStatusChecker';
export default function Error() {
    const loginStatus = LoginStatusChecker();
    if (loginStatus) {
        return (
            <div>
                <Header title={'LearnSphere'} />
                <div className="w-screen h-screen bgSidebar white flex flex-col justify-center items-center">
                    <div>
                        <h2 className='font-sora font-extrabold text-6xl'>404</h2>
                    </div>
                    <div className='flex gap-1 font-montserrat text-xl'>
                        <strong>Error:</strong>
                        <p>Page not found!</p>

                    </div>
                </div>
            </div>
        );
    };
}