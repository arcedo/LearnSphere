import Background from '../assets/img/background.svg';
import Logo from '../assets/img/logo.svg';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            login();
        }
    };

    async function login() {
        var username = document.getElementsByName("username")[0].value;
        var password = document.getElementsByName("password")[0].value;

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ "userName": username, "userPassword": password })
        };

        try {
            let response = await fetch("http://localhost:3001/auth", options);

            if (response.ok) {
                let responseData = await response.json();
                if (responseData.status === 200) {
                    const user = {
                        type: responseData.data[0].userType,
                        id: responseData.data[0].id,
                        name: username,
                        group: responseData.data[0].userGroup,
                    };
                    localStorage.setItem('loggedUser', JSON.stringify(user));
                    navigate("/");
                }
            } else {
                document.getElementById("loginChecker").innerHTML = "Incorrect username or password";
                document.getElementsByName("password")[0].value = "";
                console.error('Server returned an error:', response.status);
            }
        } catch (error) {
            console.error('An error occurred during the fetch:', error);
        }
    }
    return (
        <div className="flex justify-center items-center w-screen h-screen bg-cover" style={{ backgroundImage: "url(" + Background + ")" }}>
            <div className='flex flex-col justify-center items-center gap-y-3 w-1/4'>
                <div className='flex justify-between gap-3 items-center'>
                    <img className='w-16 h-16' src={Logo} alt='logo' />
                    <h1 className='white text-5xl font-sora font-bold'>LearnSphere</h1>
                </div>
                <div className='flex flex-col justify-center items-start gap-5 text-white font-sora font-semibold mt-4 py-10 px-10 rounded-xl bgLogin'>
                    <div id='loginChecker' className='text-red text-sm font-medium text-red-500'></div>
                    <div className="flex flex-col">
                        <label>Username:</label>
                        <input className='rounded-3xl px-3 py-1 text-black' type="text" name="username" />
                    </div>
                    <div className="flex flex-col">
                        <label>Password:</label>
                        <input className='rounded-3xl px-3 py-1 text-black' type="password" name="password" onKeyPress={handleKeyPress} />
                    </div>
                    <button className="rounded-3xl border-2 border-white py-1.5 px-5 hover:bg-white hover:text-black transition-all duration-300" onClick={login}>Login</button>
                </div>
            </div>
        </div>
    );
}
export default Login;