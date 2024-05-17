import React, { useState } from 'react';
import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    //handle login event
    const handleLogin = (e) => {
        e.preventDefault();

        //temporary user database for A3
        const users = new Map([
            ['kimkc1','campus_connect'],
            ['fakeuser', 'fakepassword']
        ]);

        //change to search through database
        const userPassword = users.get(username);

        if (userPassword && userPassword === password) {
            console.log('Login successful for', user.username);
            setError('');

        }
        else {
            setError('Invalid username or password');}
    };

    return (
        <div className='login-container'>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    id="userID"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <a href="create_account.html">Create an account.</a></p>
        </div>
    );
}