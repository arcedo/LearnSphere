import Background from '../assets/img/background.svg';
import Logo from '../assets/img/logo.svg';

function printLogin() {
    return (
        <div className="flex justify-center items-center w-screen h-screen bg-cover" style={{ backgroundImage: "url(" + Background + ")" }}>
            <div className='flex flex-col justify-center items-center gap-y-3 w-1/4'>
                <div className='flex justify-between gap-3 items-center'>
                    <img className='w-16 h-16' src={Logo} alt='logo' />
                    <h1 className='white text-5xl font-sora font-bold'>LearnSphere</h1>
                </div>
                <div className='flex flex-col justify-center items-start gap-5 text-white font-sora font-semibold py-10 px-10 rounded-xl bgColor'>
                    <div id='loginChecker' className='text-red text-sm font-medium text-red-500'></div>
                    <div className="flex flex-col">
                        <label>Username:</label>
                        <input className='rounded-3xl px-3 py-1 text-black' type="text" name="username" />
                    </div>
                    <div className="flex flex-col">
                        <label>Password:</label>
                        <input className='rounded-3xl px-3 py-1 text-black' type="password" name="password" />
                    </div>
                    <button className="rounded-3xl border-2 border-white py-1.5 px-5 hover:bg-white hover:text-black transition-all duration-300" onClick={login}>Login</button>
                </div>
            </div>
        </div>
    );
}

async function login() {
    var username = document.getElementsByName("username")[0].value;
    var password = document.getElementsByName("password")[0].value;

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ "userName": username, "userPassword": password })
    }

    try {
        let response = await fetch("http://localhost:3001/auth", options);

        if (response.ok) {
            let data = await response.json();
            if (data.status === 200) {
                window.location.href = "/home";
            }
        } else {
            document.getElementById("loginChecker").innerHTML = "Incorrect username or password";
            console.error('Server returned an error:', response.status);
        }
    } catch (error) {
        console.error('An error occurred during the fetch:', error);
    }
}

export default printLogin;