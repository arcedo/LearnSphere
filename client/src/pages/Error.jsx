import Header from '../components/Header';
import LoginStatusChecker from '../components/LogginStatusChecker';
export default function Error() {
    const loginStatus = LoginStatusChecker();
    if (loginStatus) {
        return (
            <div>
                <Header title={'LearnSphere'} />
                <div className="w-screen h-screen bgSidebar white flex justify-center items-center">
                    <strong>Error:</strong>
                    <p>Page not found!</p>
                </div>
            </div>
        );
    };
}