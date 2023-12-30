import Header from '../components/Header';
export default function Error() {
    return (
        <div>
            <Header title={'LearnSphere'}/>
            <div className="w-screen h-screen bgSidebar white flex justify-center items-center">
                <strong>Error:</strong>
                <p>Page not found!</p>
            </div>
        </div>
    );
}