import Background from './media/background.svg';
import Logo from './media/logo.svg';

function login(){
    return (
        <div className="flex justify-center items-center w-screen h-screen bg-cover" style={{backgroundImage: "url(" + Background + ")"}}>
            <div className='flex flex-col justify-center items-center gap-y-3 w-1/4'>
                <div className='flex justify-between gap-3 items-center'>
                    <img className='w-16 h-16' src={Logo} alt='logo' />
                    <h1 className='white text-5xl font-sora font-bold'>LearnSphere</h1>
                </div>
                <form className='flex flex-col justify-center items-start gap-5 text-white font-sora font-semibold py-10 px-8 rounded-xl bgColor' method='post'>
                    <div className="flex flex-col">
                        <label>Username:</label>
                        <input className='rounded-3xl px-3 py-1 text-black' type="text" name="username" />                        
                    </div>
                    <div className="flex flex-col">
                        <label>Password:</label>
                        <input className='rounded-3xl px-3 py-1 text-black' type="password" name="password" />                        
                    </div>
                    <button className="rounded-3xl border-2 border-white py-1.5 px-5 hover:bg-white hover:text-black transition-all duration-300">Login</button>
                </form>
            </div>
        </div>
    );
}

export default login;