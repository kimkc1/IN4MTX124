import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login (){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
        if (resonse.ok) {
            const data = await response.json();
            const token = data.token;
            localStorage.setItem('token', token);
            navigate('/homepage');}
        else if (response.status === 401){
            alert('Invalid username or password.');}
        else {
            throw new Error('Login failed');}
        }
        catch (error){
            console.error('Login error:', error.message);
        }
    };

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