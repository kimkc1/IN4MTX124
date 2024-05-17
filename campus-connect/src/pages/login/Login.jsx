import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login (){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        //temporary user database for A3
        const users = new Map([
            ['kimkc1','campus_connect'],
            ['fakeuser', 'fakepassword']
        ]);

        if (users.has(username) && users.get(username) === password){
            navigate('/homepage');}
        else {
            alert('Invalid username or password.');}
    }

    return (
        <div className="login-app-container">
            <div className="login-container">
                <h1>Login</h1>
                <form className="login-form" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="login-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />     
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="login-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                    <p>Don't have an account? <a href="create_account.html">Create an account.</a></p>
                </form>    
            </div>
        </div>
    );
}

export default Login;